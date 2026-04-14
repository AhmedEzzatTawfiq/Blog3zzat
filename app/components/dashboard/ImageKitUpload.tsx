"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface ImageKitUploadProps {
  onUploadComplete: (url: string) => void;
  className?: string;
}

export function ImageKitUpload({ onUploadComplete, className }: ImageKitUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadingRef = useRef(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      if (uploadingRef.current || isUploading) return;
      uploadingRef.current = true;
      setIsUploading(true);

      try {
        // Upload to our server-side API
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const errorText = await uploadRes.text();
          console.error("Upload failed:", errorText);
          throw new Error(`Upload failed: ${errorText}`);
        }

        const uploadData = await uploadRes.json();
        console.log("Upload successful:", uploadData);
        onUploadComplete(uploadData.url);
        toast.success("Image has been uploaded");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Something went wrong with the upload.");
      } finally {
        uploadingRef.current = false;
        setIsUploading(false);
      }
    },
    [onUploadComplete, isUploading]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => !isUploading && fileInputRef.current?.click()}
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-gray-400 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''} ${className ?? ""}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
      {isUploading ? (
        <>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mb-2"></div>
          <p className="text-sm text-gray-500">Uploading...</p>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 mb-2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm text-gray-500">
            Click or drag & drop to upload an image
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 4MB</p>
        </>
      )}
    </div>
  );
}
