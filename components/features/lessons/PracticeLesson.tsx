"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface PracticeLessonProps {
  lessonTitle: string;
  onProgressChange?: (current: number, total: number) => void;
  onCompletionChange?: (isComplete: boolean) => void; // 新增：通知父组件是否完成
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  questions: Question[];
}

export function PracticeLesson({
  lessonTitle,
  onProgressChange,
  onCompletionChange,
}: PracticeLessonProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockQuizData: QuizData = {
        questions: [
          {
            id: 1,
            question: "What is active listening?",
            options: [
              "Waiting for your turn to speak",
              "Giving full attention and trying to understand the speaker",
              "Thinking about your response while someone talks",
              "Interrupting to show you understand",
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "Which of these is a good communication practice?",
            options: [
              "Using 'I' statements to express feelings",
              "Blaming others for problems",
              "Avoiding difficult conversations",
              "Making assumptions without asking",
            ],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: "What does setting boundaries mean?",
            options: [
              "Pushing people away",
              "Being selfish",
              "Clearly communicating your limits and needs",
              "Never helping others",
            ],
            correctAnswer: 2,
          },
        ],
      };

      setQuizData(mockQuizData);
      setSelectedAnswers(new Array(mockQuizData.questions.length).fill(null));
      setLoading(false);
    };

    fetchQuestions();
  }, [lessonTitle]);

  // 通知父组件进度变化
  useEffect(() => {
    if (quizData && onProgressChange) {
      onProgressChange(currentQuestionIndex + 1, quizData.questions.length);
    }
  }, [currentQuestionIndex, quizData, onProgressChange]);

  // 通知父组件完成状态
  const isAllCompleted = selectedAnswers.every((answer) => answer !== null);
  useEffect(() => {
    if (onCompletionChange) {
      onCompletionChange(isAllCompleted);
    }
  }, [isAllCompleted, onCompletionChange]);

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(selectedAnswers[currentQuestionIndex - 1] !== null);
    }
  };

  const handleNext = () => {
    if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(selectedAnswers[currentQuestionIndex + 1] !== null);
    }
  };

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  return (
    <div className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading questions...</p>
          </div>
        ) : currentQuestion ? (
          <div className="flex items-center gap-6">
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className={`flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 ${
                currentQuestionIndex === 0 ? "invisible" : ""
              }`}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Question Card */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected =
                    selectedAnswers[currentQuestionIndex] === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const showCorrectAnswer = showFeedback && isCorrect;
                  const showIncorrectAnswer =
                    showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        !showFeedback && handleSelectAnswer(index)
                      }
                      disabled={showFeedback}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                        showCorrectAnswer
                          ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md"
                          : showIncorrectAnswer
                          ? "border-red-400 bg-gradient-to-r from-red-50 to-orange-50 shadow-md"
                          : isSelected
                          ? "border-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30 hover:shadow-md"
                      } ${
                        showFeedback ? "cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-800 font-medium">
                          {option}
                        </span>
                        {showCorrectAnswer && (
                          <span className="text-green-600 font-semibold flex items-center gap-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            Correct
                          </span>
                        )}
                        {showIncorrectAnswer && (
                          <span className="text-red-600 font-semibold flex items-center gap-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                            Incorrect
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="mt-8 text-center">
                  {currentQuestionIndex === quizData!.questions.length - 1 ? (
                    <p className="text-purple-600 font-semibold text-lg">
                      🎉 Last question complete!
                    </p>
                  ) : (
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Continue
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className={`flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 ${
                quizData &&
                currentQuestionIndex === quizData.questions.length - 1
                  ? "invisible"
                  : ""
              }`}
              disabled={
                !quizData ||
                currentQuestionIndex === quizData.questions.length - 1
              }
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            <p className="text-xl">No questions available</p>
          </div>
        )}
      </div>
    </div>
  );
}