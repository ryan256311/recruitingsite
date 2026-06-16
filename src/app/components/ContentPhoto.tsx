"use client";

import { useState } from "react";

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
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setDidError(true)}
    />
  );
}
