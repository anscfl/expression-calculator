function eval() {
  // Do not use eval!!!
  return;
}
const methods = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) throw new Error("TypeError: Division by zero.");
    return a / b;
  }
};
function calculate(a, op, b) {
  return methods[op](a, b);
}

function calculateWithRange(str) {
  if (str.includes("(")) {
    str = str.slice(1, -1);
  }

  let calcArr = str.split(" ");
  for (i = 0; i < calcArr.length; i++) {
    if (calcArr[i] === "*" || calcArr[i] === "/") {
      let result = calculate(+calcArr[i - 1], calcArr[i], +calcArr[i + 1]);
      calcArr.splice(i - 1, 3, result);
      i = 0;
    }
  }

  for (i = 0; i < calcArr.length; i++) {
    if (calcArr[i] === "+" || calcArr[i] === "-") {
      let result = calculate(+calcArr[i - 1], calcArr[i], +calcArr[i + 1]);
      calcArr.splice(i - 1, 3, result);
      i = 0;
    }
  }
  return calcArr[0]
}

function checkBrackets(str) {
  let countOpen = str.split('').filter(el => el === '(').length;
  let countClose = str.split('').filter(el => el === ')').length;
  if (countOpen !== countClose) throw new Error("ExpressionError: Brackets must be paired");
}

function expressionCalculator(expr) {
  checkBrackets(expr);
  expr = expr.split("").filter(el => el !== " ").join("");
  let reg = /[-+*/]/g;
  expr = expr.replace(reg, " $& ");
  let exp = /\([^()]*\)/; // RegExp for expression in brackets
  while (expr.includes("(")) {
    expr = expr.replace(exp, calculateWithRange);
  }
  expr = calculateWithRange(expr);
  return +expr;
}

module.exports = {
  expressionCalculator
}