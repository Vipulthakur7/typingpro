export function VipulSignature() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse"></div>
          <span className="text-white/80 text-sm font-medium">VipulType v2.0</span>
        </div>
      </div>
    </div>
  );
}