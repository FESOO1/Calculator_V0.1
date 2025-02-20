// CALCULATOR SCREEN
const calculatorScreen = document.querySelector('.calculator-middle-screen');
const calculatorScreenParagraph = document.querySelector('.calculator-middle-screen-paragraph');

// CALCULATOR NUMBER BUTTONS
const calculatorButtonNumber = document.querySelectorAll('.calculator-bottom-button-number');

// CALCULATOR DELETE BUTTON
const calculatorDeleteButton = document.querySelector('.calculator-bottom-button-delete');

// CALCULATOR RESET BUTTON
const calculatorResetButton = document.querySelector('.calculator-bottom-button-reset');

// CALCULATOR CALCULATE BUTTON
const calculatorCalculateButton = document.querySelector('.calculator-bottom-button-equal');

// CALCULATOR MATH OPERATOR BUTTON
const calculatorMathOperatorButton = document.querySelectorAll('.calculator-bottom-button-math-operator');

// CALCULATOR
let calculator = {
    calculatorFirstEnteredDigits: [],
    calculatorSecondEnteredDigits: [],
    isClickedOnMathOperator: false,
    ClickedOnMathOperator: '',
};

// ENTERING DIGITS

for (let i = 0; i < calculatorButtonNumber.length; i++) {
    calculatorButtonNumber[i].addEventListener('click', () => {
        if (calculator.isClickedOnMathOperator === false) {
            calculator.calculatorFirstEnteredDigits.push(calculatorButtonNumber[i].value);
            
            // SHOWING THE CLICKED DIGIT ON THE SCREEN
            const beingEnteredDigitString = calculator.calculatorFirstEnteredDigits.join(',');
            calculatorScreen.innerHTML = beingEnteredDigitString.replaceAll(',', '');
            calculatorScreenParagraph.innerHTML = '';
        } else {
            calculator.calculatorSecondEnteredDigits.push(calculatorButtonNumber[i].value);

            // SHOWING THE CLICKED DIGIT ON THE SCREEN
            const beingEnteredDigitString = calculator.calculatorSecondEnteredDigits.join(',');
            calculatorScreen.innerHTML = beingEnteredDigitString.replaceAll(',', '');
        };
    });
};

// DELETING A DIGIT

function deletingOneDigit() {
    if (calculator.isClickedOnMathOperator === false) {
        calculator.calculatorFirstEnteredDigits.pop();
        const beingEnteredDigitString = calculator.calculatorFirstEnteredDigits.join(',');
        calculatorScreen.innerHTML = beingEnteredDigitString.replaceAll(',', '');
    } else {
        calculator.calculatorSecondEnteredDigits.pop();
        const beingEnteredDigitString = calculator.calculatorSecondEnteredDigits.join(',');
        calculatorScreen.innerHTML = beingEnteredDigitString.replaceAll(',', '');
    };
};

// MATH OPERATOR
for (let i = 0; i < calculatorMathOperatorButton.length; i++) {
    calculatorMathOperatorButton[i].addEventListener('click', () => {
        const beingEnteredDigitString = calculator.calculatorFirstEnteredDigits.join(',');
        calculatorScreenParagraph.innerHTML = beingEnteredDigitString.replaceAll(',', '');;
        calculatorScreenParagraph.innerHTML += calculatorMathOperatorButton[i].value;

        // CHANGING THE VALUE OF BOOLEAN
        calculator.ClickedOnMathOperator = calculatorMathOperatorButton[i].value;
        calculator.isClickedOnMathOperator = true;
    });
};

// CALCULATE THE VALUE

function calculateTheValue() {
    const firstEnteredDigits = Number(calculator.calculatorFirstEnteredDigits.join(',').replaceAll(',', ''));
    const secondEnteredDigits = Number(calculator.calculatorSecondEnteredDigits.join(',').replaceAll(',', ''));

    const calculatedValue = () => {
        switch (calculator.ClickedOnMathOperator) {
            case '+':
                return firstEnteredDigits + secondEnteredDigits
                break;
            case '-':
                return firstEnteredDigits - secondEnteredDigits
                break;
            case '*':
                return firstEnteredDigits * secondEnteredDigits
                break;
            case '/':
                return firstEnteredDigits / secondEnteredDigits
                break;
        };
    };

    // SHOWING THE CALCUALTED VALUE ON THE SCREEN
    calculatorScreen.innerHTML = calculatedValue();

    // SHOWING THE FULL MATH
    const beingEnteredDigitString = calculator.calculatorSecondEnteredDigits.join(',');
    calculatorScreenParagraph.innerHTML += beingEnteredDigitString.replaceAll(',', '');;

    // RESETTING EVERYTHING
    calculator.ClickedOnMathOperator = '';
    calculator.isClickedOnMathOperator = false;
};

// INITIALIZING BUTTONS
calculatorCalculateButton.addEventListener('click', calculateTheValue);
calculatorDeleteButton.addEventListener('click', deletingOneDigit);