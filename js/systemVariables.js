const controlButtons = {
  clearAllBtn,
  deleteBtn,
  equalsBtn,
};

const operands = {
  initialOperand: "",
  currentOperand: "",
};

let currentOperator = "";

const operatorFunctions = {
  "%": (operand) => operand / 100,
  "+": (initialOperand, currentOperand) => initialOperand + currentOperand,
  "-": (initialOperand, currentOperand) => initialOperand - currentOperand,
  "/": (initialOperand, currentOperand) => initialOperand / currentOperand,
  "*": (initialOperand, currentOperand) => initialOperand * currentOperand,
  "^": (initialOperand, currentOperand) =>
    Math.pow(initialOperand, currentOperand),
};
