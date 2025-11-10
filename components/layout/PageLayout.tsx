"use client";

import { ReactNode } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  headerAction?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function PageLayout({
  children,
  title,
  subtitle,
  showHeader = true,
  headerAction,
  footer,
  className = "bg-gradient-to-b from-blue-50 to-white",
}: PageLayoutProps) {
  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      {showHeader && (title || headerAction) && (
        <header className="flex items-center justify-between border-b border-gray-200 bg-white/70 px-6 py-4.5 backdrop-blur flex-shrink-0 z-10">
          <div>
            {title && <h1 className="text-xl font-semibold text-gray-900">{title}</h1>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${className}`}>
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <div className="bg-white border-t border-gray-200 shadow-lg px-6 py-4 flex-shrink-0">
          {footer}
        </div>
      )}
    </SidebarInset>
  );
}

// 预设的内容容器
export function PageContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`container mx-auto py-8 px-4 ${className}`}>
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}

// 预设的宽内容容器
export function WidePageContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`container mx-auto py-8 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}