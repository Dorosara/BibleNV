export function startVoiceInput(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported'));
      return;
    }

    // @ts-ignore - WebkitSpeechRecognition is not in TypeScript's lib
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      resolve(text);
    };

    recognition.onerror = (event: any) => {
      reject(new Error(event.error));
    };

    recognition.start();
  });
}