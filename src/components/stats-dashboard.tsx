import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsDashboardProps {
  gameState: {
    wpm: number;
    accuracy: number;
    timeElapsed: number;
    cpm: number;
    progress: number;
    typedText: string;
    targetText: string;
  };
}

export function StatsDashboard({ gameState }: StatsDashboardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">{gameState.wpm}</div>
            <div className="text-slate-300 text-sm">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{gameState.accuracy.toFixed(1)}%</div>
            <div className="text-slate-300 text-sm">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{formatTime(gameState.timeElapsed)}</div>
            <div className="text-slate-300 text-sm">Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400">{gameState.cpm}</div>
            <div className="text-slate-300 text-sm">CPM</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-300 mb-2">
            <span>Progress</span>
            <span>{Math.round(gameState.progress)}%</span>
          </div>
          <Progress 
            value={gameState.progress} 
            className="h-2 bg-slate-700"
          />
        </div>
      </CardContent>
    </Card>
  );
}
