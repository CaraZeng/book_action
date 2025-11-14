"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";

export default function ChatPage() {
  const runtime = useChatRuntime();

  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <PageHeader
        title="AI Practice Chat"
        subtitle="Ask questions about your lessons, modules, or anything you're learning."
      />

      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full py-6 px-4">
          <AssistantRuntimeProvider runtime={runtime}>
            <div className="max-w-3xl mx-auto flex h-full flex-col rounded-xl border border-gray-200 bg-gradient-to-b from-blue-50/60 to-white shadow-sm">
              <Thread />
            </div>
          </AssistantRuntimeProvider>
        </div>
      </main>
    </SidebarInset>
  );
}
