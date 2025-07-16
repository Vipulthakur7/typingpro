// Simple audio context for keyboard sounds
let audioContext: AudioContext | null = null;

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function playKeySound() {
  try {
    const ctx = initAudioContext();
    
    // Create a simple beep sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Configure the sound - Vipul's custom frequency
    oscillator.frequency.value = 880; // A5 note - more pleasant sound
    oscillator.type = 'triangle'; // Softer than sine
    
    // Configure volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
    
    // Play the sound
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (error) {
    // Silently fail if audio context is not available
    console.warn('Audio playback failed:', error);
  }
}
