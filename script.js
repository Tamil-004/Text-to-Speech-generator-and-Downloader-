let speech = new SpeechSynthesisUtterance();

let voices= [];

let voiceselect = document.querySelector("select");


// Mapping of voice names to country flags (Unicode representation)
const voiceFlags = {
    'Google US English': '🇺🇸',
    'Google UK English Female': '🇬🇧',
    'Google UK English Male': '🇬🇧',
    // Add more voice names and their respective country flags as needed
};

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    // Clear existing options in the select element
    voiceselect.innerHTML = '';

    // Populate select element with options including country flags
    voices.forEach((voice, i) => {
        const option = new Option(`${voice.name} ${voiceFlags[voice.name] || ''}`, i);
        voiceselect.options.add(option);
    });
};

voiceselect.addEventListener("change", () =>{
    speech.voice = voices[voiceselect.value];
});


document.querySelector("button").addEventListener("click", () => {
    // Set the text to be spoken
    speech.text = document.querySelector("textarea").value;
    
    // Generate speech
    window.speechSynthesis.speak(speech);

    // When speech ends, create a downloadable link
    speech.onend = function() {
        const blob = new Blob([speech.text], { type: 'audio/wav' }); // Adjust the type as needed (e.g., 'audio/mpeg' for mp3)
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'generated_speech.wav'; // Adjust the filename and extension as needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
});



