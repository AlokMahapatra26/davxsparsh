import React from "react";
import { ClipPathLinks } from "@/components/ui/clip-path-links";

const Demo: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-5xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

export default Demo;
