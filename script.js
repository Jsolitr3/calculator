const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => enterNumber(btn.textContent));
    btn.accessKey = btn.innerText;
});
const screen = document.getElementById('screen');
const operation = document.getElementById('operation');
const equalsBtn = document.getElementById('equals');
document.getElementById('main').addEventListener('keydown', logkey);
equalsBtn.addEventListener('click', () => equals());
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => clear());
const signBtn = document.getElementById('sign');
signBtn.addEventListener('click', () => changeSign());
const divideBtn = document.getElementById('divide');
divideBtn.addEventListener('click', () => solve(divideBtn.innerText));
const multiplyBtn = document.getElementById('multiply');
multiplyBtn.addEventListener('click', () => solve(multiplyBtn.innerText));
const subtractBtn = document.getElementById('subtract');
subtractBtn.addEventListener('click', () => solve(subtractBtn.innerText));
const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => solve(addBtn.innerText));
const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', () => removeLastNum());
let var1 = "";
let var2 = "";
let number1 = false;
let number2 = false;
let equation = false;

function logkey(e){
    // document.getElementsByClassName('e.key')[0].activate;
    switch (e.key){
        case '/':
            divide();
            break;
        case '*':
            multiply();
            break;
        case '-':
            subtract();
            break;
        case '+':
            add();
            break;
        case 'Enter':
            equals();
            break;
        case 'Backspace':
            removeLastNum();
            break;
        case 'Delete':
            clear();
            break;
        default:
            enterNumber(e.key);
    };
};
function add(){
    displayResult(var1 + var2);
};

function subtract(){
    displayResult(var1 - var2);
};

function divide(){
    displayResult(var1 / var2);
};

function multiply(){
    displayResult(var1 * var2);
};

function clear(){
    screen.innerText = "";
    operation.textContent ="";
    var1 = "";
    var2 = "";
    number1 = false;
    number2 = false;
    equation = false;
};

function changeSign(){
    if (!screen.innerText == ""){
        let x = parseFloat(screen.innerText);
        screen.innerText = -1 * x;
    };
};

function equals(){
    if (number2 == true){
        equation = true;
        solve();
    }
};
function setOperator(operator){
    switch (operator){
        case '÷':
            operation.innerText = "÷";
            break;
        case '/':
            operation.innerText = "÷";
            break;
        case 'X':
            operation.innerText = "x";
            break;
        case '-':
            operation.innerText = "-";
            break;
        case '+':
            operation.innerText = "+";
            break;
        default:
            operation.innerText = "";
    };
}
function solve(operator){
    if (!screen.innerText==""){
        if (number1 == false) {
            var1 = parseFloat(screen.innerText);
            number1 = true;
            if (equation == true) {
                equation = false;
            }
            setOperator(operator);
        } else if (number2 == true) {
            var2 = parseFloat(screen.innerText);
            switch (operation.innerText){
                case '÷':
                    divide();
                    break;
                case 'x':
                    multiply();
                    break;
                case '-':
                    subtract();
                    break;
                case '+':
                    add();
                    break;
            };
            number2 = false;
            if (equation == false){
                var1 = parseFloat(screen.innerText);
                number1 = true;
                setOperator(operator);
            } else {
                operation.innerText ="";
                number1 = false;
            };
        };
    };
};

function removeLastNum(){
    if (equation == false){
        screen.innerText = screen.innerText.slice(0,-1);
    };
};

function enterNumber(x){
    if (screen.innerText.length <= 15){
        if (equation == true) {
            equation = false;
            screen.innerText = "";
        }
        if (!(x == '.')){
            x = parseInt(x);
            if (!isNaN(x)){
                if ((screen.innerText == var1) && (number1 == true) && (number2 == false)){
                    screen.innerText = "";
                    number2 = true;
                } 
                screen.innerText = screen.innerText + x;
            };
        } else {
            if (!screen.innerText.includes('.')){
                if ((screen.innerText == var1) && (number1 == true) && (number2 == false)){
                    screen.innerText = "";
                    number2 = true;
                } 
                if (screen.innerText.length == 0){
                    screen.innerText = '0' + x;
                }else screen.innerText = screen.innerText + x;
            };
        };
    }; 
};
function displayResult(x){
    if (x == '!'){
        x = 'Really??';
    } else if (x >= 1000000){
        x = x.toExponential();
    } else if (screen.innerText.includes('.')) {
        x = x.tofixed(14-x.indexof('.'));
    }
    screen.innerText = x;
}