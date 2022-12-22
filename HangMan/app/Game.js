import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: "Pan Tatedusz",
      category: "Utwór literacki",
    },
    {
      text: "Janko muzykant",
      category: "Utwór literacki",
    },
    {
      text: "Akademia Pana Kleksa",
      category: "Film",
    },
    {
      text: "U Pana Boga za piecem",
      category: "Film",
    },
  ];

  constructor({ outputWrapper, wordWrapper, categoryWrapper, lettersWrapper }) {
    this.outputWrapper = outputWrapper;
    this.wordWrapper = wordWrapper;
    this.categoryWrapper = categoryWrapper;
    this.lettersWrapper = lettersWrapper;

    const { text, category } =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text.toLowerCase());
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;
      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }

  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (event) => {
        this.guess(label, event);
      });
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if (!content.includes("_")) {
      this.winning();
    }
  }

  start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
  }

  winning() {
    this.wordWrapper.innerHTML = "GRATULACJE! WYGRYWASZ! KONIEC GRY";
    this.lettersWrapper.innerHTML = "";
  }

  loosing() {
    this.wordWrapper.innerHTML = "NIESTETY! PRZEGRYWASZ! TO JEST KONIEC GRY";
    this.lettersWrapper.innerHTML = "";
  }
}

const game = new Game({
  outputWrapper: document.getElementById("output"),
  wordWrapper: document.getElementById("word"),
  categoryWrapper: document.getElementById("category"),
  lettersWrapper: document.getElementById("letters"),
});

game.start();
