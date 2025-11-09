"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, ArrowRight, CheckCircle, XCircle } from "lucide-react";

interface ReadingLessonProps {
  lessonTitle: string;
  onExit: () => void;
  onNext: () => void;
}

interface StoryExample {
  story: string;
  mediaUrl?: string;
}

interface ArticleContent {
  title: string;
  definition: string;
  whyItWorks: string;
  goodExample: StoryExample;
  badExample: StoryExample;
  imageUrl?: string;
}

export function ReadingLesson({ lessonTitle, onExit, onNext }: ReadingLessonProps) {
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // GET /api/concepts/{conceptId}
    const fetchArticle = async () => {
      setLoading(true);
      
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockArticle: ArticleContent = {
        title: "Understanding Communication",
        definition: "Effective communication is the foundation of healthy relationships. It involves not just speaking, but truly listening to understand the other person's perspective.",
        whyItWorks: "Active listening means giving your full attention to the speaker, without planning your response while they're talking. It means observing body language, tone of voice, and the emotions behind the words.",
        goodExample: {
          story: "Sarah noticed her friend seemed upset. Instead of offering advice immediately, she sat down and said, 'You seem troubled. I'm here to listen if you want to talk.' She maintained eye contact, put away her phone, and let her friend speak without interruption. Her friend felt truly heard and valued.",
          mediaUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
        },
        badExample: {
          story: "Mark's partner tried to share a problem at work. While she was speaking, Mark kept checking his phone and interrupted her twice to give advice she didn't ask for. He then changed the subject to his own day. His partner felt dismissed and stopped sharing important things with him.",
          mediaUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
        },
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
      };
      
      setArticle(mockArticle);
      setLoading(false);
    };

    fetchArticle();
  }, [lessonTitle]);

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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load lesson content</p>
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
          <h1 className="text-3xl font-bold text-center mb-2">{article.title}</h1>

          {/* Main Image */}
          {article.imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-lg mb-8">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Definition */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">What is it?</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {article.definition}
            </p>
          </div>

          {/* Why It Works */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Why it matters</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {article.whyItWorks}
            </p>
          </div>

          {/* Good Example */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-green-700">Good Example ✨</h3>
            </div>
            
            {article.goodExample.mediaUrl && (
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={article.goodExample.mediaUrl} 
                  alt="Good example"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            
            <p className="text-lg leading-relaxed text-gray-800">
              {article.goodExample.story}
            </p>
          </div>

          {/* Bad Example */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-sm border-2 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-red-700">What Not to Do ⚠️</h3>
            </div>
            
            {article.badExample.mediaUrl && (
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={article.badExample.mediaUrl} 
                  alt="Bad example"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            
            <p className="text-lg leading-relaxed text-gray-800">
              {article.badExample.story}
            </p>
          </div>

          {/* Key Takeaway */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-6">
            <p className="text-lg font-medium text-gray-800">
              💡 <strong>Remember:</strong> Good communication is a skill that can be learned and improved with practice. Each conversation is an opportunity to strengthen your relationships.
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