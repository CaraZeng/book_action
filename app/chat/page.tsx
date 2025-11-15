"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";

export default function ChatPage() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
    onError: (err) => {
      console.error("[chat runtime] error", err);
    },
    onFinish: (msg) => {
      console.log("[chat runtime] finished message", msg);
    },
  });

  return (
    <SidebarInset className="flex h-screen flex-col overflow-hidden">
      <PageHeader
        title="AI Practice Chat"
        subtitle="Ask questions about your lessons, modules, or anything you're learning."
      />
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full px-4 py-6">
          <AssistantRuntimeProvider runtime={runtime}>
            {/* 先不要搞太复杂的样式，保证 Thread 在 Provider 里面就行 */}
            <div className="mx-auto flex h-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-50/60 to-white p-4 shadow-sm">
              <Thread />
            </div>
          </AssistantRuntimeProvider>
        </div>
      </main>
    </SidebarInset>
  );
}
