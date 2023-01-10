class Calculator {
    /* attributes */
    #prevOperandElement;
    #currOperandElement;
    #prevOperand;
    #currOperand;
    #operation;
    #hasUsedEqualsButton;

    constructor(prevOperandElement, currOperandElement) {
        this.#prevOperandElement = prevOperandElement;
        this.#currOperandElement = currOperandElement;
        this.#prevOperand = "";
        this.#currOperand = "";
        this.#operation = "";
        this.#hasUsedEqualsButton = false;
    }

    updateDisplay() {
        if (this.#operation !== "") {
            this.#prevOperandElement.innerHTML = this.#prevOperand + " " + this.#operation;
        } else {
            this.#prevOperandElement.innerHTML = this.#prevOperand;
        }

        this.#currOperandElement.innerHTML = this.#currOperand;
    }

    clear() {
        this.#prevOperand = "";
        this.#currOperand = "";
        this.#operation = "";
    }

    append(num) {
        if (this.#hasUsedEqualsButton) {
            this.#currOperand = "";
            this.#hasUsedEqualsButton = false;
        }

        if (num === "." && this.#currOperand.includes("."))
            return;

        this.#currOperand += num;
    }

    deleteLastDigit() {
        if (this.#currOperand === "") {
            return;
        }

        if (this.#hasUsedEqualsButton) {
            this.clear();
            return;
        }

        this.#currOperand = this.#currOperand.slice(0, this.#currOperand.length - 1);
    }

    equals() {
        this.compute();
        this.#hasUsedEqualsButton = true;
        this.#prevOperand = "";
        this.#operation = "";
    }

    setOperation(op) {
        if (this.#currOperand === "") {
            return;
        }

        if (this.#prevOperand === "") {
            this.#prevOperand = this.#currOperand;
            this.#currOperand = "";
        }

        this.#operation = op;
    }

    compute() {
        switch (this.#operation) {
        case "+":
            this.#currOperand = (parseFloat(this.#prevOperand) + parseFloat(this.#currOperand)).toString();
            break;
        case "-":
            this.#currOperand = (parseFloat(this.#prevOperand) - parseFloat(this.#currOperand)).toString();
            break;
        case "*":
            this.#currOperand = (parseFloat(this.#prevOperand) * parseFloat(this.#currOperand)).toString();
            break;
        case "/":
            if (this.#currOperand === "0") {
                this.#currOperand = "DivisionByZero"
                return;
            }

            this.#currOperand = (parseFloat(this.#prevOperand) / parseFloat(this.#currOperand)).toString();
            break;
        default:
            break;
        }
    }
}

const prevOperandElement = document.querySelector("[data-prev-operand]");
const currOperandElement = document.querySelector("[data-curr-operand]");
const numberButtons = document.querySelectorAll("[data-numbers]");
const operationButtons = document.querySelectorAll("[data-operators]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");

const calculator = new Calculator(prevOperandElement, currOperandElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.append(button.innerHTML);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.setOperation(button.innerHTML);
        calculator.updateDisplay();
    });
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.deleteLastDigit();
    calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
    calculator.equals();
    calculator.updateDisplay();
});