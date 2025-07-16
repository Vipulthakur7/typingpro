import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { StatsDashboard } from "@/components/stats-dashboard";
import { TypingArea } from "@/components/typing-area";
import { VipulSignature } from "@/components/vipul-signature";
import { useTypingGame } from "@/hooks/use-typing-game";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/theme-provider";
import { getTextSample } from "@/lib/text-samples";
import { playKeySound } from "@/lib/audio";
import type { TypingSession, UserSettings } from "@shared/schema";

export default function TypingTest() {
  const { theme, toggleTheme, soundEnabled, toggleSound } = useTheme();
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [customText, setCustomText] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch recent sessions and stats
  const { data: recentSessions = [] } = useQuery<TypingSession[]>({
    queryKey: ["/api/sessions"],
  });

  const { data: bestStats } = useQuery({
    queryKey: ["/api/stats"],
  });

  // Save session mutation
  const saveSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await apiRequest("POST", "/api/sessions", sessionData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  // Initialize typing game
  const {
    gameState,
    startGame,
    resetGame,
    pauseGame,
    handleInput,
    highlightedText,
    isComplete,
  } = useTypingGame({
    initialText: getTextSample(difficulty),
    onComplete: (stats) => {
      saveSessionMutation.mutate({
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        timeSeconds: stats.timeSeconds,
        difficulty,
        textLength: stats.textLength,
        errors: stats.errors,
      });
      setShowResults(true);
    },
    onKeyPress: () => {
      if (soundEnabled) {
        playKeySound();
      }
    },
  });

  const handleNewText = () => {
    const newText = getTextSample(difficulty);
    resetGame(newText);
    setShowResults(false);
  };

  const handleCustomText = () => {
    if (customText.trim()) {
      resetGame(customText.trim());
      setShowCustomInput(false);
      setCustomText("");
      setShowResults(false);
    }
  };

  const handleDifficultyChange = (newDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(newDifficulty);
    const newText = getTextSample(newDifficulty);
    resetGame(newText);
    setShowResults(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour ago`;
    return "Yesterday";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/10 to-pink-500/20"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardContent className="p-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                <i className="fas fa-keyboard text-purple-400 mr-3"></i>
                VipulType Pro
              </h1>
              <p className="text-slate-300 text-lg">Master your typing speed with real-time feedback</p>
              <div className="mt-2">
                <span className="text-sm text-purple-300/80">Built with ❤️ by Vipul</span>
              </div>
              
              {/* Controls */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  onClick={toggleTheme}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <i className={`fas fa-${theme === 'dark' ? 'moon' : 'sun'} mr-2`}></i>
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <i className="fas fa-code mr-2"></i>
                  Vipul's Edition
                </Button>
                <Button
                  onClick={toggleSound}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <i className={`fas fa-volume-${soundEnabled ? 'up' : 'mute'} mr-2`}></i>
                  {soundEnabled ? 'Sound' : 'Muted'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Typing Area */}
          <div className="lg:col-span-2 space-y-6">
            <StatsDashboard gameState={gameState} />
            <TypingArea
              gameState={gameState}
              highlightedText={highlightedText}
              onInput={handleInput}
              onReset={() => {
                resetGame();
                setShowResults(false);
              }}
              onPause={pauseGame}
              onNewText={handleNewText}
              onCustomText={() => setShowCustomInput(true)}
              showCustomInput={showCustomInput}
              customText={customText}
              onCustomTextChange={setCustomText}
              onUseCustomText={handleCustomText}
              onCancelCustomText={() => {
                setShowCustomInput(false);
                setCustomText("");
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Difficulty Selector */}
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  <i className="fas fa-target text-purple-400 mr-2"></i>
                  Difficulty
                </h3>
                <div className="space-y-3">
                  {(["easy", "medium", "hard"] as const).map((level) => (
                    <Button
                      key={level}
                      onClick={() => handleDifficultyChange(level)}
                      variant={difficulty === level ? "default" : "outline"}
                      className={`w-full justify-start ${
                        difficulty === level
                          ? "bg-purple-500 border-purple-500 text-white"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      <i className={`fas fa-${level === "easy" ? "seedling" : level === "medium" ? "fire" : "bolt"} mr-2`}></i>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Scores */}
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  <i className="fas fa-chart-line text-blue-400 mr-2"></i>
                  Recent Scores
                </h3>
                <div className="space-y-3">
                  {recentSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex justify-between items-center p-3 bg-black/20 rounded-xl">
                      <div>
                        <div className="text-white font-medium">{session.wpm} WPM</div>
                        <div className="text-slate-400 text-sm">{session.accuracy.toFixed(1)}% accuracy</div>
                      </div>
                      <div className="text-slate-400 text-sm">{getTimeAgo(session.createdAt)}</div>
                    </div>
                  ))}
                  {recentSessions.length === 0 && (
                    <div className="text-center text-slate-400 py-4">No recent scores</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  <i className="fas fa-trophy text-yellow-400 mr-2"></i>
                  Your Best
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Best WPM</span>
                    <span className="text-purple-400 font-bold">{bestStats?.bestWpm || 0} WPM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Best Accuracy</span>
                    <span className="text-green-400 font-bold">{bestStats?.bestAccuracy?.toFixed(1) || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Tests Taken</span>
                    <span className="text-blue-400 font-bold">{bestStats?.totalSessions || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Time Practiced</span>
                    <span className="text-orange-400 font-bold">
                      {bestStats?.totalTime ? `${(bestStats.totalTime / 3600).toFixed(1)}h` : "0h"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Custom Text Modal */}
        {showCustomInput && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md w-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Custom Text</h3>
                <Textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Paste your custom text here..."
                  className="bg-black/30 text-white border-white/20 focus:border-purple-500 mb-4"
                  rows={4}
                />
                <div className="flex gap-3">
                  <Button onClick={handleCustomText} className="flex-1 bg-green-500 hover:bg-green-600">
                    Use This Text
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomText("");
                    }}
                    variant="outline"
                    className="flex-1 bg-gray-500/20 border-gray-500/50 text-white hover:bg-gray-500/30"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Modal */}
        {showResults && isComplete && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md w-full">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Fantastic Work!</h3>
                  <p className="text-purple-300 text-sm mb-4">Another milestone achieved with VipulType Pro</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-cyan-400">{gameState.wpm}</div>
                      <div className="text-slate-300">WPM</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-400">{gameState.accuracy.toFixed(1)}%</div>
                      <div className="text-slate-300">Accuracy</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-400">{formatTime(gameState.timeElapsed)}</div>
                      <div className="text-slate-300">Time</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                      <div className="text-2xl font-bold text-pink-400">{gameState.cpm}</div>
                      <div className="text-slate-300">CPM</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setShowResults(false);
                        resetGame();
                      }}
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={() => {
                        setShowResults(false);
                        handleNewText();
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                    >
                      New Text
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <VipulSignature />
    </div>
  );
}
