import React, { Component } from "react";
import "./App.css";
import Digits from "./components/Digits";
const removeDepressedClass = key => {
  Array.from(key.parentNode.children).forEach(k =>
    k.classList.remove("is-depressed")
  );
};
const processNumberKey = (display, key, calculator) => {
  if (
    display.textContent === "0" ||
    calculator.dataset.previousKeyType === "operator"
  ) {
    display.textContent = calculator.dataset.polarity + key.textContent; //Display is replaced
    calculator.dataset.polarity = "";
  } else {
    display.textContent = display.textContent + key.textContent; //Display is appended to
  }
  calculator.dataset.previousKeyType = "number";
};
const calculate = (n1, operator, n2) => {
  let result = "";
  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }
  if (result.toString().includes("."))
    result = Math.round(result * 10000) / 10000;

  return result;
};
const calculateProduct = (display, calculator) => {
  const secondNumber = display.textContent;
  const firstValue = calculator.dataset.firstValue;
  const operator = calculator.dataset.operator;

  calculator.dataset.firstValue = display.textContent = calculate(
    firstValue,
    operator,
    secondNumber
  );
};

class App extends Component {
  state = {
    digits: [
      { id: 1, value: 7 },
      { id: 2, value: 8 },
      { id: 3, value: 9 },
      { id: 4, value: 4 },
      { id: 5, value: 5 },
      { id: 6, value: 6 },
      { id: 7, value: 1 },
      { id: 8, value: 2 },
      { id: 9, value: 3 },
      { id: 10, value: 0 }
    ],
    clearState: "AC"
  };
  processFunctionKey(action, display, key, calculator){
    let previousKeyType = calculator.dataset.previousKeyType;
    if (calculator.dataset.previousKeyType === action) return;
    calculator.dataset.previousKeyType = action; //This may be assigned more generically below
    switch (action) {
      case "decimal":
        if (display.textContent === "0" || previousKeyType === "operator") {
          display.textContent = "0."; //Display is replaced
        } else {
          //Only 1 decimal place is allowed
          display.textContent = display.textContent.includes(".")
            ? display.textContent
            : display.textContent + ".";
        }
  
        break;
      case "subtract":
        if (display.textContent === "0") {
          calculator.dataset.polarity = "-";
          break;
        }
      case "add":
      case "multiply":
      case "divide":
        if (calculator.dataset.firstValue) key.classList.add("is-depressed");
        calculator.dataset.previousKeyType = "operator";
        calculator.dataset.firstValue = display.textContent;
        calculator.dataset.operator = action;
        break;
      case "calculate":
        if (calculator.dataset.firstValue) calculateProduct(display, calculator);
        break;
        case 'clear':
          display.textContent = "0";
          if(key.textContent!=='AC')
          {
            //Clear the display and first value
            this.setState({ clearState: "AC" });
            calculator.dataset.firstValue ="";
          }
       break;
  
      default:
        console.log("ERROR", "Unknown key...");
    }
  }
  componentDidMount() {
    const calculator = document.querySelector(".calculator");
    const keys = calculator.querySelector(".calculator__keys");
    calculator.dataset.polarity = "";
    keys.addEventListener("click", e => {
      const display = document.querySelector(".calculator__display");
      const key = e.target;
      const action = key.dataset.action;

      removeDepressedClass(key);
      if(calculator.dataset.firstValue)
      this.setState({ clearState: "CE" });

      /*Uses the existance or not of the "data-action" attribute on a button element */
      if (!action) {
        processNumberKey(display, key, calculator);
      } else {
        this.processFunctionKey(action, display, key, calculator);
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Digits
            digits={this.state.digits}
            clearState={this.state.clearState}
          />
        </div>
      </div>
    );
  }
}

export default App;
