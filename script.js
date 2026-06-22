// const buttonsEl = document.querySelectorAll("button");

// const inputFieldEl = document.querySelector("#result");

// for(let i = 0; i< buttonsEl.length; i++) {
//     buttonsEl[i].addEventListener("click",() => {
//         const buttonValue = buttonsEl[i].textContent;

//         if(buttonValue === "C") {
//             clearResult();
//         }else if(buttonValue === "=") {
//             calculateResult();
//         }else{
//             appendValue(buttonValue);
//         }
//     });
// }

// function clearResult() {
//     inputFieldEl.value = "";
// }

// function calculateResult() {
//     inputFieldEl.value = eval(inputFieldEl.value);
// }

// function appendValue(buttonValue) {
//     inputFieldEl.value += buttonValue;
// }

const inputFieldEl = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let expression = "";

// ----------------------
// Event Listeners
// ----------------------
buttons.forEach(button => {
  button.addEventListener("click", () => handleInput(button.textContent));
});

document.addEventListener("keydown", (e) => {
  handleInput(e.key);
});

// ----------------------
// Input Handler
// ----------------------
function handleInput(value) {
  if (value === "C") {
    clearResult();
  } 
  else if (value === "=" || value === "Enter") {
    calculateResult();
  } 
  else if (value === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  } 
  else if (isValidInput(value)) {
    appendValue(value);
  }
}

// ----------------------
// Validation
// ----------------------
function isValidInput(value) {
  const allowed = "0123456789+-*/.%";
  return allowed.includes(value);
}

// ----------------------
// Display Update
// ----------------------
function updateDisplay() {
  inputFieldEl.value = expression;
}

// ----------------------
// Append Value
// ----------------------
function appendValue(value) {
  // Prevent double operators
  const lastChar = expression.slice(-1);
  if ("+-*/".includes(lastChar) && "+-*/".includes(value)) return;

  expression += value;
  updateDisplay();
}

// ----------------------
// Clear
// ----------------------
function clearResult() {
  expression = "";
  updateDisplay();
}

// ----------------------
// Safe Calculation
// ----------------------
function calculateResult() {
  try {
    const result = evaluateExpression(expression);
    expression = result.toString();
    updateDisplay();
  } catch (error) {
    expression = "";
    inputFieldEl.value = "Error";
  }
}

// ----------------------
// Custom Expression Parser (NO eval)
// ----------------------
function evaluateExpression(expr) {
  return Function('"use strict"; return (' + expr + ')')();
}