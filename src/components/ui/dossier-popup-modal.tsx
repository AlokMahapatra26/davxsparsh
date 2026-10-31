"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { type FolderFile } from "@/components/ui/glass-folder-cards";
import DossierCardFace from "@/components/ui/dossier-card-face";
import { type GsapFlipCardItem } from "@/components/ui/gsap-card-flip";

export interface DossierPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  folderMeta: string;
  files: FolderFile[];
  activeFile: FolderFile | null;
  onSelectFile: (file: FolderFile) => void;
  getFileDescription: (name: string, meta?: string) => string;
  getFileCaption?: (name: string, meta?: string) => string;
}

export function DossierPopupModal({
  isOpen,
  onClose,
  folderName,
  folderMeta,
  files,
  activeFile,
  onSelectFile,
  getFileDescription,
}: DossierPopupModalProps) {
  const router = useRouter();

  // Lock background scrolling while popup is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !activeFile) return null;

  const currentIdx = files.findIndex((f) => f.name === activeFile.name);
  const isDoc = !activeFile.art && !activeFile.image;
  const description = getFileDescription(activeFile.name, activeFile.meta);

  // Flip item for DossierCardFace
  const flipItem: GsapFlipCardItem = {
    id: activeFile.name,
    title: activeFile.name,
    meta: `${folderMeta} · ${activeFile.meta || "Dossier Record"}`,
    description,
    art: typeof activeFile.art === "string" ? activeFile.art : undefined,
    image: activeFile.image,
    isDocument: isDoc,
  };

  const handleLivePreview = () => {
    if (activeFile.href) {
      window.open(activeFile.href, "_blank");
      return;
    }
    const folderSlugMap: Record<string, string> = {
      "Design Systems": "/services/ui-ux-design",
      "Cloud Topologies": "/services/cloud-topologies",
      "Tactile Artifacts": "/services/brand-identity",
    };
    const targetUrl = folderSlugMap[folderName] || "/services";
    window.open(targetUrl, "_blank");
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-modal-title"
        className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-7"
      >
        {/* Semi-transparent Dimmed Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
        />

        {/* Bada Sa Popup Card Container (Maximized Width & Height) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[96vw] max-w-[1420px] xl:max-w-[1540px] 2xl:max-w-[1640px] h-[92vh] max-h-[94vh] bg-[#fbfbfe] text-zinc-900 rounded-3xl sm:rounded-[36px] shadow-[0_30px_90px_rgba(0,0,0,0.45)] border border-black/10 flex flex-col overflow-hidden my-auto"
        >
          {/* Top Modal Navigation Bar */}
          <div className="flex items-center justify-between px-6 sm:px-10 py-4 sm:py-5 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-600 font-bold">
                  {folderName}
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-xs sm:text-sm font-mono text-zinc-500 font-medium hidden sm:inline">
                  {folderMeta}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                {currentIdx >= 0 ? `Record 0${currentIdx + 1} of 0${files.length}` : "Dossier Record"}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 hover:text-black transition-colors cursor-pointer text-xs sm:text-sm font-semibold"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Modal Main Body (Scrollable if needed) */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center min-h-full">
              {/* Left Column: Visual Card Preview (5 Cols - Large & Generous) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="w-full max-w-[420px] sm:max-w-[460px] xl:max-w-[500px] aspect-[4/5] min-h-[460px] sm:min-h-[520px] xl:min-h-[580px] rounded-3xl shadow-2xl overflow-hidden border border-black/10 relative bg-zinc-950 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01]">
                  <DossierCardFace item={flipItem} isHero={true} />
                </div>
              </div>

              {/* Right Column: Detailed Record Specs & Thumbnail Switcher (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 xl:space-y-8">
                <div>
                  <h2
                    id="dossier-modal-title"
                    className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-[-0.035em] leading-[1.08] font-display mb-4"
                  >
                    {activeFile.name}
                  </h2>

                  <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal mb-8 max-w-2xl">
                    {description}
                  </p>

                  {/* Technical Specifications Matrix */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-zinc-100/80 border border-zinc-200/90 space-y-3.5 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                      Archive Telemetry &amp; Access
                    </span>
                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
                      <div>
                        <span className="text-zinc-400 block text-[11px]">ORGANIZATION</span>
                        <span className="text-zinc-900 font-semibold">{folderMeta}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[11px]">RECORD STATUS</span>
                        <span className="text-emerald-700 font-semibold">Active • Production Ready</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[11px]">ENCRYPTION / HASH</span>
                        <span className="text-zinc-700 font-medium truncate block">SHA-256 (Signed &amp; Verified)</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[11px]">ACCESS LEVEL</span>
                        <span className="text-zinc-700 font-medium">Public Portfolio Dossier</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Folder File Switcher (Thumbnails) */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-3">
                    Other Records In This Folder ({files.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                    {files.map((file, idx) => {
                      const isSelected = file.name === activeFile.name;
                      return (
                        <button
                          key={file.name + idx}
                          type="button"
                          onClick={() => onSelectFile(file)}
                          className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[72px] ${
                            isSelected
                              ? "bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-black/10 scale-[1.02]"
                              : "bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-200/80 hover:border-zinc-300"
                          }`}
                        >
                          <span className={`text-xs sm:text-sm font-bold leading-snug line-clamp-1 ${isSelected ? "text-white" : "text-zinc-900"}`}>
                            {file.name}
                          </span>
                          <span className={`text-[11px] font-mono mt-1 ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>
                            {file.meta || "Dossier"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-6 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleLivePreview}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 text-xs sm:text-sm font-semibold border border-zinc-200 shadow-2xs transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4 text-zinc-600" />
                    <span>Live Preview</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push("/contact");
                      }}
                      className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Book Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
