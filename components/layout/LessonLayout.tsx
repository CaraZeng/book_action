"use client";

import { ReactNode } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";

interface LessonLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  currentStep?: number;
  totalSteps?: number;
  progress?: number;
  onExit: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showNextButton?: boolean;
  className?: string;
}

export function LessonLayout({
  children,
  title,
  subtitle,
  currentStep,
  totalSteps,
  progress,
  onExit,
  onNext,
  nextLabel = "Next",
  showNextButton = false,
  className = "bg-gradient-to-b from-purple-50 via-white to-blue-50",
}: LessonLayoutProps) {
  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col justify-end h-16">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

{/* Progress Bar */}
{((currentStep && totalSteps) || progress !== undefined) && (
  <div className="bg-white border-b border-gray-200 px-6 py-2 flex-shrink-0">
    <div className="max-w-4xl mx-auto relative">
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${progress || ((currentStep || 0) / (totalSteps || 1)) * 100}%` }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-700">
          {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  </div>
)}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${className}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 shadow-lg px-6 py-5 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={onExit}
            className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
          >
            <X className="w-5 h-5" />
            Exit
          </Button>

          {showNextButton && onNext && (
            <Button
              size="lg"
              onClick={onNext}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-8 shadow-lg hover:shadow-xl transition-all"
            >
              {nextLabel}
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}