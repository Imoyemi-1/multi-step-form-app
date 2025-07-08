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

let page = 'info';

// moving between page

const moveToInfo = () => {
  infoPage.classList.add('active');
  selectPlanPage.classList.remove('active');
  page = 'info';
  stepCounter[0].classList.add('active');
};

const moveToSelectPlan = () => {
  infoPage.classList.remove('active');
  addOnsPage.classList.remove('active');
  selectPlanPage.classList.add('active');
  page = 'plan';
  stepCounter[1].classList.add('active');
};

const moveToAddons = () => {
  selectPlanPage.classList.remove('active');
  finishupPage.classList.remove('active');
  addOnsPage.classList.add('active');
  page = 'addons';
  stepCounter[2].classList.add('active');
};

const moveToFinishup = () => {
  addOnsPage.classList.remove('active');
  finishupPage.classList.add('active');
  page = 'finish';
  stepCounter[3].classList.add('active');
};

const moveToThankPage = () => {
  finishupPage.classList.remove('active');
  thankyouPage.classList.add('active');
  stepCounter[3].classList.add('active');
  document.querySelector('main').classList.add('thankyou');
};

// eventlistener for moving between pages
nextBtn.addEventListener('click', () => {
  stepCounter.forEach((element) => element.classList.remove('active'));
  switch (page) {
    case 'info':
      moveToSelectPlan();
      backBtn.style.visibility = 'visible';
      break;
    case 'plan':
      moveToAddons();
      break;
    case 'addons':
      moveToFinishup();
      break;
    default:
      moveToThankPage();
      document.getElementById('btn-container').style.display = 'none';
      break;
  }
});

backBtn.addEventListener('click', () => {
  stepCounter.forEach((element) => element.classList.remove('active'));
  switch (page) {
    case 'addons':
      moveToSelectPlan();
      break;
    case 'finish':
      moveToAddons();
      break;
    default:
      moveToInfo();
      backBtn.style.visibility = 'hidden';
      break;
  }
});
