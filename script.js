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
    isCalculateButtonClicked: false,
};

// THEME TOGGLE
const themeToggleButton = document.querySelector('.calculator-top-theme-itself');
const themeToggleButtonInner = document.querySelector('.calculator-top-theme-itself-inner');
const themeToggleButtonGrid = document.querySelectorAll('.calculator-top-theme-itself-grid');
const themeToggleButtonIndicatorText = document.querySelectorAll('.calculator-top-theme-container-text-itself');

// CHANGING THE THEME

function changingTheTheme(e) {
    for (let i = 0; i < themeToggleButtonGrid.length; i++) {
        themeToggleButtonGrid[i].addEventListener('click', () => {
            switch (themeToggleButtonGrid[i].getAttribute('data-theme')) {
                case '1':
                    themeToggleButtonInner.style.left = '3px';
                    removeTheActiveClassFromIndicatorTexts();
                    themeToggleButtonIndicatorText[i].classList.add('calculator-top-theme-container-text-itself-active');
                    break;
                case '2':
                    themeToggleButtonInner.style.left = 'calc(50% - 7.5px)';
                    removeTheActiveClassFromIndicatorTexts();
                    themeToggleButtonIndicatorText[i].classList.add('calculator-top-theme-container-text-itself-active');
                    break;  
                case '3':
                    themeToggleButtonInner.style.left = 'calc(100% - 18px)';
                    removeTheActiveClassFromIndicatorTexts();
                    themeToggleButtonIndicatorText[i].classList.add('calculator-top-theme-container-text-itself-active');
                    break; 
            };
        });
    };
};

changingTheTheme();
// 

function removeTheActiveClassFromIndicatorTexts() {
    for (const indicatorText of themeToggleButtonIndicatorText) {
        indicatorText.classList.remove('calculator-top-theme-container-text-itself-active');
    };
};

// ENTERING DIGITS

for (let i = 0; i < calculatorButtonNumber.length; i++) {
    calculatorButtonNumber[i].addEventListener('click', () => {
        if (calculator.isClickedOnMathOperator === false) {
            calculator.calculatorFirstEnteredDigits.push(calculatorButtonNumber[i].value);
            
            // SHOWING THE CLICKED DIGIT ON THE SCREEN
            const beingEnteredDigitString = calculator.calculatorFirstEnteredDigits.join(',');
            calculatorScreen.textContent = beingEnteredDigitString.replaceAll(',', '');
            calculatorScreenParagraph.textContent = '';
        } else {
            calculator.calculatorSecondEnteredDigits.push(calculatorButtonNumber[i].value);

            // SHOWING THE CLICKED DIGIT ON THE SCREEN
            const beingEnteredDigitString = calculator.calculatorSecondEnteredDigits.join(',');
            calculatorScreen.textContent = beingEnteredDigitString.replaceAll(',', '');
        };

        calculator.isCalculateButtonClicked = false;
    });
};

// DELETING A DIGIT

function deletingOneDigit() {
    if (calculator.isCalculateButtonClicked === false) {
        if (calculator.isClickedOnMathOperator === false) {
            calculator.calculatorFirstEnteredDigits.pop();
            const beingEnteredDigitString = calculator.calculatorFirstEnteredDigits.join(',');
            calculatorScreen.textContent = beingEnteredDigitString.replaceAll(',', '');
        } else {
            calculator.calculatorSecondEnteredDigits.pop();
            const beingEnteredDigitString = calculator.calculatorSecondEnteredDigits.join(',');
            calculatorScreen.textContent = beingEnteredDigitString.replaceAll(',', '');
        };
    } else {
        resetEverything();

        calculatorScreen.textContent = '';
        calculatorScreenParagraph.textContent = '';
    };
};

// MATH OPERATOR
for (let i = 0; i < calculatorMathOperatorButton.length; i++) {
    calculatorMathOperatorButton[i].addEventListener('click', () => {
        if (calculator.calculatorSecondEnteredDigits.length === 0) {
            const beingEnteredDigitString = calculator.calculatorFirstEnteredDigits.join(',');
            calculatorScreenParagraph.textContent = beingEnteredDigitString.replaceAll(',', '');;
            calculatorScreenParagraph.textContent += calculatorMathOperatorButton[i].value;

            // CHANGING THE VALUE OF BOOLEAN
            calculator.ClickedOnMathOperator = calculatorMathOperatorButton[i].value;
            calculator.isClickedOnMathOperator = true;
        };
    });
};

// CALCULATE THE VALUE

function calculateTheValue() {
    calculator.isCalculateButtonClicked = true;
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
    calculatorScreen.textContent = calculatedValue();

    // SHOWING THE FULL MATH
    const beingEnteredDigitString = calculator.calculatorSecondEnteredDigits.join(',');
    calculatorScreenParagraph.textContent += beingEnteredDigitString.replaceAll(',', '');

    // RESETTING EVERYTHING
    resetEverything();
};

function resetEverything() {
    // RESETTING EVERYTHING
    calculator.ClickedOnMathOperator = '';
    calculator.isClickedOnMathOperator = false;
    calculator.calculatorFirstEnteredDigits = [];
    calculator.calculatorSecondEnteredDigits = [];
};

// INITIALIZING BUTTONS
calculatorCalculateButton.addEventListener('click', calculateTheValue);
calculatorDeleteButton.addEventListener('click', deletingOneDigit);
calculatorResetButton.addEventListener('click', () => {
    resetEverything();

    calculatorScreen.textContent = '';
    calculatorScreenParagraph.textContent = '';
});
themeToggleButton.addEventListener('click', changingTheTheme);