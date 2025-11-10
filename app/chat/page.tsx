"use client";

import { SidebarInset } from "@/components/ui/sidebar";

export default function ChatPage() {
  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <header className="flex items-center gap-3 border-b border-gray-200 bg-white/70 px-6 py-5 backdrop-blur flex-shrink-0 z-10">
        <h1 className="text-center">Chat</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-500 text-center">Coming Soon...</p>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}