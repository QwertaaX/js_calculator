let curText = "0";
let curFirstNumber = 0;
let curOperation = "";
let curSecondNumber = 0;

function buttonListener(func) {
    if ("0123456789".includes(func)) {
        if (resultField.innerHTML.length == 12) return;
        if (curOperation == "") {
            if (curText == "0") {
                curText = func;
            } else {
                curText += func;
            }
            curFirstNumber = Number.parseFloat(curText);
        }
        else {
            if (curSecondNumber == 0 && !curText.endsWith(".")) {
                curText = func;
            } else {
                curText += func;
            }
            curSecondNumber = Number.parseFloat(curText);
        }
        resultField.innerHTML = curText;
    }
    if (func == "/" || func == "*" || func == "+" || func == "-") {
        if (curOperation == "") {
            curOperation = func;
            curText = "0";
            resultField.innerHTML = curText;
        }
    }
    else if (func == ".") {
        if (!curText.includes(".")) {
            curText += ".";
            resultField.innerHTML = curText;
        }
    }
    else if (func == "=") {
        switch (curOperation) {
            case "/":
                if (curSecondNumber == 0) {
                    curText = "0";
                    curFirstNumber = 0;
                    curOperation = "";
                    curSecondNumber = 0;
                    resultField.innerHTML = "Undefined";
                    return;
                }
                curText = curFirstNumber / curSecondNumber;
                break;
            case "*":
                curText = curFirstNumber * curSecondNumber;
                break;
            case "+":
                curText = curFirstNumber + curSecondNumber;
                break;
            case "-":
                curText = curFirstNumber - curSecondNumber;
                break;
        }
        
        curText = Number(Number.parseFloat(curText).toPrecision(10));
        curFirstNumber = Number.parseFloat(curText);
        curOperation = "";
        curSecondNumber = 0;
        resultField.innerHTML = curText;
    }
    else if (func == "+/-") {
        if (curOperation == "") {
            curFirstNumber *= -1;
            if (curFirstNumber == -0) curFirstNumber = 0;
            curText = curFirstNumber;
            resultField.innerHTML = curText;
        }
        else {
            curSecondNumber *= -1;
            if (curSecondNumber == -0) curSecondNumber = 0;
            curText = curSecondNumber;
            resultField.innerHTML = curText;
        }
    }
    else if (func == "C") {
        curText = "0";
        curOperation = "";
        curFirstNumber = 0;
        curSecondNumber = 0;
        resultField.innerHTML = curText;
    }
    else if (func == "%") {
        if (curOperation == "/" || curOperation == "*") {
            curSecondNumber /= 100;
            curText = curSecondNumber;
        }
        else if (curOperation == "+" || curOperation == "-") {
            curSecondNumber = (curSecondNumber / 100) * curFirstNumber;
            curText = curSecondNumber;
        }
        else {
            curFirstNumber = 0;
            curText = curFirstNumber;
        }
        resultField.innerHTML = curText;
    }
    else if (func == "Del") {
        curText = String(curText);
        if (!curText.startsWith("-") && curText.length > 1 || (curText.length > 2)) {
            curText = curText.substring(0, curText.length - 1);
        }
        else {
            curText = "0";
        }
        resultField.innerHTML = curText;

        if (curOperation == "") {
            curFirstNumber = Number.parseFloat(curText);
        }
        else {
            curSecondNumber = Number.parseFloat(curText);
        }
    }
}


let buttonsPanel = document.getElementById("calc_buttons");
let resultField = document.getElementById("result_field");
let buttonNames = ["C", "Del", "%", "/", "7", "8", "9", "*", "4", "5", "6", "+", "1", "2", "3", "-", "+/-", "0", ".", "="];

for (let buttonName of buttonNames) {
    let button = document.createElement("button");
    button.innerHTML = buttonName;
    button.addEventListener("click", function() {
        buttonListener(button.innerHTML);
    })
    buttonsPanel.appendChild(button);
}

window.addEventListener("keydown", function(k) {
    let key = k.key;
    if ("0123456789/*+-.=%".includes(key)) {
        buttonListener(key);
    }
    else if (key == "c" || key == "C") {
        buttonListener("C");
    }
    else if (key == "Delete" || key == "Backspace") {
        buttonListener("Del");
    }
    else if (key == "Enter") {
        buttonListener("=");
    }
});
