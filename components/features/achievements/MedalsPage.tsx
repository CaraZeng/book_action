"use client";

import {
  Lock,
  Star,
  Trophy,
  Award,
  Crown,
  Zap,
  Target,
  Medal,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface MedalData {
  id: number;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: React.ComponentType<{ className?: string }>;
}

const medals: MedalData[] = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first lesson",
    earned: true,
    earnedDate: "2024-10-14",
    rarity: "common",
    icon: Star,
  },
  {
    id: 2,
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    earned: true,
    earnedDate: "2024-10-21",
    rarity: "rare",
    icon: Trophy,
  },
  {
    id: 3,
    name: "Quick Learner",
    description: "Complete 10 lessons in one day",
    earned: true,
    earnedDate: "2024-10-27",
    rarity: "epic",
    icon: Zap,
  },
  {
    id: 4,
    name: "Perfect Score",
    description: "Get 100% on 5 lessons",
    earned: true,
    earnedDate: "2024-10-31",
    rarity: "rare",
    icon: Target,
  },
  {
    id: 5,
    name: "Month Master",
    description: "Maintain a 30-day streak",
    earned: false,
    rarity: "epic",
    icon: Award,
  },
  {
    id: 6,
    name: "Language Legend",
    description: "Complete all lessons in a course",
    earned: false,
    rarity: "legendary",
    icon: Crown,
  },
  {
    id: 7,
    name: "Social Butterfly",
    description: "Add 10 friends",
    earned: false,
    rarity: "common",
    icon: Star,
  },
  {
    id: 8,
    name: "Practice Makes Perfect",
    description: "Complete 50 practice sessions",
    earned: false,
    rarity: "rare",
    icon: Medal,
  },
];

export function MedalsPage() {
  const earnedMedals = medals.filter((m) => m.earned);
  const totalMedals = medals.length;
  const progressPercentage = (earnedMedals.length / totalMedals) * 100;

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-100 to-gray-50";
      case "rare":
        return "from-blue-100 to-blue-50";
      case "epic":
        return "from-purple-100 to-pink-50";
      case "legendary":
        return "from-yellow-100 to-orange-50";
      default:
        return "from-gray-100 to-gray-50";
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500";
      case "rare":
        return "bg-blue-500";
      case "epic":
        return "bg-purple-500";
      case "legendary":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-semibold text-gray-700">Collection Progress</span>
              <span className="text-base font-bold text-gray-900">
                {earnedMedals.length}/{totalMedals} Medals
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </div>

        {/* Medals Grid - 固定宽高比 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {medals.map((medal) => {
            const MedalIcon = medal.icon;
            return (
              <div
                key={medal.id}
                className="relative aspect-square"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getRarityGradient(
                    medal.rarity
                  )} rounded-2xl shadow-lg border-2 ${
                    medal.earned 
                      ? "border-yellow-300 hover:shadow-xl" 
                      : "border-gray-200 opacity-60"
                  } transition-all overflow-hidden`}
                >
                  {/* 闪光效果 - 只对已获得的奖牌 */}
                  {medal.earned && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-shimmer" />
                  )}

                  {/* Rarity Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getRarityBadge(medal.rarity)} text-white text-xs px-2 py-0.5`}>
                      {medal.rarity}
                    </Badge>
                  </div>

                  {/* Lock Icon */}
                  {!medal.earned && (
                    <div className="absolute top-3 right-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    {/* Medal Icon */}
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-4 mb-3 ${
                        medal.earned
                          ? "border-yellow-400 bg-gradient-to-br from-yellow-200 to-yellow-100 shadow-lg"
                          : "border-gray-300 bg-gray-100"
                      }`}
                    >
                      <MedalIcon
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${
                          medal.earned ? "text-yellow-600" : "text-gray-400"
                        }`}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 text-center mb-1">
                      {medal.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 text-center line-clamp-2 mb-2">
                      {medal.description}
                    </p>

                    {/* Earned Date */}
                    {medal.earned && medal.earnedDate && (
                      <p className="text-xs text-gray-500 mt-auto">
                        {new Date(medal.earnedDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}

                    {!medal.earned && (
                      <p className="text-xs text-gray-400 mt-auto">Locked</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}