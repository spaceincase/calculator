/* Calculator for The Odin Project
- Web Dev 101 -
Bradley Peterson 2019
*/


//set consts for DOM elements.
const container = document.querySelector('.container');
const displayText = document.querySelector('.displayText')

//create calculator buttons
initButtons();

//set consts for calculator buttons.
const btnsOp = document.querySelectorAll('.operator')
const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('transitionend', e => e.target.classList.remove('active')))
const btnContainer = document.querySelector('.btnContainer')

//vars for keeping track of user input.
var operatorLast = false;
var operator = "";
var operand1 = 0;

//keyboard event listeners.
document.addEventListener('keydown', e => {
  switch (e.key) {
    case '+':
      document.querySelector(`.badd`).classList.add('active')
      operate(e.key);
      break;
    case '-':
      document.querySelector(`.bsubtract`).classList.add('active')
      operate(e.key);
      break;
    case '*':
      document.querySelector(`.bmultiply`).classList.add('active')
      operate(e.key);
      break;
    case '/':
      document.querySelector(`.bdivide`).classList.add('active')
      operate(e.key);
      break;
    case '.':
      document.querySelector(`.bdecimal`).classList.add('active')
      decimal();
      break;
    case 'Enter':
      document.querySelector(`.bequals`).classList.add('active')
      equals();
      break;
    case 'Backspace':
      document.querySelector(`.bC`).classList.add('active')
      clear();
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      document.querySelector(`.b${e.key}`).classList.add('active')
      number(e.key);
  }
});
btnContainer.addEventListener('click', e => {
  const key = e.target
  if (e.target.matches('button')) {
    if (key.classList.contains('operator')) {
      operate(key.innerHTML);
    } else if (key.classList.contains('bdecimal')) {
      decimal();
    } else if (key.classList.contains('bC')) {
      clear();
    } else if (key.classList.contains('bequals')) {
      equals();
    } else {
      number(key.innerHTML);
    }
  }
  key.classList.toggle('active');
});

function number(key) {
  if (operator == "=") {
    operand1 = 0;
    displayText.value = key;
    operatorLast = false;
    operator = ""
  } else if (displayText.value == '0' || operatorLast == true) {
    displayText.value = key;
    operatorLast = false;
  } else {
    if(displayText.value.length < 7) displayText.value += key;
    operatorLast = false;
  }
}

function operate(key) {
  if (!operatorLast && operand1 !== 0) {
    operand1 = solveEquation(operand1, operator, parseFloat(displayText.value));
    displayText.value = operand1;
    operator = "";
    operatorLast = false;
  } else if (operator == "=") {
    operatorLast = true;
    operator = key

  }
  operatorLast = true;
  operator = key
  operand1 = parseFloat(displayText.value);
}


function clear(key) {
  displayText.value = "0";
  operatorLast = false;
  operand1 = 0;
  operator = ""
}

function equals() {
  if(operator !== "" || operator !== "=") {
    operand1 = solveEquation(operand1, operator, parseFloat(displayText.value))
    displayText.value = operand1;
    operator = "=";
    operatorLast = true;
  } else {
    operator = "";
    operatorLast = false;
  }
}

function decimal() {
  if(operatorLast) {
    displayText.value = "0."
    operatorLast = false;
  } else {
    if (!displayText.value.includes('.')) displayText.value += '.';
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
      return parseFloat(answer);
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
