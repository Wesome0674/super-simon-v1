let score = 0;
let isUserTurn = false;
let delay = 1000;

let audio1 = new Audio('/assets/son/1.mp3');
let audio2 = new Audio('/assets/son/2.mp3');
let audio3 = new Audio('/assets/son/3.mp3');
let audio4 = new Audio('/assets/son/4.mp3');
let audio5 = new Audio('/assets/son/5.mp3');
let audio6 = new Audio('/assets/son/6.mp3');

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
          audio1.play();
          break;
        case "purple":
          audio2.play();
          break;
        case "red":
          audio3.play();
          break;
        case "orange":
          audio4.play();
          break;
        case "blue":
          audio5.play();
          break;
        case "green":
          audio6.play();
          break;
        default:
          console.log("sorry but it seems to not working");
      }
      // Changer la luminosité du bouton cliqué
      button.style.filter = "brightness(1)";

      // Réinitialiser la luminosité après un délai
      setTimeout(() => {
        button.style.filter = "brightness(50%)"; // Ou la valeur que tu veux
      }, 500);

      clikedColors.push(button.id);
      console.log(clikedColors);
      console.log(gameColorsPattern);

      // Vérification si le dernier bouton cliqué est correct
      const lastClickedColor = button.id;
      const isCorrectColor =
        lastClickedColor === gameColorsPattern[clikedColors.length - 1];

      if (!isCorrectColor) {
        // Le joueur a cliqué sur une couleur incorrecte
        let layerEnd = document.getElementById("layer-blur");
        layerEnd.style.display = "grid";
        document.querySelector("#score-fin").innerHTML = score;

        // Afficher un message de perte en fonction du score
        let message;
        if (score <= 3) {
          message = "Mémoire de poisson rouge";
        } else if (score <= 6) {
          message = "Pas mal, mais tu peux mieux faire !";
        } else if (score <= 10) {
          message = "Bien joué ! Tu commences à te souvenir !";
        } else {
          message = "Impressionnant ! Tu es un vrai maître de la mémoire !";
        }
        document.querySelector("#message").innerHTML = message;

        // Gérer la logique de replay
        let replay = document.querySelector("#replay");
        replay.addEventListener("click", () => {
          resetGame();
          layerEnd.style.display = "none";
          location.reload();
          updateCompteur(); // Démarrer le compteur
        });

        return; // Arrêter l'exécution ici
      }

      // Vérification du motif seulement si le joueur a cliqué sur le bon bouton
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
  state.innerHTML = isUserTurn ? "A Toi" : "A Simon";
};

// Démarre le jeu pour la première fois

let compteur = document.querySelector("#compteur");
let count = 3;

function updateCompteur() {
  state.innerHTML = "";
  if (count > 0) {
    compteur.innerHTML = count;
    count--;
    setTimeout(updateCompteur, 1000); // 1000 ms = 1 seconde
  } else {
    compteur.innerHTML = ""; // Afficher 0 à la fin
    state.innerHTML = "A Simon";
    simonTurn(); // Démarrer le tour de Simon après le compteur
  }
}

updateCompteur(); // Démarrer le compteur
