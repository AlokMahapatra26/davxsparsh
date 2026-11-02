"use client";

import { Component } from "@/components/ui/avatar-hover-card";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus } from "lucide-react";

export default function DemoOne() {
  return (
    <Component
      imageSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
      imageAlt="Profile"
      name="shadcn"
      username="shadcn"
      description="Community manager and content creator."
      buttonContent={
        <div className="flex gap-2 w-full">
          <Button size="sm" variant="outline" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button size="sm" className="flex-1">
            <UserPlus className="h-4 w-4 mr-2" />
            Follow
          </Button>
        </div>
      }
    />
  );
}

export { DemoOne };
