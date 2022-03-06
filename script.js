class Calculator{
    constructor(previousText, currentText){
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
          this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
            break
            case '-':
                computation = prev - current
            break
            case '*':
                computation = prev * current
            break
            case '÷':
                computation = prev / current
            break
            default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } 
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } 
        else {
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentText.innerText =
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousText.innerText =
          ` ${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } 
        else {
            this.previousText.innerText = ''
        }
    }
}


const numberButton= document.querySelectorAll(".number")
const operationButton= document.querySelectorAll(".operator")
const equalButton= document.querySelector(".equal")
const allClearButton= document.querySelector(".all-clear")
const previousText= document.querySelector(".previous-operand")
const currentText= document.querySelector(".current-operand")
const deleteButton = document.querySelector('.delete')

const calculator = new Calculator(previousText, currentText)
numberButton.forEach(button=>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button=>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})