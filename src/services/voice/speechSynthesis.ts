export class SpeechSynthesisService {
  private synthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.setPreferredVoice();
  }

  private setPreferredVoice(): void {
    const voices = this.synthesis.getVoices();
    this.voice = voices.find(voice => 
      voice.lang === 'en-US' && voice.name.includes('Female')
    ) || voices[0];
  }

  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (this.voice) {
        utterance.voice = this.voice;
      }
      
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);
      
      this.synthesis.speak(utterance);
    });
  }

  stop(): void {
    this.synthesis.cancel();
  }

  pause(): void {
    this.synthesis.pause();
  }

  resume(): void {
    this.synthesis.resume();
  }
}