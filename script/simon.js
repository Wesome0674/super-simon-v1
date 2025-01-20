let score = 0;
let isUserTurn = false;
let delay = 1000;

const state = document.querySelector("#turn");
let gameColorsPattern = [];
let clickedColors = [];
const backgroundScreen = document.getElementById("background-screen");
const possibleColors = ["yellow", "purple", "red", "orange", "blue", "green"];
let colorOrder = [...possibleColors]; // Les couleurs disponibles

let audio1 = new Audio("/assets/son/1.mp3");
let audio2 = new Audio("/assets/son/2.mp3");
let audio3 = new Audio("/assets/son/3.mp3");
let audio4 = new Audio("/assets/son/4.mp3");
let audio5 = new Audio("/assets/son/5.mp3");
let audio6 = new Audio("/assets/son/6.mp3");
let three = new Audio("/assets/son/three.mp3");
let two = new Audio("/assets/son/two.mp3");
let one = new Audio("/assets/son/one.mp3");
let wrong = new Audio("/assets/son/wrong.mp3");

let currentAudio = null; // Variable pour suivre le son en cours

const generateRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorOrder.length);
  const selectedColor = colorOrder[randomIndex];
  gameColorsPattern.push(selectedColor);
};

const highlightSelectedColor = (tab) => {
  tab.forEach((color, index) => {
    setTimeout(() => {
      const highlightedColor = document.getElementById(color);
      highlightedColor.style.filter = "brightness(1)";

      switch (color) {
        case "yellow":
          backgroundScreen.style.backgroundColor = "#FFD51B";
          break;
        case "purple":
          backgroundScreen.style.backgroundColor = "#BF00FF";
          break;
        case "red":
          backgroundScreen.style.backgroundColor = "#F0252F";
          break;
        case "orange":
          backgroundScreen.style.backgroundColor = "#FF7627";
          break;
        case "blue":
          backgroundScreen.style.backgroundColor = "#27DEFF";
          break;
        case "green":
          backgroundScreen.style.backgroundColor = "#41FF27";
          break;
        default:
          console.log("sorry but it seems to not working");
      }

      setTimeout(() => {
        highlightedColor.style.filter = "brightness(50%)";
      }, 500);
    }, index * delay);
  });

  setTimeout(() => {
    backgroundScreen.style.backgroundColor = "black";
    isUserTurn = true; // C'est le tour du joueur
    updateTurnDisplay();
    userChooseAColor();
  }, tab.length * delay);
};

const userChooseAColor = () => {
  const buttonClicked = document.querySelectorAll(".game-button");

  buttonClicked.forEach((button) => {
    button.onclick = () => {
      if (!isUserTurn) return; // Ignorer les clics si ce n'est pas le tour du joueur

      switch (button.id) {
        case "yellow":
          currentAudio = audio1;
          break;
        case "purple":
          currentAudio = audio2;
          break;
        case "red":
          currentAudio = audio3;
          break;
        case "orange":
          currentAudio = audio4;
          break;
        case "blue":
          currentAudio = audio5;
          break;
        case "green":
          currentAudio = audio6;
          break;
        default:
          console.log("sorry but it seems to not working");
      }

      if (currentAudio) {
        currentAudio.currentTime = 0;
        currentAudio.play();
      }

      button.style.filter = "brightness(1)";
      setTimeout(() => {
        button.style.filter = "brightness(50%)";
      }, 500);

      clickedColors.push(button.id);
      console.log(clickedColors);
      console.log(gameColorsPattern);

      const lastClickedColor = button.id;
      const isCorrectColor =
        lastClickedColor === gameColorsPattern[clickedColors.length - 1];

      if (!isCorrectColor) {
        wrong.play();
        let layerEnd = document.getElementById("layer-blur");
        layerEnd.style.display = "grid";
        document.querySelector("#score-fin").innerHTML = score;

        let message;
        if (score <= 45) {
          message = "Mémoire de poisson rouge";
        } else if (score <= 90) {
          message = "Pas mal, mais tu peux mieux faire !";
        } else if (score <= 150) {
          message = "Bien joué ! Tu commences à te souvenir !";
        } else {
          message = "Impressionnant ! Tu es un vrai maître de la mémoire !";
        }
        document.querySelector("#message").innerHTML = message;

        let replay = document.querySelector("#replay");
        replay.addEventListener("click", () => {
          resetGame();
          layerEnd.style.display = "none";
          location.reload();
          updateCompteur();
        });

        return;
      }

      if (clickedColors.length === gameColorsPattern.length) {
        const isCorrectPattern = clickedColors.every(
          (color, index) => color === gameColorsPattern[index]
        );

        if (isCorrectPattern) {
          score >= 200 ? score : (score += 15);
          document.querySelector("#score").innerHTML = score;
          clickedColors = [];
          isUserTurn = false;
          updateTurnDisplay();
          simonTurn();
          delay = delay - 50;
        }
      }
    };
  });
};

const simonTurn = () => {
  isUserTurn = false;
  generateRandomColor();
  setTimeout(() => {
    highlightSelectedColor(gameColorsPattern);
  }, 1500);
};

const resetGame = () => {
  score = 0;
  clickedColors = [];
  gameColorsPattern = [];
  document.querySelector("#score").innerHTML = score;
  updateTurnDisplay();
  count = 3;
};

const updateTurnDisplay = () => {
  state.innerHTML = isUserTurn ? "A Toi" : "A Simon";
};

let compteur = document.querySelector("#compteur");
let count = 3;

let backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 0.2;

function updateCompteur() {
  state.innerHTML = "";
  if (count > 0) {
    compteur.innerHTML = count;
    switch (count) {
      case 3:
        three.play();
        break;
      case 2:
        two.play();
        break;
      case 1:
        one.play();
        break;
      default:
        console.log("sorry but it seems to not working");
    }
    count--;
    setTimeout(updateCompteur, 1000);
  } else {
    compteur.innerHTML = "";
    state.innerHTML = "A Simon";
    simonTurn();
  }
}

updateCompteur();
