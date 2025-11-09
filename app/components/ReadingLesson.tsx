"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, ArrowRight } from "lucide-react";

interface ReadingLessonProps {
  lessonTitle: string;
  onExit: () => void;
  onNext: () => void;
}

interface ArticleContent {
  title: string;
  content: string;
  imageUrl?: string;
}

export function ReadingLesson({ lessonTitle, onExit, onNext }: ReadingLessonProps) {
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch article content
    // TODO: Replace with actual API call to backend
    const fetchArticle = async () => {
      setLoading(true);
      
      // Mock data - replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockArticle: ArticleContent = {
        title: "Understanding Communication",
        content: `Effective communication is the foundation of healthy relationships. It involves not just speaking, but truly listening to understand the other person's perspective.

Active listening means giving your full attention to the speaker, without planning your response while they're talking. It means observing body language, tone of voice, and the emotions behind the words.

When we communicate openly and honestly, we create space for trust to grow. This includes expressing our own needs clearly while respecting the needs of others.

Remember: good communication is a skill that can be learned and improved with practice. Each conversation is an opportunity to strengthen your relationships.`,
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
      };
      
      setArticle(mockArticle);
      setLoading(false);
    };

    fetchArticle();
  }, [lessonTitle]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Top Frame - Lesson Title */}
      <div className="bg-white border-b shadow-sm px-6 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-gray-800">{lessonTitle}</h1>
          <p className="text-sm text-gray-500 mt-1">Reading Activity</p>
        </div>
      </div>

      {/* Middle Frame - Reader */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : article ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <h2 className="text-gray-800">{article.title}</h2>
              
              {article.imageUrl && (
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No content available</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Frame - Navigation Buttons */}
      <div className="bg-white border-t shadow-lg px-6 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={onExit}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Exit
          </Button>
          
          <Button
            size="lg"
            onClick={onNext}
            className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
