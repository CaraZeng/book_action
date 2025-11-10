"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Concept } from "@/lib/types/module";

interface ReadingLessonProps {
  concept: Concept;
  onExit: () => void;
  onNext: () => void;
}

export function ReadingLesson({
  concept,
  onExit,
  onNext,
}: ReadingLessonProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-sm font-medium text-gray-500">Reading</h2>
          <div className="w-10"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-center mb-2">
            {concept.title}
          </h1>

          {/* Definition */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              What is it?
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {concept.definition}
            </p>
          </div>

          {/* Why It Works */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Why it matters
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {concept.why_it_works}
            </p>
          </div>

          {/* Good Example */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-green-700">
                Good Example ✨
              </h3>
            </div>

            {concept.tutorial.good_media_url && (
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={concept.tutorial.good_media_url}
                  alt="Good example"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            <p className="text-lg leading-relaxed text-gray-800">
              {concept.tutorial.good_story}
            </p>
          </div>

          {/* Bad Example */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-sm border-2 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-red-700">
                What Not to Do ⚠️
              </h3>
            </div>

            {concept.tutorial.bad_media_url && (
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={concept.tutorial.bad_media_url}
                  alt="Bad example"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            <p className="text-lg leading-relaxed text-gray-800">
              {concept.tutorial.bad_story}
            </p>
          </div>

          {/* Key Takeaway */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-6">
            <p className="text-lg font-medium text-gray-800">
              💡 <strong>Remember:</strong> {concept.summary.summary_content}
            </p>
          </div>

          {/* Next Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={onNext}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8"
            >
              Continue to Practice
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}