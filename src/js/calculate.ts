const calculateState = () => {
  let result: number = 0;
  let operator: string = '';

  let prevCount = 0;
  let computedCount = 0;

  const changeResult = () => {
    const reslutSection = document.querySelector('.result-section') as HTMLElement;

    if (reslutSection) {
      reslutSection.textContent = result.toString();
    }
  };

  const initResult = () => {
    result = 0;
    operator = '';

    changeResult();
  };

  const onClickNumberButtons = (e: Event) => {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const targetValue = target.dataset.value;

    if (!targetValue) {
      return;
    }

    if (result > 0 && !operator) {
      result = Number(result.toString() + targetValue);
    } else {
      result = Number(targetValue);
    }

    changeResult();
  };

  const convertResultNumberType = () => {
    if (result > 0) {
      result = result * -1;
    } else {
      result = Math.abs(result);
    }

    changeResult();
  };

  const convertResultPercent = () => {
    result = result / 100;
    changeResult();
  };

  const computedAction = () => {
    const operatorIsAdd = operator === '+';
    const operatorIsSub = operator === '-';
    const operatorIsMult = operator === 'X';
    const operatorIsDiv = operator === '/';

    if (operatorIsAdd) {
      computedCount = prevCount + result;
    }
    if (operatorIsSub) {
      computedCount = prevCount - result;
    }
    if (operatorIsMult) {
      computedCount = prevCount * result;
    }
    if (operatorIsDiv) {
      computedCount = prevCount / result;
    }

    result = computedCount;
    changeResult();
  };

  const onClickOperatorButton = (e: Event) => {
    const target = e.target as HTMLElement;
    const targetValue = target.dataset.value;

    if (!targetValue || !result) {
      return;
    }

    const isInit = targetValue === 'C';
    const convertNumberType = targetValue === '+/-';
    const isConvertPercent = targetValue === '%';

    const isAddition = targetValue === '+';
    const isSubtraction = targetValue === '-';
    const isMultiplication = targetValue === 'X';
    const isDivision = targetValue === '/';
    const isComputedResult = targetValue === '=';

    if (isInit) {
      initResult();
      return;
    }

    if (convertNumberType) {
      convertResultNumberType();
      return;
    }

    if (isConvertPercent) {
      convertResultPercent();
      return;
    }

    if (isAddition || isSubtraction || isMultiplication || isDivision) {
      operator = targetValue;
      prevCount = result;
    }

    if (isComputedResult) {
      computedAction();
      return;
    }
  };

  return {
    onClickNumberButtons,
    onClickOperatorButton,
  };
};

const DEFAULT_BUTTONS_SELECTOR = '.calculator-container .buttons-section .button-table tr td';

const buttonsAddClickEvent = (selector: string, event: (e: Event) => void) => {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach((button) => button.addEventListener('click', event));
};

window.onload = () => {
  const calculate = calculateState();

  buttonsAddClickEvent(`${DEFAULT_BUTTONS_SELECTOR}.number`, calculate.onClickNumberButtons);
  buttonsAddClickEvent(`${DEFAULT_BUTTONS_SELECTOR}.operator`, calculate.onClickOperatorButton);
};

export {};
