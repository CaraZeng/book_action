"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { ModuleIntro } from "@/components/features/learning/ModuleIntro";
import { useRouter, useParams } from "next/navigation";

export default function ModulePage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.id as string;

  // TODO: 从数据库或 API 获取模块信息
  const moduleTitle = "Communication & Boundaries";

  const handleStart = () => {
    // TODO: 获取这个模块的第一个课程 ID
    router.push(`/lesson/10/reading`);
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <ModuleIntro
          moduleTitle={moduleTitle}
          context={`Welcome to ${moduleTitle}!

In this module, you'll explore the essential skills for effective communication and setting healthy boundaries in relationships.

Communication is more than just words - it's about understanding, empathy, and connection. You'll learn how to express yourself clearly while truly listening to others.

Setting boundaries is an act of self-respect and care. You'll discover how to protect your time, energy, and emotional well-being while maintaining strong relationships.

Through real-world scenarios and interactive practice, you'll develop the confidence to navigate challenging conversations and create healthier, more fulfilling connections.

Let's begin this transformative journey together!`}
          mediaUrl="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80"
          mediaType="image"
          onStart={handleStart}
          onExit={handleExit}
        />
      </main>
    </SidebarInset>
  );
}