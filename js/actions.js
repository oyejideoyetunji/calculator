function writeOperand(event) {
  const digitValue = event.target.innerText;

  if (
    (digitValue === "." && operands.currentOperand.includes(".")) ||
    (digitValue === "0" &&
      operands.currentOperand.startsWith("0") &&
      operands.currentOperand.length === 1) ||
    (operands.initialOperand && !currentOperator)
  ) {
    return;
  } else {
    operands.currentOperand += digitValue;
  }

  equationScreen.textContent = `${currentOperator} ${operands.currentOperand}`;
}

function writeOperatorAndCompute(event) {
  const operator = event.target.innerText;

  if(operands.initialOperand && !operands.currentOperand){
    if(operator === "%"){
        operands.initialOperand = compute(operator, {initialOperand: operands.initialOperand});
        operands.currentOperand = "";
        currentOperator = "";
    }else{
        currentOperator = operator;
    }
  }
  else if(operands.currentOperand && !operands.initialOperand){
    if(operator === "%"){
        operands.initialOperand = compute(operator, {
          initialOperand: operands.currentOperand,
        });
        operands.currentOperand = "";
        currentOperator = "";
    }else{
        operands.initialOperand = operands.currentOperand;
        operands.currentOperand = "";
        currentOperator = operator;
    }
  }
  else if(operands.initialOperand && operands.currentOperand){
    operands.initialOperand = compute(currentOperator, operands);

    if(operator === "%"){
        operands.initialOperand = compute(operator, {initialOperand: operands.initialOperand})
        operands.currentOperand = "";
        currentOperator = "";
    }else{
        operands.currentOperand = "";
        currentOperator = operator;
    }
  }

  resultScreen.textContent = operands.initialOperand;
  equationScreen.textContent = `${currentOperator} ${operands.currentOperand}`;
}

function deleteCharacter() {
  if(!operands.currentOperand && !currentOperator) return;

  if(!operands.currentOperand){
    currentOperator = "";
  }
  else{
    operands.currentOperand = operands.currentOperand.slice(
      0,
      operands.currentOperand.length - 1
    );
  }

  equationScreen.textContent = `${currentOperator} ${operands.currentOperand}`;
}

function clearAll() {
  operands.initialOperand = "";
  operands.currentOperand = "";
  currentOperator = "";
  equationScreen.textContent = "";
  resultScreen.textContent = "";
}

function computeAndWriteResult(){
    if(!operands.currentOperand) return;

    if (operands.currentOperand && !operands.initialOperand) {
      operands.initialOperand = operands.currentOperand;
      operands.currentOperand = "";
      currentOperator = "";
    } else if (operands.initialOperand && operands.currentOperand) {
      operands.initialOperand = compute(currentOperator, operands);
      operands.currentOperand = "";
      currentOperator = "";
    }

    resultScreen.textContent = operands.initialOperand;
    equationScreen.textContent = `${currentOperator} ${operands.currentOperand}`;
}

function compute(currentOperator, { initialOperand, currentOperand }) {
    const initialOperandVal = parseFloat(initialOperand);
    const currentOperandVal = parseFloat(currentOperand);

    const result = operators[currentOperator](initialOperandVal, currentOperandVal);
    return `${result}`;
}
