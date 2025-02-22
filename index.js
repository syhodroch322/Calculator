document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector(".place");
    const buttons = document.querySelectorAll(".buttons button");

    let currentInput = "";
    let operator = "";
    let firstValue = null;
    let waitingForSecondValue = false;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (!isNaN(value) || value === ".") {
                handleNumber(value);
            } else {
                handleOperator(value);
            }

            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (waitingForSecondValue) {
            currentInput = value;
            waitingForSecondValue = false;
        } else {
            if (value === "." && currentInput.includes(".")) return;
            currentInput = currentInput === "0" ? value : currentInput + value;
        }
    }

    function handleOperator(value) {
        if (value === "AC") {
            currentInput = "";
            operator = "";
            firstValue = null;
            waitingForSecondValue = false;
        } else if (value === "+/-") {
            currentInput = currentInput ? String(parseFloat(currentInput) * -1) : "";
        } else if (value === "%") {
            currentInput = currentInput ? String(parseFloat(currentInput) / 100) : "";
        } else if (value === "=") {
            if (operator && firstValue !== null) {
                currentInput = String(operate(firstValue, parseFloat(currentInput), operator));
                firstValue = null;
                operator = "";
            }
        } else {
            if (firstValue === null) {
                firstValue = parseFloat(currentInput);
            } else if (operator) {
                firstValue = operate(firstValue, parseFloat(currentInput), operator);
            }
            operator = value;
            waitingForSecondValue = true;
        }
    }

    function operate(a, b, operator) {
        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return b !== 0 ? a / b : "Ошибка";
            default: return b;
        }
    }

    function updateDisplay() {
        display.value = currentInput || "0";
    }
});