function writeOperand(event) {
  const digitValue = event.target.innerText;
  let currentIndex = equation.length - 1;
  let nextIndex = equation.length;

  if (!nextIndex) {
    equation[0] = digitValue;
  } else if (operators.includes(equation[currentIndex])) {
    equation[nextIndex] = digitValue;
  } else if (
    (digitValue === "." && equation[currentIndex].includes(".")) ||
    (digitValue === "0" &&
      equation[currentIndex].startsWith("0") &&
      equation[currentIndex].length === 1)
  ) {
    return;
  } else {
    equation[currentIndex] += digitValue;
  }

  equationScreen.textContent = equation.join(" ");
}

function writeOperator(event) {
  const operator = event.target.innerText;
  let currentIndex = equation.length - 1;
  let nextIndex = equation.length;
  if (
    equation.length &&
    !operators.includes(equation[currentIndex]) &&
    !equation[currentIndex].endsWith(".")
  ) {
    equation[nextIndex] = operator;
  }

  equationScreen.textContent = equation.join(" ");
}

function deleteCharacter() {
  let currentIndex = equation.length - 1;

  if (!equation.length) {
    return;
  } else if (equation[currentIndex].length < 2) {
    equation = equation.slice(0, currentIndex);
  } else {
    equation[currentIndex] = equation[currentIndex].slice(
      0,
      equation[currentIndex].length - 1
    );
  }

  equationScreen.textContent = equation.join(" ");
}

function clearAll() {
  equation = [];
  equationScreen.textContent = "";
}
