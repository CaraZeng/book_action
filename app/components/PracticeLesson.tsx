"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "./ui/progress";

interface PracticeLessonProps {
  lessonTitle: string;
  onExit: () => void;
  onNext: () => void;
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

export function PracticeLesson({ lessonTitle, onExit, onNext }: PracticeLessonProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch quiz questions
    // TODO: Replace with actual API call to backend
    const fetchQuestions = async () => {
      setLoading(true);
      
      // Mock data - replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockQuizData: QuizData = {
        questions: [
          {
            id: 1,
            question: "What is active listening?",
            options: [
              "Waiting for your turn to speak",
              "Giving full attention and trying to understand the speaker",
              "Thinking about your response while someone talks",
              "Interrupting to show you understand"
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Which of these is a good communication practice?",
            options: [
              "Using 'I' statements to express feelings",
              "Blaming others for problems",
              "Avoiding difficult conversations",
              "Making assumptions without asking"
            ],
            correctAnswer: 0
          },
          {
            id: 3,
            question: "What does setting boundaries mean?",
            options: [
              "Pushing people away",
              "Being selfish",
              "Clearly communicating your limits and needs",
              "Never helping others"
            ],
            correctAnswer: 2
          }
        ]
      };
      
      setQuizData(mockQuizData);
      setSelectedAnswers(new Array(mockQuizData.questions.length).fill(null));
      setLoading(false);
    };

    fetchQuestions();
  }, [lessonTitle]);

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

  const isAllCompleted = selectedAnswers.every(answer => answer !== null);
  const currentQuestion = quizData?.questions[currentQuestionIndex];
  const progressPercentage = quizData ? ((currentQuestionIndex + 1) / quizData.questions.length) * 100 : 0;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      {/* Top Frame - Lesson Title */}
      <div className="bg-white border-b shadow-sm px-6 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-gray-800">{lessonTitle}</h1>
          <p className="text-sm text-gray-500 mt-1">Practice Activity</p>
        </div>
      </div>

      {/* Progress Bar */}
      {quizData && (
        <div className="bg-white border-b px-6 py-3 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Progress value={progressPercentage} className="h-3" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-700 font-medium">
                  {currentQuestionIndex + 1}/{quizData.questions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Middle Frame - Questions */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : currentQuestion ? (
            <div className="flex items-center gap-4">
              {/* Left Arrow - always takes up space */}
              <button
                onClick={handlePrevious}
                className={`flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-gray-50 ${
                  currentQuestionIndex === 0 ? "invisible" : ""
                }`}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              {/* Question Card */}
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-gray-800 mb-6">{currentQuestion.question}</h2>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showCorrectAnswer = showFeedback && isCorrect;
                    const showIncorrectAnswer = showFeedback && isSelected && !isCorrect;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !showFeedback && handleSelectAnswer(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          showCorrectAnswer
                            ? "border-green-500 bg-green-50"
                            : showIncorrectAnswer
                            ? "border-red-500 bg-red-50"
                            : isSelected
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                        } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{option}</span>
                          {showCorrectAnswer && (
                            <span className="text-green-600 text-sm">✓ Correct</span>
                          )}
                          {showIncorrectAnswer && (
                            <span className="text-red-600 text-sm">✗ Incorrect</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showFeedback && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={handleNext}
                      disabled={currentQuestionIndex === quizData!.questions.length - 1}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      {currentQuestionIndex === quizData!.questions.length - 1 ? "Last Question" : "Continue"}
                    </Button>
                  </div>
                )}
              </div>

              {/* Right Arrow - always takes up space */}
              <button
                onClick={handleNext}
                className={`flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-gray-50 ${
                  quizData && currentQuestionIndex === quizData.questions.length - 1 ? "invisible" : ""
                }`}
                disabled={!quizData || currentQuestionIndex === quizData.questions.length - 1}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No questions available</p>
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
          
          {isAllCompleted && (
            <Button
              size="lg"
              onClick={onNext}
              className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}