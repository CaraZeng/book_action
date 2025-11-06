"use client";

import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { LearningRoadmap } from "./components/LearningRoadmap";

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto py-8 px-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-center mb-8">Language Learning Path</h1>
              <LearningRoadmap />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
