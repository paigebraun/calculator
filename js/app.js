function add(a,b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a/b
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    if (operator == 43) {
       return add(a,b)
    }
    if (operator == 8722) {
        return subtract(a,b)
    }
    if (operator == 215) {
        return multiply(a, b)
    }
    if (operator == 247) {
        return divide(a, b)
    }
}

//set baseline for all possible user inputs into calculator
let firstNumber = "";
let firstNumberDecided = false;
let secondNumber = "";
let getSecondNumber = false;
let operator = "";
let operatorClicked = false;
let equalsClicked = false;
let calcAnswer = 0;
let periodClicked1 = 0;
let periodClicked2 = 0;

const calcKey = document.querySelectorAll('.key');
const output = document.querySelector('.output-content');

const buttonMisc = document.querySelectorAll('.key.misc');
const buttonNumber = document.querySelectorAll('.key.number');
const buttonSymbol = document.querySelectorAll('.key.symbol');

//add event listeners to top layer buttons so we can later change blend modes
for (let j = 0; j < buttonNumber.length; j++) {
    buttonNumber[j].addEventListener('click', buttonColor);
}

for (let k = 0; k < buttonMisc.length; k++) {
    buttonMisc[k].addEventListener('click', buttonColor);
}

for (let l = 0; l < buttonSymbol.length; l++) {
    buttonSymbol[l].addEventListener('click', buttonColor);
}

function buttonColor() {
    this.style.mixBlendMode = 'multiply';
    setTimeout(revertColor, 150, this);
}

function revertColor(a) {
    a.style.mixBlendMode = 'normal';
}

//update what is displayed on the calculator
function updateDisplay(num) {
    output.textContent = num;
}

//reset baseline calc values 
function resetValue(){
    secondNumber = '';
    getSecondNumber = false;
    operator = '';
    operatorClicked = false;
    equalsClicked = false;
    periodClicked1 = 0;
    periodClicked2 = 0;
    addEvent();
}

function clear() {
    firstNumber = "";
    firstNumberDecided = false;
    secondNumber = "";
    getSecondNumber = false;
    operator = "";
    operatorClicked = false;
    equalsClicked = false;
    calcAnswer = 0;
    periodClicked1 = 0;
    periodClicked2 = 0;
    updateDisplay(0);
    addEvent();
}

//add event listeners to all calc buttons to monitor key input values
function addEvent() {
    for (let i = 0; i < calcKey.length; i++) {
        calcKey[i].addEventListener('click', handler);
    }
}

function handler(){
    //clear inputs and reset values if 'C' button clicked
    if (this.className == "key misc clear"){
        clear();
    }
    //capture user input of first number
    if (((this.className == "key number") || (this.className == "key number period")) && (firstNumberDecided == false)) {
        if ((this.className == "key number period")) {
            periodClicked1 += 1;
        }
        if ((this.className == "key number period") && (periodClicked1 > 1)){
            return;
        }else{
            firstNumber = "" + firstNumber + this.textContent;
            updateDisplay(firstNumber);
        }
    }
    //delete key pressed during first number input
    if ((this.className == "key misc del") && (firstNumberDecided == false)){
        firstNumber = String(firstNumber);
        if (firstNumber.length == 1){
            firstNumber = "";
            updateDisplay(0);
        } else {
            if (firstNumber.slice(-1) == "."){
                periodClicked1 -= 1;
            }
            firstNumber = firstNumber.slice(0, -1);
            updateDisplay(firstNumber);
        }
    }
    //capture user input of operator
    if ((this.className == "key symbol") && (operatorClicked == false)) {
        firstNumberDecided = true;
        operator = this.textContent.charCodeAt();
        operatorClicked = true;
        getSecondNumber = true;
    }
    //special case operator used as equals click
    if ((((this.className == "key symbol") && (operatorClicked == true) && (firstNumberDecided == true) && (secondNumber !== "")))){
        console.log(secondNumber);
        calcAnswer = operate(operator, firstNumber, secondNumber);
        updateDisplay(calcAnswer);
        firstNumber = calcAnswer;
        secondNumber = '';
        getSecondNumber = true;
        operator = this.textContent.charCodeAt();
        operatorClicked = true;
        equalsClicked = false;
    }
    //delete key pressed during second number input
    if (((this.className == "key misc del") && (equalsClicked == false) && (getSecondNumber == true))){
        secondNumber = String(secondNumber);
        if (secondNumber.length == 1){
            secondNumber = "";
            updateDisplay(0);
        } else {
            if (secondNumber.slice(-1) == "."){
                periodClicked2 -= 1;
            }
            secondNumber = secondNumber.slice(0, -1);
            updateDisplay(secondNumber);
        }
    }
    //capture user input of second number
    if (((this.className == "key number") || (this.className == "key number period")) && (equalsClicked == false) && (getSecondNumber == true)) {
        if ((this.className == "key number period")) {
            periodClicked2 += 1;
        }
        if ((this.className == "key number period") && (periodClicked2 > 1)){
            return;
        }else{
            secondNumber = "" + secondNumber + this.textContent;
            updateDisplay(secondNumber);
        }
    }
    //capture user input of equals sign and reset values after calculation made
    if (this.className == "key symbol equals") {
        equalsClicked = true;
        calcAnswer = operate(operator, firstNumber, secondNumber);
        updateDisplay(calcAnswer);
        firstNumber = calcAnswer;
        resetValue();

    }
};

addEvent();