"use client";

import { useMemo, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/layout/PageHeader";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage({ text: input });
    setInput("");
  };

  const renderedMessages = useMemo(
    () =>
      messages.map((message) => {
        const text =
          message.parts
            ?.filter((part) => part.type === "text")
            .map((part: any) => part.text)
            .join("") ?? "";

        if (!text.trim()) return null;

        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={cn(
              "mb-3 flex",
              isUser ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm",
                isUser
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-200",
              )}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
            </div>
          </div>
        );
      }),
    [messages],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <PageHeader
        title="AI Practice Chat"
        subtitle="Ask questions about your lessons, modules, or anything you're learning."
      />

      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full py-6 px-4">
          <div className="max-w-3xl mx-auto flex h-full flex-col rounded-xl border border-gray-200 bg-gradient-to-b from-blue-50/60 to-white shadow-sm">
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center text-sm text-gray-500">
                  <p>
                    Start a conversation by asking about a lesson, practice
                    exercise, or any concept you&apos;d like to review.
                  </p>
                </div>
              ) : (
                renderedMessages
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 bg-white/80 px-4 py-3"
            >
              <div className="flex flex-col gap-2">
                <Textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={3}
                  placeholder="Ask a question about your current module or lesson..."
                  className="w-full"
                />
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-gray-400">
                    The assistant uses your chat history to keep context during
                    this session.
                  </p>
                  <Button 
                    type="submit"
                    disabled={isLoading || !input.trim()}>
                    {isLoading ? "Thinking..." : "Send"}
                  </Button>
                </div>
                {error && (
                  <p className="text-xs text-red-500">
                    {error.message || "Something went wrong. Please try again."}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}
