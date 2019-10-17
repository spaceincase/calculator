const container = document.querySelector('.container');
initButtons();


function add(a,b) {
  return a+b;
}

function subtract(a,b) {
  return a-b;
}

function divide(a,b) {
  return a/b;
}

function multiply(a,b) {
  return a*b;
}

function operate(operator,a,b) {
  switch(operator) {
    case '+':
      return add(a,b);
      break;
    case '-':
      return subtract(a,b);
      break;
    case '/':
      return divide(a,b);
      break;
    case '*':
      return multiply(a,b);
  }
}

function initButtons() {
  const btnContainer = document.querySelector('.btnContainer');
  const btnLabels = ['C', '/', '*', '-', '+', '=', '.', 7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const btnClasses = ['C', 'divide', 'multiply', 'subtract','add','equals','decimal', 7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  for(i=0;i<17;i++) {
    var btn = document.createElement("BUTTON");
    if(i<btnLabels.length) {
      btn.className = `b${btnClasses[i]}`;
      btn.innerHTML = btnLabels[i];
    }
    btnContainer.appendChild(btn);
  }
}
