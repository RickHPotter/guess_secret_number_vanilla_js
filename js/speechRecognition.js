const mainDOM = document.querySelector(".game-on");
const sectionDOM = document.querySelector(".play-again");
const guessDOM = document.querySelector("#guess");
const statusDOM = document.querySelector("#status");
const messageDOM = document.querySelector(".message");

function displayGuessBox(guess) {
  const box = guessDOM.querySelector(".box");
  if (box != null) {
    box.innerHTML = guess;
    return;
  }

  div = document.createElement("div");
  div.innerHTML = "You said:";

  span = document.createElement("span");
  span.classList.add("box");
  span.innerHTML = guess;

  guessDOM.appendChild(div);
  guessDOM.appendChild(span);
}

function displayHintBox(deg) {
  const hint = messageDOM.querySelector("[data-id='hint']");
  if (hint != null) {
    console.log("am i");
    hint.style.transform = `rotateZ(${deg}deg)`;
    return;
  }

  const div = document.createElement("div");
  div.innerHTML = "The Secret Number is ";

  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-up-long");
  i.style.transform = `rotateZ(${deg}deg)`;
  i.dataset.id = "hint";

  div.appendChild(i);
  messageDOM.appendChild(div);
}

function playAgainScreen() {
  mainDOM.style.display = "none";
  sectionDOM.style.display = "flex";

  const button = sectionDOM.querySelector('.button')
  button.innerHTML = 'Play Again'

  button.addEventListener("click", _ => initialise())
}

function initialise() {
  mainDOM.style.display = "block";
  sectionDOM.style.display = "none";
  secretNumber.push(rng())
  console.log(secretNumber[secretNumber.length - 1])
  main()
}

function main() {
  // Initialize webkitSpeechRecognition
  let speechRecognition = new webkitSpeechRecognition();

  if (!("webkitSpeechRecognition" in window)) {
    console.log("Speech Recognition Not Available");
  }

  // Set the properties for the Speech Recognition object
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = "pt-Br";

  // Callback Function for on Events
  speechRecognition.onstart = () => {
    statusDOM.innerHTML = "Listenting ...";
  };
  speechRecognition.onerror = () => {
    statusDOM.innerHTML = "Something is Off.";
  };
  speechRecognition.onend = () => {
    statusDOM.innerHTML = "Turned Off.";
  };

  speechRecognition.onresult = (e) => {
    let guess = "";

    for (let i = e.resultIndex; i < e.results.length; ++i) {
      if (e.results[i].isFinal) {
        guess += e.results[i][0].transcript;
      }
    }
    ret = verify(guess, min, max);
    if (!ret.result) {
      statusDOM.innerHTML = `Choose a Number between [${min}-${max}].`;
      return;
    }

    statusDOM.innerHTML = "Listening ...";
    displayGuessBox(ret.guess);

    if (ret.guess == secretNumber[secretNumber.length - 1]) {
      playAgainScreen();
    } else {
      if (ret.guess < secretNumber[secretNumber.length - 1]) {
        displayHintBox(0);
      } else {
        displayHintBox(180);
      }
    }
  };

  speechRecognition.start();
}

//
//
// MAIN.JS
//
//

initialise()