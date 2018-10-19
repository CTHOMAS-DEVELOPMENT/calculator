import React, { Component } from "react";
import "./../App.css";
class Digits extends Component {
  render() {
    const { digits, clearState } = this.props;
    return (
      <div className="calculator">
        <div className="calculator__display">0</div>

        <div className="calculator__keys">
          <button className="key--operator" data-action="add">
            +
          </button>
          <button className="key--operator" data-action="subtract">
            -
          </button>
          <button className="key--operator" data-action="multiply">
            &times;
          </button>
          <button className="key--operator" data-action="divide">
            ÷
          </button>

          {digits.map(digit => (
            <button key={digit.id}>{digit.value}</button>
          ))}
          <button data-action="decimal">.</button>
          <button data-action="clear">{clearState}</button>
          <button className="key--equal" data-action="calculate">
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Digits;
