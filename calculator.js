const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let input = "";

function updateDisplay(value) {
  display.innerText = value || "0";
}

function calculate(expression) {
  try {
    const sanitized = expression.replace(/[^-()\d/*+.]/g, "");
    const result = Function('"use strict";return (' + sanitized + ")")();
    return result.toFixed(6).replace(/\.?0+$/, ""); // Trim trailing zeros
  } catch {
    return "Error";
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (button.id === "clear") {
      input = "";
    } else if (button.id === "backspace") {
      input = input.slice(0, -1);
    } else if (button.id === "equals") {
      input = calculate(input).toString();
    } else {
      input += value;
    }

    updateDisplay(input);
  });
});

// Optional: Keyboard support
document.addEventListener("keydown", e => {
  if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
    input += e.key;
  } else if (e.key === "Enter") {
    input = calculate(input).toString();
  } else if (e.key === "Backspace") {
    input = input.slice(0, -1);
  } else if (e.key.toLowerCase() === "c") {
    input = "";
  }
  updateDisplay(input);
});
