"use client";

import { useState } from "react";
import {
  Star,
  Lock,
  Check,
  Crown,
  MessageCircle,
  Heart,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type LessonStatus = "locked" | "current" | "completed";

interface Lesson {
  id: number;
  title: string;
  status: LessonStatus;
  xp: number;
  stars: number;
  type: "lesson" | "practice" | "story" | "achievement";
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface LearningRoadmapProps {
  onStartLesson: (lessonTitle: string, lessonId: number) => void;
  onStartModule?: (moduleId: number, moduleTitle: string) => void;
  completedLessonIds: number[];
}

const modules: Module[] = [
  {
    id: 3,
    title: "Module 3: Communication and Boundaries",
    lessons: [
      {
        id: 1,
        title: "Active Listening",
        status: "completed",
        xp: 50,
        stars: 3,
        type: "lesson",
      },
      {
        id: 2,
        title: "Expressing Needs",
        status: "completed",
        xp: 50,
        stars: 3,
        type: "lesson",
      },
      {
        id: 3,
        title: "Setting Boundaries",
        status: "current",
        xp: 50,
        stars: 0,
        type: "lesson",
      },
      {
        id: 4,
        title: "Conflict Resolution",
        status: "locked",
        xp: 50,
        stars: 0,
        type: "lesson",
      },
      {
        id: 5,
        title: "Nonverbal Cues",
        status: "locked",
        xp: 50,
        stars: 0,
        type: "lesson",
      },
      {
        id: 6,
        title: "Communication Practice",
        status: "locked",
        xp: 40,
        stars: 0,
        type: "practice",
      },
    ],
  },
  {
    id: 4,
    title: "Module 4: Healthy vs. Unhealthy Relationships",
    lessons: [
      {
        id: 7,
        title: "Red Flags",
        status: "locked",
        xp: 50,
        stars: 0,
        type: "lesson",
      },
      {
        id: 8,
        title: "Green Flags",
        status: "locked",
        xp: 50,
        stars: 0,
        type: "lesson",
      },
      {
        id: 9,
        title: "Trust & Respect",
        status: "locked",
        xp: 50,
        stars: 0,
        type: "lesson",
      },
      {
        id: 10,
        title: "Module 4 Review",
        status: "locked",
        xp: 100,
        stars: 0,
        type: "achievement",
      },
    ],
  },
];

export function LearningRoadmap({
  onStartLesson,
  onStartModule,
  completedLessonIds,
}: LearningRoadmapProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Helper function to determine lesson status based on completedLessonIds
  const getLessonStatus = (
    lesson: Lesson,
    lessonIndex: number,
    allPreviousLessons: Lesson[]
  ): LessonStatus => {
    if (completedLessonIds.includes(lesson.id)) {
      return "completed";
    }

    const allPreviousCompleted = allPreviousLessons.every((prev) =>
      completedLessonIds.includes(prev.id)
    );

    if (allPreviousCompleted) {
      return "current";
    }

    return "locked";
  };

  // Get all lessons with updated statuses
  const allLessons = modules.flatMap((m) => m.lessons);
  const updatedModules = modules.map((module) => ({
    ...module,
    lessons: module.lessons.map((lesson, index) => {
      const lessonGlobalIndex = allLessons.findIndex((l) => l.id === lesson.id);
      const previousLessons = allLessons.slice(0, lessonGlobalIndex);

      return {
        ...lesson,
        status: getLessonStatus(lesson, index, previousLessons),
      };
    }),
  }));

  const completedCount = completedLessonIds.length;
  const progressPercentage = (completedCount / allLessons.length) * 100;

  const getLessonColor = (lesson: Lesson) => {
    if (lesson.status === "completed") {
      return "bg-yellow-400 hover:bg-yellow-500 border-yellow-600";
    } else if (lesson.status === "current") {
      return "bg-green-500 hover:bg-green-600 border-green-700 ring-4 ring-green-200 animate-pulse";
    } else {
      return "bg-gray-300 border-gray-400 cursor-not-allowed";
    }
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.status === "completed") {
      return <Check className="w-6 h-6 text-white" />;
    } else if (lesson.status === "locked") {
      return <Lock className="w-6 h-6 text-gray-600" />;
    } else if (lesson.type === "achievement") {
      return <Crown className="w-6 h-6 text-white" />;
    } else {
      return <Star className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Overall Progress</span>
          <span className="text-sm">
            {completedCount}/{allLessons.length}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {updatedModules.map((module) => (
        <div key={module.id} className="space-y-6">
          {/* Module Header - Now Clickable */}
          <button
            onClick={() => onStartModule?.(module.id, module.title)}
            className="w-full bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500 hover:shadow-md hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {module.id === 3 ? (
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                ) : (
                  <Heart className="w-6 h-6 text-pink-500" />
                )}
                <h2 className="text-gray-800 font-semibold">{module.title}</h2>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </button>

          {/* Module Lessons */}
          <div className="relative">
            {/* Connecting path */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 -z-10" />

            {/* Lessons */}
            <div className="space-y-8">
              {module.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    {lesson.status !== "locked" && (
                      <div className="inline-block">
                        <div className="text-sm text-gray-600">
                          {lesson.title}
                        </div>
                        {lesson.status === "completed" && (
                          <div className="flex items-center gap-1 justify-end">
                            {[...Array(lesson.stars)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      lesson.status !== "locked" && setSelectedLesson(lesson)
                    }
                    disabled={lesson.status === "locked"}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all transform hover:scale-110 ${getLessonColor(
                      lesson
                    )} ${lesson.type === "achievement" ? "w-20 h-20" : ""}`}
                  >
                    {getLessonIcon(lesson)}
                  </button>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div
                className={`w-20 h-20 mx-auto rounded-full border-4 flex items-center justify-center mb-4 ${getLessonColor(
                  selectedLesson
                )}`}
              >
                {getLessonIcon(selectedLesson)}
              </div>
              <h2 className="mb-2">{selectedLesson.title}</h2>
              <p className="text-gray-600 mb-4">Earn {selectedLesson.xp} XP</p>

              {selectedLesson.status === "completed" && (
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-sm text-gray-600">Completed with</span>
                  <div className="flex gap-1">
                    {[...Array(selectedLesson.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600"
                  size="lg"
                  onClick={() =>
                    onStartLesson(selectedLesson.title, selectedLesson.id)
                  }
                >
                  {selectedLesson.status === "completed"
                    ? "Learn Again"
                    : "Start Lesson"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedLesson(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
