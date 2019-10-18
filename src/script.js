const container = document.querySelector('.container');
const displayText = document.querySelector('.displayText')
initButtons();
const btnsOp = document.querySelectorAll('.operator')
const buttons = document.querySelector('.btnContainer')
var operatorLast = false;
var operator = "";
var operand1 = 0;

buttons.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target
    if (key.classList.contains('operator')) {
      operate(key);
    } else if (key.classList.contains('bdecimal')) {
      decimal();
    } else if (key.classList.contains('bC')) {
      clear();
    } else if (key.classList.contains('bequals')) {
      equals();
    } else {
      number(key);
    }
  }
});

function number(key) {
  if (operator == "=") {
    operand1 = 0;
    displayText.innerHTML = key.innerHTML;
    operatorLast = false;
    operator = ""
  } else if (displayText.innerHTML == '0' || operatorLast == true) {
    displayText.innerHTML = key.innerHTML
    operatorLast = false;
  } else {
    displayText.innerHTML += key.innerHTML;
    operatorLast = false;
  }
}

function operate(key) {
  if (!operatorLast && operand1 !== 0) {
    operand1 = solveEquation(operand1, operator, parseFloat(displayText.innerHTML));
    displayText.innerHTML = operand1;
    operator = "";
    operatorLast = false;
  } else if (operator == "=") {
    operator = key.innerHTML

  }
  operatorLast = true;
  operator = key.innerHTML
  operand1 = parseFloat(displayText.innerHTML);
}

function clear(key) {
  displayText.innerHTML = "0";
  operatorLast = false;
  operand1 = 0;
  operator = ""
}

function equals() {
  operand1 = solveEquation(operand1, operator, parseFloat(displayText.innerHTML))
  displayText.innerHTML = operand1;
  operator = "=";
  operatorLast = true;
}

function decimal() {
  if(operatorLast) {
    displayText.innerHTML = "0."
    operatorLast = false;
  } else {
    if (!displayText.innerHTML.includes('.')) displayText.innerHTML += '.';
    operatorLast = false;
  }

}

function solveEquation(num1, op, num2) {
  var answer;
  switch (op) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break
    case '/':
      answer = num1 / num2;
  }
  if(answer>9999999) {
    return answer.toExponential(2);
  } else {
    if(answer % 1 !== 0) {
      return answer.toFixed(4);
    } else {
      return answer;
    }
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
