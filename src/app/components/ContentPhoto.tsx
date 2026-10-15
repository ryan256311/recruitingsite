"use client";

import { useState } from "react";
import Image from "next/image";

interface ContentPhotoProps {
  src: string;
  alt: string;
}

/**
 * 記事のサムネイル/メイン画像。
 * public/images/contents/ に実ファイルが存在すれば写真を表示し、
 * 無い場合は null を返して背後のプレースホルダーを見せる。
 */
export default function ContentPhoto({ src, alt }: ContentPhotoProps) {
  const [didError, setDidError] = useState(false);

  if (!src || didError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 539px) 100vw, (max-width: 1039px) 33vw, 240px"
      className="object-cover"
      onError={() => setDidError(true)}
    />
  );
}
