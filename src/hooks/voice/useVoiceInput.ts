import { useState } from 'react';
import { SpeechRecognitionService } from '../../services/voice/speechRecognition';

const speechRecognition = new SpeechRecognitionService();

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startListening = async () => {
    try {
      setIsListening(true);
      setError(null);
      const text = await speechRecognition.listen();
      return text;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Voice input failed'));
      return '';
    } finally {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    speechRecognition.stop();
    setIsListening(false);
  };

  return {
    isListening,
    error,
    startListening,
    stopListening
  };
}