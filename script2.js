document.addEventListener("DOMContentLoaded", () => {
    const words = ["apple", "banana", "mango", "grape", "peach", "kiwi", "orange"];
    let secretWord = "";
    let attemptsLeft = 5;
  
    const guessInput = document.getElementById("guessInput");
    const submitBtn = document.getElementById("submitBtn");
    const restartBtn = document.getElementById("restartBtn");
    const message = document.getElementById("message");
    const hint = document.getElementById("hint");
  
    const body = document.body;
  
    function pickRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }
  
    function initializeGame() {
      secretWord = pickRandomWord();
      attemptsLeft = 5;
      guessInput.value = "";
      message.textContent = "";
      hint.textContent = "";
      body.style.backgroundColor = "#f0f0f0";
      submitBtn.disabled = false;
      restartBtn.style.display = "none";
      console.log("Secret Word:", secretWord); 
    }
  
    function updateUI(status, text, color) {
      message.textContent = text;
      message.style.color = color;
      if (status === "win") {
        body.style.backgroundColor = "#c8f7c5"; 
      } else if (status === "lose") {
        body.style.backgroundColor = "#f7c5c5"; 
      }
    }
  
    function handleGuess() {
      let userGuess = guessInput.value.trim().toLowerCase();
  
      if (!userGuess) {
        attemptsLeft--;
        updateUI("try", `Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`, "red");
      } else if (userGuess === secretWord) {
        updateUI("win", "🎉 Congratulations! You guessed the secret word!", "green");
        submitBtn.disabled = true;
        restartBtn.style.display = "inline-block";
      } else {
        attemptsLeft--;
        if (attemptsLeft > 0) {
          updateUI("try", `❌ Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`, "red");
          hint.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'.`;
        } else {
          updateUI("lose", `💀 Game over! The secret word was '${secretWord}'.`, "black");
          submitBtn.disabled = true;
          restartBtn.style.display = "inline-block";
        }
      }
  
      if (guessInput.value === "") {
        alert("You must write something");

      }
    }
  
    function handleEnterKey(e) {
      if (e.key === "Enter") {
        handleGuess();
      }
    }
  
    // Event Listeners
    submitBtn.addEventListener("click", handleGuess);
    restartBtn.addEventListener("click", initializeGame);
    guessInput.addEventListener("keypress", handleEnterKey);
  
    // Start the game
    initializeGame();
  });
  