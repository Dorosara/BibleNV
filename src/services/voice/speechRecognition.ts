export class SpeechRecognitionService {
  private recognition: any;
  private isListening: boolean = false;

  constructor() {
    if (!('webkitSpeechRecognition' in window)) {
      throw new Error('Speech recognition not supported in this browser');
    }
    
    // @ts-ignore - WebkitSpeechRecognition is not in TypeScript's lib
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
  }

  listen(): Promise<string> {
    if (this.isListening) {
      throw new Error('Already listening');
    }

    return new Promise((resolve, reject) => {
      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        this.isListening = false;
        resolve(text);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(new Error(event.error));
      };

      this.recognition.start();
    });
  }

  stop(): void {
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}