// Get references to elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to handle speech synthesis
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.lang = "en-GB";

  let voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    // Load voices asynchronously if not loaded yet
    speechSynthesis.onvoiceschanged = () => {
      text_speak.voice = speechSynthesis.getVoices().find(
        (voice) => voice.name === "Google UK English Female"
      );
      window.speechSynthesis.speak(text_speak);
    };
  } else {
    text_speak.voice = voices.find(
      (voice) => voice.name === "Google UK English Female"
    );
    window.speechSynthesis.speak(text_speak);
  }

  text_speak.pitch = 1;
  text_speak.rate = 1;
  text_speak.volume = 1;
}

// Function to greet based on time
function wishME() {
  let today = new Date();
  let hours = today.getHours();

  if (hours >= 0 && hours < 12) {
    speak("Good morning!");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon!");
  } else if (hours >= 16 && hours < 20) {
    speak("Good evening!");
  } else {
    speak("Good night!");
  }
}

// Greet when the page loads
window.addEventListener("load", () => {
  wishME();
});

// Initialize SpeechRecognition
let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  let transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

// Button click to start voice recognition
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

// Function to handle voice commands
function takeCommand(command) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (command.includes("hello") || command.includes("hi")) {
    speak("Hello! My dear friend, how can I help you?");
  } else if (command.includes("day")) {
    let today = new Date();
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let currentDay = days[today.getDay()];
    speak(`Today is ${currentDay}`);
  } else if (command.includes("time")) {
    let today = new Date();
    let hours = today.getHours().toString().padStart(2, "0");
    let minutes = today.getMinutes().toString().padStart(2, "0");
    let currentTime = `${hours}:${minutes}`;
    speak(`The current time is ${currentTime}`);
  } else if (command.includes("what is your name")) {
    speak("I am Stella Core.");
  } else if (command.includes("who are you")) {
    speak("I am a Virtual Assistant created by Miss Uzma Shamraiz Khan.");
  } else if (command.includes("date")) {
    let today = new Date();
    let currentDate = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    speak(`Today's date is ${currentDate}`);
  } else if (command.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com", "_blank");
  } else if (command.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com", "_blank");
  } else if (command.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com", "_blank");
  } else if (command.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com", "_blank");
  } else if (command.includes("open twitter")) {
    speak("Opening Twitter...");
    window.open("https://www.twitter.com", "_blank");
  } else if (command.includes("close")) {
    recognition.stop();
    speak("Goodbye! Have a great day!");
    window.close();
  } else {
    // If the command is unrecognized, search on Google
    speak(`I don't know the answer to that. Let me search for you: ${command}`);
    window.open(`https://www.google.com/search?q=${command}`, "_blank");
  }
}
