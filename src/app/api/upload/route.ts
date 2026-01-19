import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

// Allowed file types
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

// Max file size (5MB)
const MAX_SIZE = 5 * 1024 * 1024;

// File extension mapping
const EXTENSION_MAP: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

// Initialize S3 client (compatible with Cloudflare R2)
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileType = formData.get("type") as string;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { message: "ファイルが選択されていません" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "PDF、Word、JPG、PNG形式のファイルのみアップロード可能です" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "ファイルサイズは5MB以下にしてください" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const extension = EXTENSION_MAP[file.type] || "";
    const uniqueId = randomUUID();
    const timestamp = new Date().toISOString().split("T")[0];
    const fileName = `${timestamp}/${fileType}/${uniqueId}${extension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Check if S3/R2 is configured
    const bucketName = process.env.R2_BUCKET_NAME || process.env.S3_BUCKET_NAME;

    if (!bucketName || !process.env.R2_ENDPOINT) {
      // Development mode - return a placeholder URL
      // In production, you should configure R2 or S3
      console.warn("Cloud storage not configured. Using placeholder URL for development.");

      return NextResponse.json({
        url: `https://placeholder-storage.dev/${fileName}`,
        fileName: file.name,
        message: "開発モード: クラウドストレージが設定されていません",
      });
    }

    // Upload to S3/R2
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      // Metadata for tracking
      Metadata: {
        originalName: encodeURIComponent(file.name),
        uploadType: fileType,
      },
    });

    await s3Client.send(command);

    // Build public URL
    const publicUrl = process.env.R2_PUBLIC_URL || process.env.S3_PUBLIC_URL;
    const fileUrl = `${publicUrl}/${fileName}`;

    return NextResponse.json({
      url: fileUrl,
      fileName: file.name,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { message: "ファイルのアップロードに失敗しました" },
      { status: 500 }
    );
  }
}
