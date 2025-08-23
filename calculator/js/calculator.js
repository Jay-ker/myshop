    class Calculator {
      constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
      }
      clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
      }
      delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
      }
      appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
      }
      chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
          this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
      }
      compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
          case '+': computation = prev + current; break;
          case '-': computation = prev - current; break;
          case '×': computation = prev * current; break;
          case '÷':
            if (current === 0) {
              alert('Cannot divide by zero!');
              return;
            }
            computation = prev / current;
            break;
          default: return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
      }
      getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
      }
      updateDisplay() {
        if (this.currentOperand === '') {
          this.currentOperandElement.innerText = '0';
        } else {
          this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        }
        if (this.operation != null) {
          this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
          this.previousOperandElement.innerText = '';
        }
      }
    }
    const previousOperandElement = document.getElementById('previousOperand');
    const currentOperandElement = document.getElementById('currentOperand');
    const calc = new Calculator(previousOperandElement, currentOperandElement);

    // Keyboard support
    document.addEventListener('keydown', function(event) {
      if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        calc.appendNumber(event.key);
      }
      if (event.key === '+' || event.key === '-') {
        calc.chooseOperation(event.key);
      }
      if (event.key === '*') {
        calc.chooseOperation('×');
      }
      if (event.key === '/') {
        event.preventDefault();
        calc.chooseOperation('÷');
      }
      if (event.key === 'Enter' || event.key === '=') {
        calc.compute();
      }
      if (event.key === 'Escape') {
        calc.clear();
      }
      if (event.key === 'Backspace') {
        calc.delete();
      }
    });
 