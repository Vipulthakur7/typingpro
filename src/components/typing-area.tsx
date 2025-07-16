import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface TypingAreaProps {
  gameState: any;
  highlightedText: string;
  onInput: (value: string) => void;
  onReset: () => void;
  onPause: () => void;
  onNewText: () => void;
  onCustomText: () => void;
  showCustomInput: boolean;
  customText: string;
  onCustomTextChange: (value: string) => void;
  onUseCustomText: () => void;
  onCancelCustomText: () => void;
}

export function TypingArea({
  gameState,
  highlightedText,
  onInput,
  onReset,
  onPause,
  onNewText,
  onCustomText,
  showCustomInput,
  customText,
  onCustomTextChange,
  onUseCustomText,
  onCancelCustomText,
}: TypingAreaProps) {
  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20">
      <CardContent className="p-8">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Type the text below:</h3>
          <div className="flex gap-2">
            <Button onClick={onNewText} className="bg-purple-500 hover:bg-purple-600">
              <i className="fas fa-refresh mr-2"></i>New Text
            </Button>
            <Button onClick={onCustomText} className="bg-blue-500 hover:bg-blue-600">
              <i className="fas fa-edit mr-2"></i>Custom
            </Button>
          </div>
        </div>
        
        {/* Custom Text Input */}
        {showCustomInput && (
          <div className="mb-4 p-4 bg-black/20 rounded-xl border border-white/10">
            <Textarea
              value={customText}
              onChange={(e) => onCustomTextChange(e.target.value)}
              className="w-full mb-4 bg-black/30 text-white border-white/20 focus:border-purple-500 resize-none font-mono"
              rows={4}
              placeholder="Paste your custom text here..."
            />
            <div className="flex gap-2">
              <Button onClick={onUseCustomText} className="bg-green-500 hover:bg-green-600">
                Use This Text
              </Button>
              <Button onClick={onCancelCustomText} variant="outline" className="bg-gray-500/20 border-gray-500/50 text-white hover:bg-gray-500/30">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Text to Type */}
        <div
          className="text-lg leading-relaxed font-mono p-6 bg-black/20 rounded-xl border border-white/10 mb-6 text-slate-200 min-h-32"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />

        {/* Typing Input */}
        <div className="relative mb-6">
          <Textarea
            value={gameState.typedText}
            onChange={(e) => onInput(e.target.value)}
            className="w-full p-4 bg-black/30 text-white border-2 border-white/20 focus:border-purple-500 resize-none font-mono text-lg leading-relaxed"
            rows={4}
            placeholder="Start typing here..."
            spellCheck={false}
            autoComplete="off"
          />
          <div className="absolute top-2 right-2 text-slate-400">
            <i className="fas fa-keyboard"></i>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={onReset} variant="outline" className="flex-1 bg-slate-600/20 border-slate-600/50 text-white hover:bg-slate-600/30">
            <i className="fas fa-redo mr-2"></i>Reset Test
          </Button>
          <Button onClick={onPause} className="px-6 bg-orange-500 hover:bg-orange-600">
            <i className={`fas fa-${gameState.isPaused ? 'play' : 'pause'} mr-2`}></i>
            {gameState.isPaused ? 'Resume' : 'Pause'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
