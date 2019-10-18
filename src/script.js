const container = document.querySelector('.container');
const displayText = document.querySelector('.displayText')
initButtons();

const buttons = document.querySelector('.btnContainer')
var operatorLast = false;
var operator = "";
var operand1 = 0;

buttons.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target
    if (key.classList.contains('operator')) {
        if(!operatorLast && operand1 !== 0) {
          operand1 = solveEquation(operand1, operator, parseFloat(displayText.innerHTML))
          displayText.innerHTML = operand1;
          operator = "";
          operatorLast = false;
        } else if(operator == "=") {
          operator = key.innerHTML

        }
        operatorLast = true;
        operator = key.innerHTML
        operand1 = parseFloat(displayText.innerHTML);

    } else if (key.classList.contains('bdecimal')) {

        if (!displayText.innerHTML.includes('.')) displayText.innerHTML += '.';

    } else if (key.classList.contains('bC')) {

        displayText.innerHTML = "0";
        operatorLast = false;
        operand1 = 0;
        operator = ""

    } else if (key.classList.contains('bequals')) {

        operand1 = solveEquation(operand1, operator, parseFloat(displayText.innerHTML))
        displayText.innerHTML = operand1;
        operator = "=";
        operatorLast = true;

    } else {

        if (displayText.innerHTML == '0' || operatorLast == true) {
          displayText.innerHTML = key.innerHTML
          operatorLast = false;
        } else if (operator == "=") {
          operand1 = 0;
          displayText.innerHTML += key.innerHTML;
        } else {
          displayText.innerHTML += key.innerHTML;
        }
    }
  }
});

function solveEquation(num1, op, num2) {
  switch (op) {
    case '+':
      return num1 + num2;
      break;
    case '-':
      return num1 - num2;
      break;
    case '*':
      return num1 * num2;
      break
    case '/':
      return num1 / num2;
  }
}


function initButtons() {
  const btnContainer = document.querySelector('.btnContainer');
  const btnLabels = ['C', '/', '*', '-', '+', '=', '.', 7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const btnClasses = ['C', 'divide', 'multiply', 'subtract', 'add', 'equals', 'decimal', 7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  for (i = 0; i < 17; i++) {
    var btn = document.createElement("BUTTON");
    if (i < btnLabels.length) {
      btn.className = `b${btnClasses[i]}`;
      btn.innerHTML = btnLabels[i];
      if (typeof btnLabels[i] == "number") btn.className += " number";
      if (btn.innerHTML !== "C" && btn.innerHTML !== "." && btn.innerHTML !== "=" && isNaN(btn.innerHTML)) btn.className += " operator";
    }
    btnContainer.appendChild(btn);
  }
}
