// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    system,
    tools,
  }: {
    messages?: UIMessage[];
    system?: string;
    tools?: any;
  } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "Missing OPENAI_API_KEY environment variable.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const safeMessages = Array.isArray(messages) ? messages : [];

  try {
    console.log("[chat api] sending messages", {
      count: safeMessages.length,
      hasKey: true,
    });

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system, // 以后你要在前端加 system 提示，这里就能接住
      messages: convertToModelMessages(safeMessages),
      tools: frontendTools(tools),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat api] failed to stream response", error);
    return new Response(
      JSON.stringify({ error: "Unable to fetch response from OpenAI." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
