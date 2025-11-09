"use client";

import { Medal, Lock, Star, Trophy, Award, Crown, Zap, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface MedalData {
  id: number;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: React.ComponentType<{ className?: string }>;
  imageUrl?: string; // Placeholder for medal image
}

const medals: MedalData[] = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first lesson",
    earned: true,
    earnedDate: "2024-10-15",
    rarity: "common",
    icon: Star,
  },
  {
    id: 2,
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    earned: true,
    earnedDate: "2024-10-22",
    rarity: "rare",
    icon: Trophy,
  },
  {
    id: 3,
    name: "Quick Learner",
    description: "Complete 10 lessons in one day",
    earned: true,
    earnedDate: "2024-10-28",
    rarity: "epic",
    icon: Zap,
  },
  {
    id: 4,
    name: "Perfect Score",
    description: "Get 100% on 5 lessons",
    earned: true,
    earnedDate: "2024-11-01",
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "legendary":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-4">Medal Collection</h1>
          <p className="text-gray-600 mb-6">
            Earn medals by completing challenges and reaching milestones
          </p>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Collection Progress</span>
                <span className="text-sm">
                  {earnedMedals.length}/{totalMedals} Medals
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medals.map((medal) => (
            <Card
              key={medal.id}
              className={`relative overflow-hidden transition-all ${
                medal.earned
                  ? getRarityColor(medal.rarity)
                  : "bg-gray-50 opacity-75"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Badge
                    className={`${getRarityBadgeColor(medal.rarity)} text-white capitalize`}
                  >
                    {medal.rarity}
                  </Badge>
                  {!medal.earned && (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Medal Image Placeholder */}
                <div
                  className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 ${
                    medal.earned
                      ? "border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200"
                      : "border-gray-300 bg-gray-200"
                  }`}
                >
                  {medal.imageUrl ? (
                    <img
                      src={medal.imageUrl}
                      alt={medal.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <medal.icon
                      className={`w-16 h-16 ${
                        medal.earned ? "text-yellow-600" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>

                <div className="text-center">
                  <CardTitle className="text-lg mb-2">{medal.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {medal.description}
                  </CardDescription>
                </div>

                {medal.earned && medal.earnedDate && (
                  <div className="text-center pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      Earned on {new Date(medal.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {!medal.earned && (
                  <div className="text-center pt-2 border-t">
                    <p className="text-xs text-gray-500">Not earned yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
