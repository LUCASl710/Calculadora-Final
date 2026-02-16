//seleccion de elementos

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-action='equals']");
const clearButton = document.querySelector("[data-action='clear']");

const previousOperandText = document.getElementById("previous-operand");
const currentOperandText = document.getElementById("current-operand");

//declaracion de variables claves

let currentOperand = "";
let previousOperand = "";
let operator = null;

//funcion para agregar numeros

function appendNumber(number){
    currentOperand += number
    updateDisplay();
}

function chooseOperator(op){
    if(currentOperand === "") return;

    if(previousOperand !== ""){
        calculate();
    }
    operator =op;
    previousOperand = currentOperand;
    currentOperand ="";
}

//funcion calcular

function calculate(){
    let result;
    const prev = parseFloat(previousOperand);
    const current=parseFloat(currentOperand);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operator){
        case"+":
        result = prev + current;
        break;
        case"-":
        result = prev - current;
        break;
        case "*":
        result = prev * current;
        case "/":
        if (current === 0){
            currentOperand = "error";
            operator = null;
            previousOperand = "";
            updateDisplay();
            return
        }
        result = prev/current;
        break;
        default:
        return;
    }
    currentOperand = result
    operator = null;
    previousOperand = "";
}

//Limpiar

function clear(){
    currentOperand = "";
    previousOperand = "";
    operator = null;
    updateDisplay();
}

//Actualizar display

function updateDisplay(){
    currentOperandText.innerText = currentOperand || "0"

    if(operator != null){
        previousOperandText.innerText = '${previosOperand} ${operator}';

    }else{
        previousOperandText.innerText = "";
    }
}

//con orden

numberButtons.forEach(button=>{
    button.addEventListener("click",() => {
        appendNumber(button.dataset.number);
    });
});

operatorButtons.forEach(button =>{
    button.addEventListener("click",() =>{
        chooseOperator(button.dataset.operator);
        updateDisplay();
    });
});

equalsButton.addEventListener("click", () => {
    calculate();
    updateDisplay();
});

clearButton.addEventListener("click", clear);


console.log(equalsButton)
console.log(clearButton)