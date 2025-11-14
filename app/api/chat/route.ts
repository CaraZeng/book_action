import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing OPENAI_API_KEY environment variable." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    console.log("[chat api] sending messages", {
      count: messages.length ?? 0,
      hasKey: Boolean(process.env.OPENAI_API_KEY),
    });

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: convertToModelMessages(messages ?? []),
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
