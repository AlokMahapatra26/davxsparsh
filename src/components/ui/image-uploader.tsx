"use client";

import * as React from "react";
import { Upload, X, FileText } from "lucide-react";
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
  /** Maximum file size in MB. Defaults to 10. */
  maxSize?: number;
  /** Accepted file types. Defaults to images and PDFs. */
  accept?: string;
  /** ClassName for the root element. */
  className?: string;
}

/**
 * A reusable image and document uploader component with drag-and-drop, previews, and animations.
 */
export const ImageUploader = React.forwardRef<HTMLDivElement, ImageUploaderProps>(
  (
    {
      files,
      onChange,
      maxFiles = 5,
      maxSize = 10,
      accept = "image/*,application/pdf,.pdf,.doc,.docx",
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
            "border-2 border-dashed rounded-xl p-5 sm:p-6 text-center transition-all duration-300 cursor-pointer bg-white/80 hover:bg-white border-zinc-300 hover:border-[#4355ff] shadow-2xs",
            isDragging
              ? "border-[#4355ff] bg-[#4355ff]/10"
              : "border-zinc-300 bg-white/80"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          aria-label="Image and document uploader dropzone"
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
          <div className="flex flex-col items-center gap-2.5">
            <Button type="button" variant="outline" size="icon" className="h-11 w-11 rounded-full bg-white border-zinc-200 shadow-2xs hover:border-[#4355ff] text-[#4355ff]">
              <Upload className="h-4 w-4" />
            </Button>
            <div>
              <p className="font-semibold text-zinc-900 text-[14px]">
                Choose project documents or drag &amp; drop here
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                PDF, PNG, JPG, WEBP, DOCX. Max {maxSize}MB per file.
              </p>
            </div>
          </div>
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
            <AnimatePresence>
              {previewUrls.map((url, index) => {
                const file = files[index];
                const isPdf =
                  file?.type === "application/pdf" ||
                  file?.name?.toLowerCase().endsWith(".pdf");
                const isDoc =
                  file?.name?.toLowerCase().endsWith(".doc") ||
                  file?.name?.toLowerCase().endsWith(".docx");

                return (
                  <motion.div
                    key={file?.name || index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-xs flex items-center justify-center"
                  >
                    {isPdf || isDoc ? (
                      <div className="flex flex-col items-center justify-center p-3 text-center w-full h-full bg-linear-to-b from-red-50/60 to-white">
                        <div className="w-10 h-10 rounded-lg bg-red-100/80 text-red-600 flex items-center justify-center mb-1.5 shadow-2xs">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-800 line-clamp-2 px-1 break-all leading-tight">
                          {file?.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 mt-1">
                          {isPdf ? "PDF" : "DOC"} • {file ? (file.size / (1024 * 1024)).toFixed(1) : 0} MB
                        </span>
                      </div>
                    ) : (
                      <img
                        src={url}
                        alt={`Preview of ${file?.name || index}`}
                        className="object-cover w-full h-full"
                      />
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/80 hover:bg-red-600 text-white border-0 shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      aria-label={`Remove ${file?.name || index}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);

ImageUploader.displayName = "ImageUploader";
