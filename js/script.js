// GLOBAL VARIABLE

const infoPage = document.getElementById('info-screen');
const selectPlanPage = document.getElementById('select-plan-screen');
const addOnsPage = document.getElementById('add-ons-screen');
const finishupPage = document.getElementById('finishup-screen');
const thankyouPage = document.getElementById('thankyou-screen');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const nameInput = document.querySelector('input#name');
const emailInput = document.querySelector('input#email');
const numberInput = document.querySelector('input#number');
const stepCounter = document.querySelectorAll('.step-counter');
const planItems = document.querySelectorAll('.plan-txt-container');

let page = 'info';
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

// validate form

const isValidName = () => {
  const validity = nameInput.value.length >= 5;

  return validity;
};

const isValidEmail = () => {
  const validity =
    emailInput.value.length !== 0 && emailRegExp.test(emailInput.value);

  return validity;
};

const isValidNumber = () => {
  const validity = numberInput.value.length >= 9;

  return validity;
};

const setEleClass = (isValid, el) => {
  // eslint-disable-next-line no-param-reassign
  el.className = isValid ? 'formvalidate' : 'formvalidate invalid';
};

const showErrorMessage = (message, element, isValid) => {
  const error = element.previousElementSibling.querySelector('.error');
  if (isValid) {
    error.textContent = '';
  } else if (element.value.trim() <= 0) {
    error.textContent = 'This field is required';
  } else {
    error.textContent = message;
  }
};

const handleNameInput = () => {
  const nameValid = isValidName();
  let message;
  if (nameInput.value.trim().length < 5) message = 'Name is too short';

  showErrorMessage(message, nameInput, nameValid);
  setEleClass(nameValid, nameInput);
};

const handleEmailInput = () => {
  const emailValid = isValidEmail();
  let message;
  if (!emailRegExp.test(emailInput.value)) message = 'Input a valid email';

  showErrorMessage(message, emailInput, emailValid);
  setEleClass(emailValid, emailInput);
};

const handleNumberInput = () => {
  const numberValid = isValidNumber();
  let message;
  if (numberInput.value.length <= 9) message = 'Number is too short';

  showErrorMessage(message, numberInput, numberValid);
  setEleClass(numberValid, numberInput);
};

const handleInput = () => {
  const valid = isValidNumber() && isValidName() && isValidEmail();

  return valid;
};

// choose  plan

const changePlan = (e) => {
  planItems.forEach((item) => item.classList.remove('choose'));
  e.currentTarget.classList.add('choose');
};

// moving between page

const moveToInfo = () => {
  infoPage.classList.add('active');
  selectPlanPage.classList.remove('active');
  page = 'info';
  stepCounter.forEach((element) => element.classList.remove('active'));
  stepCounter[0].classList.add('active');
  backBtn.style.visibility = 'hidden';
};

const moveToSelectPlan = () => {
  if (handleInput()) {
    infoPage.classList.remove('active');
    addOnsPage.classList.remove('active');
    selectPlanPage.classList.add('active');
    page = 'plan';
    stepCounter.forEach((element) => element.classList.remove('active'));
    stepCounter[1].classList.add('active');
    backBtn.style.visibility = 'visible';
  } else {
    handleEmailInput();
    handleNameInput();
    handleNumberInput();
  }
};

const moveToAddons = () => {
  selectPlanPage.classList.remove('active');
  finishupPage.classList.remove('active');
  addOnsPage.classList.add('active');
  page = 'addons';
  stepCounter.forEach((element) => element.classList.remove('active'));
  stepCounter[2].classList.add('active');
};

const moveToFinishup = () => {
  addOnsPage.classList.remove('active');
  finishupPage.classList.add('active');
  page = 'finish';
  stepCounter.forEach((element) => element.classList.remove('active'));
  stepCounter[3].classList.add('active');
};

const moveToThankPage = () => {
  finishupPage.classList.remove('active');
  thankyouPage.classList.add('active');
  stepCounter.forEach((element) => element.classList.remove('active'));
  stepCounter[3].classList.add('active');
  document.querySelector('main').classList.add('thankyou');
  document.getElementById('btn-container').style.display = 'none';
};

// eventlistener for moving between pages

planItems.forEach((el) => el.addEventListener('click', changePlan));

nextBtn.addEventListener('click', () => {
  switch (page) {
    case 'info':
      moveToSelectPlan();
      break;
    case 'plan':
      moveToAddons();
      break;
    case 'addons':
      moveToFinishup();
      break;
    default:
      moveToThankPage();
      break;
  }
});

backBtn.addEventListener('click', () => {
  switch (page) {
    case 'addons':
      moveToSelectPlan();
      break;
    case 'finish':
      moveToAddons();
      break;
    default:
      moveToInfo();
      break;
  }
});
