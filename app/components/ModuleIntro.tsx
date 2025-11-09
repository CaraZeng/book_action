"use client";

import { Button } from "./ui/button";
import { X, ArrowRight } from "lucide-react";

interface ModuleIntroProps {
  moduleTitle: string;
  context: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  onStart: () => void;
  onExit: () => void;
}

export function ModuleIntro({
  moduleTitle,
  context,
  mediaUrl,
  mediaType = "image",
  onStart,
  onExit
}: ModuleIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-sm font-medium text-gray-500">Module Introduction</h2>
          <div className="w-10"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Module Icon & Title */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-blue-100 rounded-2xl mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {moduleTitle}
            </h1>
          </div>

          {/* Media Content */}
          {mediaUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              {mediaType === "video" ? (
                <video 
                  src={mediaUrl} 
                  controls 
                  className="w-full"
                  poster="/placeholder-video.jpg"
                />
              ) : (
                <img 
                  src={mediaUrl} 
                  alt={moduleTitle} 
                  className="w-full h-96 object-cover"
                />
              )}
            </div>
          )}

          {/* Story Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">
                {context}
              </p>
            </div>
          </div>

          {/* Highlight Box */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-8">
            <p className="text-lg font-medium text-gray-800">
              🎯 <strong>In this module, you'll learn:</strong>
            </p>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>• Key concepts and practical skills</li>
              <li>• Real-world examples and scenarios</li>
              <li>• Interactive practice exercises</li>
            </ul>
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <Button
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Learning
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}