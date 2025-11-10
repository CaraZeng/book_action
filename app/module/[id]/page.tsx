"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { ModuleIntro } from "@/components/features/learning/ModuleIntro";
import { useRouter, useParams } from "next/navigation";
import { module1Data } from "@/lib/data/modules";

export default function ModulePage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = parseInt(params.id as string);

  // 获取模块数据
  // TODO: 后续从 API 根据 moduleId 获取，现在先用 module1
  const moduleData = module1Data;
  const { module, theme, concepts } = moduleData;

  const handleStart = () => {
    // 获取第一个 concept 的 ID（使用 order_index）
    const firstConcept = concepts[0];
    router.push(`/lesson/${firstConcept.order_index}/reading`);
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <ModuleIntro
          moduleTitle={module.title}
          context={theme.context + "\n\n" + theme.question}
          mediaUrl={theme.media_url}
          mediaType={theme.media_type}
          onStart={handleStart}
          onExit={handleExit}
        />
      </main>
    </SidebarInset>
  );
}