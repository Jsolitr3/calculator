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
divideBtn.addEventListener('click', () => divide());
const multiplyBtn = document.getElementById('multiply');
multiplyBtn.addEventListener('click', () => multiply());
const subtractBtn = document.getElementById('subtract');
subtractBtn.addEventListener('click', () => subtract());
const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => add());
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
    if (!screen.innerText==""){
        if (number1 == false) {
            operation.textContent ="+";
            var1 = parseFloat(screen.innerText);
            number1 = true;
            if (equation == true) {
                equation = false;
            }
        } else if ((number2 == true) && (equation == true)) {
            var2 = parseFloat(screen.innerText);
            displayResult(var1 + var2);
            var1 = parseFloat(screen.innerText);
            operation.textContent ="";
            number1 = false;
            number2 = false;
        } else if ((number2 == true) && (equation == false)) {
            var2 = parseFloat(screen.innerText);
            displayResult(var1 + var2);
            var1 = parseFloat(screen.innerText);
            operation.textContent ="+";
            number1 = true;
            number2 = false;
        };
    };
};

function subtract(){
    if (!screen.innerText==""){
        if (number1 == false) {
            operation.textContent ="-";
            var1 = parseFloat(screen.innerText);
            number1 = true;
            if (equation == true) {
                equation = false;
            }
        } else if ((number2 == true) && (equation == true)) {
            var2 = parseFloat(screen.innerText);
            displayResult(var1 - var2);
            var1 = parseFloat(screen.innerText);
            operation.textContent ="";
            number1 = false;
            number2 = false;
        } else if ((number2 == true) && (equation == false)) {
            var2 = parseFloat(screen.innerText);
            displayResult(var1 - var2);
            var1 = parseFloat(screen.innerText);
            operation.textContent ="-";
            number1 = true;
            number2 = false;
        };
    };
    
};

function divide(){
    if (!screen.innerText==""){
        if (number1 == false) {
            operation.textContent ="÷";
            var1 = parseFloat(screen.innerText);
            number1 = true;
            if (equation == true) {
                equation = false;
            }
        } else if ((number2 == true) && (equation == true)) {
            var2 = parseFloat(screen.innerText);
            if (var2 == 0){
                displayResult('!');
            } else displayResult(var1 / var2);
            
            var1 = parseFloat(screen.innerText);
            operation.textContent ="";
            number1 = false;
            number2 = false;
        } else if ((number2 == true) && (equation == false)) {
            var2 = parseFloat(screen.innerText);
            displayResult(var1 / var2);
            var1 = parseFloat(screen.innerText);
            operation.textContent ="÷";
            number1 = true;
            number2 = false;
        };
    };
    
};

function multiply(){
    if (!screen.innerText==""){
        if (number1 == false) {
            operation.textContent ="x";
            var1 = parseFloat(screen.innerText);
            number1 = true;
            if (equation == true) {
                equation = false;
            }
        } else if ((number2 == true) && (equation == true)) {
            var2 = parseFloat(screen.innerText);
            displayResult(var1 * var2);
            var1 = parseFloat(screen.innerText);
            operation.textContent ="";
            number1 = false;
            number2 = false;
        } else if ((number2 == true) && (equation == false)) {
            var2 = parseFloat(screen.innerText);
            displayResult(var1 * var2);
            var1 = parseFloat(screen.innerText);
            operation.textContent ="x";
            number1 = true;
            number2 = false;
        };
    };
    
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
    equation = true;
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
};

function removeLastNum(){
    if (!(equation = true)){
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