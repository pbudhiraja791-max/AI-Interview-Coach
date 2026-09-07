// Voice feature removed as requested.
export function useSpeechRecognition() {
  return {
    isListening: false,
    isTranscribing: false,
    isSupported: false,
    audioLevel: 0,
    hasVoiceSignal: false,
    errorMessage: '',
    interimTranscript: '',
    fullText: '',
    speechMetrics: null,
    startListening: () => {},
    stopListening: () => {},
    transcribeRecordedAudio: async () => '',
    resetTranscript: () => {},
    setManualText: () => {}
  };
}
