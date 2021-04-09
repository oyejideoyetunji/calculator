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

    equationScreen.textContent = `${delimitNumber(operands.currentOperand)}`;
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
    const result = compute(currentOperator, operands);
    operands.currentOperand =
      operator === "%" ? compute(operator, { initialOperand: result }) : "";
    operands.initialOperand = operator === "%" ? "" : result;
    currentOperator = operator === "%" ? "" : operator;
  }

  resultScreen.textContent = `${delimitNumber(
    operands.initialOperand
  )} ${currentOperator}`;
  equationScreen.textContent = `${delimitNumber(operands.currentOperand)}`;
}

function deleteCharacter() {
  operands.currentOperand =
    !operands.currentOperand || operands.currentOperand === "Infinity"
      ? ""
      : operands.currentOperand.slice(0, operands.currentOperand.length - 1);

  equationScreen.textContent = `${delimitNumber(operands.currentOperand)}`;
}

function clearAll(event) {
  operands.initialOperand = "";
  operands.currentOperand = "";
  currentOperator = "";
  equationScreen.textContent = "";
  resultScreen.textContent = "";
}

function computeAndWriteResult() {
  if (operands.currentOperand && operands.initialOperand && currentOperator) {
    operands.currentOperand = compute(currentOperator, operands);
    operands.initialOperand = "";
    currentOperator = "";

    resultScreen.textContent = `${delimitNumber(operands.currentOperand)}`;
    equationScreen.textContent = operands.currentOperand.startsWith("-")
      ? `${delimitNumber(operands.currentOperand.slice(1))}-`
      : `${delimitNumber(operands.currentOperand)}`;
  }
}

function compute(currentOperator, { initialOperand, currentOperand }) {
  const initialOperandVal = parseFloat(initialOperand);
  const currentOperandVal = parseFloat(currentOperand);

  const eqnString = `${currentOperator}${initialOperand}${currentOperand}`;

  const result =
    eqnString.includes("*") &&
    eqnString.includes("Infinity") &&
    eqnString.includes("0") // NaN
      ? 0
      : operatorFunctions[currentOperator](
          initialOperandVal,
          currentOperandVal
        );
  return `${result}`;
}

function delimitNumber(number) {
  return `${number}` === "Infinity" || `${number}`.length < 4
    ? `${number}`
    : `${number}`
        .split(".")
        .map((num, idx) => {
          return idx === 0
            ? [...num]
                .reverse()
                .map((el, idx) => {
                  return idx % 3 === 0 && idx !== 0 && el !== "-"
                    ? `${el},`
                    : el;
                })
                .reverse()
                .join("")
            : num;
        })
        .join(".");
}
