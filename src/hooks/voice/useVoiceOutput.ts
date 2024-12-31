import { useState } from 'react';
import { SpeechSynthesisService } from '../../services/voice/speechSynthesis';

const speechSynthesis = new SpeechSynthesisService();

export function useVoiceOutput() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const speak = async (text: string) => {
    try {
      setIsSpeaking(true);
      setError(null);
      await speechSynthesis.speak(text);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Speech synthesis failed'));
    } finally {
      setIsSpeaking(false);
    }
  };

  const stop = () => {
    speechSynthesis.stop();
    setIsSpeaking(false);
  };

  return {
    isSpeaking,
    error,
    speak,
    stop
  };
}