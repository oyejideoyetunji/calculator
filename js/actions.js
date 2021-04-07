function writeOperand(event) {
  const digitValue = event.target.innerText;

  if (
    !(digitValue === "." && operands.currentOperand.includes(".")) &&
    !(
      operands.currentOperand.startsWith("0") &&
      digitValue === "0" &&
      operands.currentOperand.length === 1
    )
  ) {
    operands.currentOperand =
      operands.currentOperand === "Infinity"
        ? digitValue
        : operands.currentOperand + digitValue;

    equationScreen.textContent = `${operands.currentOperand}`;
  }
}

function writeOperatorAndCompute(event) {
  const operator = event.target.innerText;

  if (operands.currentOperand && !operands.initialOperand) {
    operands.initialOperand = operator === "%" ? "" : operands.currentOperand;
    operands.currentOperand =
      operator === "%"
        ? compute(operator, { initialOperand: operands.currentOperand })
        : "";
    currentOperator = operator === "%" ? "" : operator;
  } else if (operands.initialOperand && !operands.currentOperand) {
    operands.currentOperand =
      operator === "%"
        ? compute(operator, { initialOperand: operands.initialOperand })
        : operands.currentOperand;
    operands.initialOperand = operator === "%" ? "" : operands.initialOperand;
    currentOperator = operator === "%" ? "" : operator;
  } else if (operands.initialOperand && operands.currentOperand) {
    if (
      operands.initialOperand === "Infinity" ||
      compute(currentOperator, operands) === "Infinity"
    ) {
      operands.initialOperand = operator === "%" ? "" : "Infinity";
      operands.currentOperand = operator === "%" ? "Infinity" : "";
      currentOperator = operator === "%" ? "" : operator;
    } else {
      const result = compute(currentOperator, operands);
      operands.currentOperand =
        operator === "%" ? compute(operator, { initialOperand: result }) : "";
      operands.initialOperand = operator === "%" ? "" : result;
      currentOperator = operator === "%" ? "" : operator;
    }
  }

  resultScreen.textContent = `${operands.initialOperand} ${currentOperator}`;
  equationScreen.textContent = `${operands.currentOperand}`;
}

function deleteCharacter() {
  operands.currentOperand =
    !operands.currentOperand || operands.currentOperand === "Infinity"
      ? ""
      : operands.currentOperand.slice(0, operands.currentOperand.length - 1);

  equationScreen.textContent = `${operands.currentOperand}`;
}

function clearAll(event) {
  operands.initialOperand = "";
  operands.currentOperand = "";
  currentOperator = "";
  equationScreen.textContent = "";
  resultScreen.textContent = "";
}

function computeAndWriteResult() {
  if (operands.currentOperand && operands.initialOperand) {
    operands.currentOperand = compute(currentOperator, operands);
    operands.initialOperand = "";
    currentOperator = "";

    resultScreen.textContent = `${operands.currentOperand}`;
    equationScreen.textContent = `${operands.currentOperand}`;
  }
}

function compute(currentOperator, { initialOperand, currentOperand }) {
  const initialOperandVal = parseFloat(initialOperand);
  const currentOperandVal = parseFloat(currentOperand);

  const result = operatorFunctions[currentOperator](
    initialOperandVal,
    currentOperandVal
  );
  return `${result}`;
}
