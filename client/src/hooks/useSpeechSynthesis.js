// Voice feature removed as requested.
export function useSpeechSynthesis() {
  return {
    isSpeaking: false,
    isSupported: false,
    speak: () => {},
    stop: () => {},
    pause: () => {},
    resume: () => {}
  };
}
