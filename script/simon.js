let score = 0;
let isUserTurn = false;
let delay = 1000;

const possibleColors = ["yellow", "purple", "red", "orange", "blue", "green"];
const state = document.querySelector("#turn");

let gameColorsPattern = [];
let clikedColors = [];

const backgroundScreen = document.getElementById("background-screen");

const generateRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * possibleColors.length);
  const selectedColor = possibleColors[randomIndex];
  gameColorsPattern.push(selectedColor);
};

const highlightSelectedColor = (tab) => {
  tab.forEach((color, index) => {
    setTimeout(() => {
      const highlightedColor = document.getElementById(color);
      highlightedColor.style.opacity = "0.5";

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
        highlightedColor.style.opacity = "1";
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

      clikedColors.push(button.id);
      console.log(clikedColors);
      console.log(gameColorsPattern);

      // Vérification du motif
      if (clikedColors.length === gameColorsPattern.length) {
        const isCorrectPattern = clikedColors.every(
          (color, index) => color === gameColorsPattern[index]
        );

        if (isCorrectPattern) {
          score++;
          document.querySelector("#score").innerHTML = score;
          clikedColors = [];
          isUserTurn = false; // Fin du tour du joueur
          updateTurnDisplay();
          simonTurn(); // Passer au tour de Simon
          delay = delay - 50;
        } else {
          let layerEnd = document.getElementById("layer-blur");
          layerEnd.style.display = "grid";
          document.querySelector("#score-fin").innerHTML = score;
          if (score <= 3) {
            document.querySelector("#message").innerHTML =
              "Mémoire de poisson rouge";
          } else if (score <= 6) {
            document.querySelector("#message").innerHTML =
              "Pas mal, mais tu peux mieux faire !";
          } else if (score <= 10) {
            document.querySelector("#message").innerHTML =
              "Bien joué ! Tu commences à te souvenir !";
          } else {
            document.querySelector("#message").innerHTML =
              "Impressionnant ! Tu es un vrai maître de la mémoire !";
          }
          let replay = document.querySelector("#replay");
          replay.addEventListener("click", () => {
            resetGame();
            layerEnd.style.display = "none";
            location.reload();
            updateCompteur(); // Démarrer le compteur
          });
        }
      }
    };
  });
};

const simonTurn = () => {
  isUserTurn = false; // C'est le tour de Simon
  generateRandomColor();
  highlightSelectedColor(gameColorsPattern);
};

const resetGame = () => {
  score = 0;
  clikedColors = [];
  gameColorsPattern = [];
  document.querySelector("#score").innerHTML = score;
  updateTurnDisplay();
  count = 3;
};

const updateTurnDisplay = () => {
  state.innerHTML = isUserTurn ? "Toi" : "Simon";
};

// Démarre le jeu pour la première fois

let compteur = document.querySelector("#compteur");
let count = 3;

function updateCompteur() {
  if (count > 0) {
    compteur.innerHTML = count;
    count--;
    setTimeout(updateCompteur, 1000); // 1000 ms = 1 seconde
  } else {
    compteur.innerHTML = "0"; // Afficher 0 à la fin
    simonTurn(); // Démarrer le tour de Simon après le compteur
  }
}

updateCompteur(); // Démarrer le compteur
