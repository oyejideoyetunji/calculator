digits.forEach((digit) => digit.addEventListener("click", writeOperand));

operators.forEach((operator) =>
  operator.addEventListener("click", writeOperatorAndCompute)
);

deleteBtn.addEventListener("click", deleteCharacter);
clearAllBtn.addEventListener("click", clearAll);
equalsBtn.addEventListener("click", computeAndWriteResult);
