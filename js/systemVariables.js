const controlButtons = {
  clearAllBtn,
  deleteBtn,
  equalsBtn,
};

const operatorButtons = {
  addBtn,
  subtractBtn,
  divideBtn,
  multiplyBtn,
  perCentBtn,
  toPowerBtn,
};

const digitButtons = {
  dot,
  zeroBtn,
  oneBtn,
  twoBtn,
  threeBtn,
  fourBtn,
  fiveBtn,
  sixBtn,
  sevenBtn,
  eightBtn,
  nineBtn,
};

const operands = {
  initialOperand: "",
  currentOperand: "",
};

let currentOperator = "";

const operators = {
  "%": (operand) => operand / 100,
  "+": (initialOperand, currentOperand) => initialOperand + currentOperand,
  "-": (initialOperand, currentOperand) => initialOperand - currentOperand,
  "/": (initialOperand, currentOperand) => initialOperand / currentOperand,
  "*": (initialOperand, currentOperand) => initialOperand * currentOperand,
  "^": (initialOperand, currentOperand) => Math.pow(initialOperand, currentOperand),
};
