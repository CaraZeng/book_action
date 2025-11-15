import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function GET() {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "Say hello in one sentence.",
  });

  console.log("[test-openai] text:", result.text);

  return Response.json({ text: result.text });
}
