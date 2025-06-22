const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

const updateDisplay = () => {
  display.textContent = expression || "0";
};

const evaluateExpression = () => {
  try {
    const result = eval(expression);
    expression = String(result);
    updateDisplay();
  } catch {
    display.textContent = "Error";
  }
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key;

    switch (key) {
      case "C":
        expression = "";
        break;
      case "⌫":
        expression = expression.slice(0, -1);
        break;
      case "=":
        evaluateExpression();
        return;
      default:
        expression += key;
    }

    updateDisplay();
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[\d\.\+\-\*\/]/.test(key)) {
    expression += key;
  } else if (key === "Enter") {
    evaluateExpression();
    return;
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (key === "Escape") {
    expression = "";
  }

  updateDisplay();
});
