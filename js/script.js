/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
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
const toggleYearBtn = document.querySelector('.toggle');
const addonsItems = document.querySelectorAll('.add-ons-container');
const changePlanChoose = document.getElementById('change-plan-chose');

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

// select add on

const checkedCheckbox = () => {
  const checkBoxCons = document.querySelectorAll('.checked');
  if (checkBoxCons) {
    checkBoxCons.forEach(
      (item) =>
        // eslint-disable-next-line prettier/prettier
        (item.querySelector(`input[type='checkbox']`).checked = true)
    );
  }
};

const selectAddons = (e) => {
  e.currentTarget.classList.toggle('checked');
  checkedCheckbox();
  if (e.currentTarget.classList.contains('checked'))
    e.currentTarget.querySelector('input[type="checkbox"]').checked = true;
  else e.currentTarget.querySelector('input[type="checkbox"]').checked = false;
};

// user to choose between month and year

const toggleYearPlan = () => {
  const planYear = document.querySelectorAll('.plan-year');
  const planPrice = document.querySelectorAll('.plan-amt');
  const addOnsPrice = document.querySelectorAll('.add-ons-price');
  const planChoseNameTime = document.getElementById('plan-chose-name-time');
  const totalTimeSel = document.getElementById('total-time-sel');
  const monthly = document.getElementById('monthly');
  const yearly = document.getElementById('yearly');

  toggleYearBtn.classList.toggle('year');
  if (toggleYearBtn.classList.contains('year')) {
    planYear.forEach((el) => (el.style.display = 'block'));
    planPrice[0].textContent = '$90/yr';
    planPrice[1].textContent = '$120/yr';
    planPrice[2].textContent = '$150/yr';
    addOnsPrice[0].textContent = '$10/yr';
    addOnsPrice[1].textContent = '$20/yr';
    addOnsPrice[2].textContent = '$20/yr';
    planChoseNameTime.textContent = 'Yearly';
    totalTimeSel.textContent = 'year';
    monthly.classList.remove('picked');
    yearly.classList.add('picked');
  } else {
    planYear.forEach((el) => (el.style.display = 'none'));
    planPrice[0].textContent = '$9/mo';
    planPrice[1].textContent = '$12/mo';
    planPrice[2].textContent = '$15/mo';
    addOnsPrice[0].textContent = '$1/mo';
    addOnsPrice[1].textContent = '$2/mo';
    addOnsPrice[2].textContent = '$2/mo';
    planChoseNameTime.textContent = 'Monthly';
    totalTimeSel.textContent = 'month';
    yearly.classList.remove('picked');
    monthly.classList.add('picked');
  }
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
    finishupPage.classList.remove('active');
    selectPlanPage.classList.add('active');
    page = 'plan';
    stepCounter.forEach((element) => element.classList.remove('active'));
    stepCounter[1].classList.add('active');
    backBtn.style.visibility = 'visible';
    nextBtn.textContent = 'Next Step';
    nextBtn.style.backgroundColor = 'var(--Blue-950)';
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
  checkedCheckbox();
  nextBtn.textContent = 'Next Step';
  nextBtn.style.backgroundColor = 'var(--Blue-950)';
};

const moveToFinishup = () => {
  addOnsPage.classList.remove('active');
  finishupPage.classList.add('active');
  page = 'finish';
  stepCounter.forEach((element) => element.classList.remove('active'));
  stepCounter[3].classList.add('active');
  nextBtn.textContent = 'Confirm';
  nextBtn.style.backgroundColor = 'var(--Purple-600)';
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
addonsItems.forEach((el) => el.addEventListener('click', selectAddons));
toggleYearBtn.addEventListener('click', toggleYearPlan);
changePlanChoose.addEventListener('click', moveToSelectPlan);

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
