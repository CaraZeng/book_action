import type { Metadata } from "next";
import "@assistant-ui/styles/index.css";
import "@assistant-ui/styles/markdown.css";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { LearningProvider } from "@/lib/contexts/LearningContext";

export const metadata: Metadata = {
  title: "Language Learning Path",
  description: "Interactive language learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LearningProvider>
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </LearningProvider>
      </body>
    </html>
  );
}