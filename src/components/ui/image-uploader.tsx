"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the props for the ImageUploader component
export interface ImageUploaderProps {
  /** The current list of files. */
  files: File[];
  /** Callback function to update the file list. */
  onChange: (files: File[]) => void;
  /** Maximum number of files allowed. Defaults to 5. */
  maxFiles?: number;
  /** Maximum file size in MB. Defaults to 4. */
  maxSize?: number;
  /** Accepted file types. Defaults to "image/*". */
  accept?: string;
  /** ClassName for the root element. */
  className?: string;
}

/**
 * A reusable image uploader component with drag-and-drop, previews, and animations.
 */
export const ImageUploader = React.forwardRef<HTMLDivElement, ImageUploaderProps>(
  (
    {
      files,
      onChange,
      maxFiles = 5,
      maxSize = 4,
      accept = "image/*",
      className,
      ...props
    },
    ref
  ) => {
    // State to manage drag-over visual feedback
    const [isDragging, setIsDragging] = React.useState(false);
    // Ref for the hidden file input
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Memoize preview URLs to prevent re-rendering and memory leaks
    const previewUrls = React.useMemo(() => 
      files.map(file => URL.createObjectURL(file)),
      [files]
    );

    // Effect to clean up object URLs on unmount
    React.useEffect(() => {
      return () => {
        previewUrls.forEach(url => URL.revokeObjectURL(url));
      };
    }, [previewUrls]);

    const handleFileChange = (newFiles: FileList | null) => {
      if (!newFiles) return;

      const filesArray = Array.from(newFiles);
      const uniqueNewFiles = filesArray.filter(
        (newFile) => !files.some((existingFile) => existingFile.name === newFile.name)
      );

      // Validate files and update the list
      const updatedFiles = [...files, ...uniqueNewFiles].slice(0, maxFiles);
      onChange(updatedFiles);
    };

    const handleRemoveFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      onChange(updatedFiles);
    };

    // Drag and drop event handlers
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFileChange(e.dataTransfer.files);
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <div
          className={cn(
            "border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer bg-white/60 hover:bg-white/80 border-zinc-300/80 hover:border-[#4355ff]",
            isDragging
              ? "border-[#4355ff] bg-[#4355ff]/10"
              : "border-zinc-300/80 bg-white/60"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          aria-label="Image uploader dropzone"
          tabIndex={0}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <div className="flex flex-col items-center gap-3">
            <Button type="button" variant="outline" size="icon" className="h-13 w-13 rounded-full bg-white border-zinc-200 shadow-xs hover:border-[#4355ff] text-[#4355ff]">
              <Upload className="h-5 w-5" />
            </Button>
            <div>
              <p className="font-semibold text-zinc-900 text-[15px]">
                Choose images or drag &amp; drop it here
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                JPG, JPEG, PNG and WEBP. Max {maxSize}MB.
              </p>
            </div>
          </div>
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
            <AnimatePresence>
              {previewUrls.map((url, index) => (
                <motion.div
                  key={files[index]?.name || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-zinc-200/80 bg-white shadow-xs"
                >
                  <img
                    src={url}
                    alt={`Preview of ${files[index]?.name || index}`}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/80 hover:bg-red-600 text-white border-0 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    aria-label={`Remove ${files[index]?.name || index}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);

ImageUploader.displayName = "ImageUploader";
