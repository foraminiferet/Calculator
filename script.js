"use strict";

let firstValue = undefined;
let secondValue = undefined;
let firstOperation = undefined;
let secondOperation = undefined;
let arr = [];

const btnNum = document.querySelectorAll(".btn-number");
const equalBtn = document.querySelector(".equalBtn");
const operationsBtn = document.querySelectorAll(".btn-operation");
const btnClear = document.querySelectorAll(".btnClear");
const btnPoint = document.querySelector(".btn-point");
const screenOutput = document.querySelector(".user-input");
const result = document.querySelector(".result");
const btnClearAll = document.querySelector(".clearAll");
const btnDelete = document.querySelector(".clearLast");

// Changes the buttons color when hovered
equalBtn.addEventListener("mouseover", (e) => {
  e.target.style.backgroundColor = "#1fd655";
  e.target.style.color = "#202020";
});
equalBtn.addEventListener("mouseout", (e) => {
  e.target.style.backgroundColor = "#544c4a";
  e.target.style.color = "#dfdfdf";
});

btnPoint.addEventListener("mouseover", (e) => {
  e.target.style.backgroundColor = "#F4C29F";
  e.target.style.color = "#202020";
});
btnPoint.addEventListener("mouseout", (e) => {
  e.target.style.backgroundColor = "#544c4a";
  e.target.style.color = "#dfdfdf";
});

btnNum.forEach((e) => {
  e.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "#F4C29F";
    e.target.style.color = "#202020";
  });
  e.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = "#544c4a";
    e.target.style.color = "#dfdfdf";
  });
});
operationsBtn.forEach((e) => {
  e.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "#76eec6";
    e.target.style.color = "#202020";
  });
  e.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = "#544c4a";
    e.target.style.color = "#dfdfdf";
  });
});
btnClear.forEach((e) => {
  e.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "#f08080";
    e.target.style.color = "#202020";
  });
  e.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = "#544c4a";
    e.target.style.color = "#dfdfdf";
  });
});

// Functionality of the calculator
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function remainder(a, b) {
  return a % b;
}

function operate(a, operation, b) {
  a = Number(a);
  b = Number(b);
  switch (operation) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    case "%":
      return remainder(a, b);
      break;
    default:
      return null;
  }
}

btnNum.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (screenOutput.textContent === "0") {
      screenOutput.textContent = "";
    }
    screenOutput.textContent += e.target.textContent;
    arr.push(e.target.textContent);
    if (firstValue !== undefined) {
      secondValue = convertToNum(
        arr.slice(arr.indexOf(firstOperation) + 1, arr.length).join("")
      );
    }
  });
});

operationsBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (firstOperation === undefined) {
      firstValue = convertToNum(arr.join(""));
      firstOperation = e.target.value;
      arr.push(firstOperation);
      screenOutput.textContent += e.target.textContent;
    } else {
      secondOperation = e.target.value;
      secondValue = convertToNum(arr.join("").split(firstOperation)[1]);
      updateForSecondOperand(e);
    }
  });
});

function convertToNum(str) {
  return str.includes(".") ? parseFloat(str) : parseInt(str);
}

function updateForSecondOperand(e) {
  console.log(e.target.textContent);
  screenOutput.textContent = operate(firstValue, firstOperation, secondValue);
  screenOutput.textContent += e.target.textContent;
  firstValue = operate(firstValue, firstOperation, secondValue);
  firstOperation = secondOperation;
  secondOperation = undefined;
  arr.splice(0);
  arr.push(...String(firstValue).split(""));
  arr.push(firstOperation);
  result.textContent = "";
}

equalBtn.addEventListener("click", function () {
  result.textContent = operate(firstValue, firstOperation, secondValue);
});

btnClearAll.addEventListener("click", function () {
  firstValue = undefined;
  secondValue = undefined;
  firstOperation = undefined;
  secondOperation = undefined;
  arr.splice(0);
  screenOutput.textContent = "0";
  result.textContent = "";
});

btnDelete.addEventListener("click", function () {
  arr.pop();
  screenOutput.textContent = arr.join("");
  secondValue = convertToNum(
    arr.slice(arr.indexOf(firstOperation) + 1, arr.length).join("")
  );
});

btnPoint.addEventListener("click", function () {
  arr.push(".");
  screenOutput.textContent += ".";
});
