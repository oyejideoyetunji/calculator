// Initialize event listeners

for (const digitButton in digitButtons){
    digitButtons[digitButton].addEventListener("click", writeOperand);
}
for (const operatorButton in operatorButtons){
    operatorButtons[operatorButton].addEventListener('click', writeOperator);
}

deleteBtn.addEventListener('click', deleteCharacter);
clearAllBtn.addEventListener('click', clearAll);