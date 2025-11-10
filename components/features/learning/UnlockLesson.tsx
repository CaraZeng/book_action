"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Unlock } from "lucide-react";

interface UnlockLessonProps {
  lessonTitle: string;
  onUnlock: () => void;
}

interface IntroductionData {
  nextLessonTitle: string;
  introText: string;
}

export function UnlockLesson({ lessonTitle, onUnlock }: UnlockLessonProps) {
  const [introData, setIntroData] = useState<IntroductionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch introduction text
    // TODO: Replace with actual API call to backend
    const fetchIntroduction = async () => {
      setLoading(true);

      // Mock data - replace this with actual API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockIntroData: IntroductionData = {
        nextLessonTitle: "Understanding Empathy",
        introText:
          "Great work completing this lesson! You've learned the fundamentals of active listening and setting healthy boundaries. In the next lesson, we'll explore how empathy plays a crucial role in building stronger, more meaningful relationships. Understanding empathy will help you connect with others on a deeper level and respond to their emotions with compassion and care.",
      };

      setIntroData(mockIntroData);
      setLoading(false);
    };

    fetchIntroduction();
  }, [lessonTitle]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Top Frame - Lesson Title */}
{/* Top Frame - Lesson Title */}
<div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
  <div className="max-w-4xl mx-auto flex flex-col justify-end h-16">
    <h1 className="text-xl font-semibold text-gray-900">{lessonTitle}</h1>
    <p className="text-xs text-gray-500 mt-0.5">Lesson Complete!</p>
  </div>
</div>

      {/* Middle Frame - Introduction Content */}
      <div className="flex-1 overflow-y-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : introData ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Next Lesson Title */}
              <h2 className="text-gray-800 mb-4">Up Next</h2>
              <h3 className="text-green-600 mb-8">
                {introData.nextLessonTitle}
              </h3>

              {/* Introduction Text */}
              <p className="text-gray-600 leading-relaxed mb-10">
                {introData.introText}
              </p>

              {/* Unlock Button */}
              <Button
                size="lg"
                onClick={onUnlock}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg flex items-center gap-3 mx-auto"
              >
                <Unlock className="w-5 h-5" />
                Unlock Next Concept
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Unable to load introduction</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
