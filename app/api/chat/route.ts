// app/api/chat/route.ts
import { createOpenAI } from "@ai-sdk/openai";
import {
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";

const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // 打一行日志，确认前端传进来的 messages 长什么样
  console.log(
    "[chat api] incoming messages:",
    JSON.stringify(messages, null, 2),
  );

  if (!process.env.OPENROUTER_API_KEY) {
    return new Response("Missing OPENROUTER_API_KEY", { status: 500 });
  }

  const result = streamText({
    model: openrouter("openai/gpt-4o-mini"),
    messages: convertToModelMessages(messages),
  });

  // 关键：用 assistant-ui 官方示例的返回方式
  return result.toUIMessageStreamResponse({
    // 把原始 messages 传进去，方便它做上下文关联
    originalMessages: messages,
    // 再加一个 onFinish 方便你在服务端看到最终 assistant 消息
    onFinish({ responseMessage }) {
      console.log(
        "[chat api] assistant responseMessage:",
        JSON.stringify(responseMessage, null, 2),
      );
    },
  });
}
