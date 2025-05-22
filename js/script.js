const firstNextBtn = document.getElementById('first-page-nxtbtn');
const selectPlanNextBtn = document.getElementById('select-plan-nxt-btn');
const formName = document.getElementById('name');
const formEmail = document.getElementById('email');
const formNumber = document.getElementById('number');
const selectPlanContainer = document.querySelectorAll('.plan-container');
const changePlanBtn = document.getElementById('change-plan-btn');
const pickAddOns = document.querySelectorAll('.pick-item-container');
const selectPlanBackBtn = document.getElementById('select-plan-back-btn');
const pickOnsNextBtn = document.getElementById('pick-ons-nxt-btn');
const pickOnsBackBtn = document.getElementById('pick-ons-back-btn');
const finishBackBtn = document.getElementById('finish-up-back-btn');

function nextPage() {
  console.log(formValidating());
  if (formValidating()) {
    window.location.href = 'select-plan.html';
  }
}
function formValidating() {
  const nameError = document.querySelector('.name-error');
  const emailError = document.querySelector('.email-error');
  const numberError = document.querySelector('.number-error');
  let isValidate = true;

  //   name validating

  if (formName.value.trim() === '') {
    nameError.textContent = 'This field must be filled';
    isValidate = false;
  } else {
    nameError.textContent = '';
  }

  // email validating

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formEmail.value.trim() == '') {
    emailError.textContent = 'This field must be filled';
    isValidate = false;
  } else if (emailRegex.test(formEmail.value.trim()) === false) {
    emailError.textContent = 'Invalid E-mail';
    isValidate = false;
  } else {
    emailError.textContent = '';
  }

  // number validating

  if (formNumber.value.trim() === '') {
    numberError.textContent = 'This field must be filled';
    isValidate = false;
  } else if (formNumber.value.trim().length < 10) {
    numberError.textContent = 'Number is too short';
    isValidate = false;
  } else {
    numberError.textContent = '';
  }

  return isValidate;
}

// selecting plan

function selectPlan(e) {
  selectPlanContainer.forEach((item) => {
    item.classList.remove('plan-focus');
  });
  e.currentTarget.classList.add('plan-focus');
}

// Change plan month or year

function changePlan() {
  const arcadePrice = document.getElementById('arcade-price');
  const advancePrice = document.getElementById('advance-price');
  const proPrice = document.getElementById('pro-price');
  const monthFree = document.querySelectorAll('.month-free');

  if (!changePlanBtn.classList.contains('year')) {
    changePlanBtn.classList.remove('month');
    changePlanBtn.classList.add('year');
    arcadePrice.textContent = '$90/yr';
    advancePrice.textContent = '$120/yr';
    proPrice.textContent = '$150/yr';
    monthFree.forEach((item) => (item.style.display = 'block'));
    sessionStorage.setItem('isyear', true);
  } else {
    changePlanBtn.classList.add('month');
    changePlanBtn.classList.remove('year');
    arcadePrice.textContent = '$9/mo';
    advancePrice.textContent = '$12/mo';
    proPrice.textContent = '$15/mo';
    monthFree.forEach((item) => (item.style.display = 'none'));
    sessionStorage.setItem('isyear', false);
  }
}

// picking add ons
function selectAddOns(e) {
  if (!e.currentTarget.classList.contains('pick-item-focus')) {
    e.currentTarget.querySelector('input').checked = true;
    e.currentTarget.classList.add('pick-item-focus');
  } else {
    e.currentTarget.querySelector('input').checked = false;
    e.currentTarget.classList.remove('pick-item-focus');
  }
}

function nextPageAdds() {
  const planName = document.querySelector('.plan-focus .plan-name');
  const planPrice = document.querySelector('.plan-focus span');

  const planArr = {
    name: planName.textContent,
    price: planPrice.textContent,
  };
  sessionStorage.setItem('selectedplan', JSON.stringify(planArr));
  window.location.href = 'pick-add-ons.html';
}

function planBackBtn() {
  sessionStorage.setItem('isyear', false);
  window.location.href = 'index.html';
}

function activeSelectYear() {
  const isYear = sessionStorage.getItem('isyear');

  const onlineAmt = document.getElementById('online-amt');
  const storageAmt = document.getElementById('storage-amt');
  const profileAmt = document.getElementById('profile-amt');

  if (isYear === 'true') {
    onlineAmt.textContent = '+$10/yr';
    storageAmt.textContent = '+$20/yr';
    profileAmt.textContent = '+$20/yr';
  } else {
    onlineAmt.textContent = '+$1/mo';
    storageAmt.textContent = '+$2/mo';
    profileAmt.textContent = '+$2/mo';
  }
}

function onNextBtn() {
  const addOnsName = document.querySelectorAll('.pick-item-focus');

  const addOnArr = [];

  addOnsName.forEach((item) => {
    addOnArr.push({
      name: item.querySelector('p').textContent,
      price: item.querySelector('.amt').textContent,
    });
  });
  sessionStorage.setItem('pickedaddons', JSON.stringify(addOnArr));
  window.location.href = 'finishin-up.html';
}

function onsBackBtn() {
  sessionStorage.setItem('isyear', false);
  window.location.href = 'select-plan.html';
}

function finishBackPageBtn() {
  window.location.href = 'pick-add-ons.html';
}

function summaryItem() {
  const getPlanItemFromStorage = sessionStorage.getItem('selectedplan');
  const isYear = sessionStorage.getItem('isyear');
  const planItem = JSON.parse(getPlanItemFromStorage);

  document.querySelector('.select-plan-txt-container p').textContent =
    planItem.name;
  document.querySelector('.select-plan-amt').textContent = planItem.price;

  if (isYear === 'true') {
    document.querySelector('.select-plan-txt-container span').textContent =
      '(Yearly)';
      document.getElementById('finishing-up-isyear').textContent = 'year'
  } else {
    document.querySelector('.select-plan-txt-container span').textContent =
      '(Monthly)';
            document.getElementById('finishing-up-isyear').textContent = 'month'
  }
  createPickedOns();

  const totalPrice = [];
  let selectPlanprice = planItem.price.slice(1, -3);

  totalPrice.push(+selectPlanprice)
  const pickedPrice = document.querySelectorAll('.add-ons-txt-container .add-ons-amt')

  pickedPrice.forEach(item => totalPrice.push(+item.textContent.slice(2,-3)))
  const totalAmtPrice = totalPrice.reduce((acc,cur) => acc + cur ,0)
  document.querySelector('.total-container-amt').textContent = `$${totalAmtPrice}/${planItem.price.slice(-2)}`
}

function createPickedOns() {
  const getPlanItemFromStorage = sessionStorage.getItem('pickedaddons');
  const pickItem = JSON.parse(getPlanItemFromStorage);

  pickItem.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'add-ons-txt-container';
    div.innerHTML = `<p class="add-ons-txt">${item.name}</p>
                  <p class="add-ons-amt">${item.price}</p>`;

    document.querySelector('.add-ons-container').appendChild(div);
  });
}

if (
  window.location.pathname === '/index.html' ||
  window.location.pathname === '/'
) {
  firstNextBtn.addEventListener('click', nextPage);
}

if (window.location.pathname === '/select-plan.html') {
  selectPlanContainer.forEach((item) =>
    item.addEventListener('click', selectPlan)
  );
  changePlanBtn.addEventListener('click', changePlan);
  selectPlanNextBtn.addEventListener('click', nextPageAdds);
  selectPlanBackBtn.addEventListener('click', planBackBtn);
}

if (window.location.pathname === '/pick-add-ons.html') {
  activeSelectYear();
  pickAddOns.forEach((item) => item.addEventListener('click', selectAddOns));
  pickOnsNextBtn.addEventListener('click', onNextBtn);
  pickOnsBackBtn.addEventListener('click', onsBackBtn);
}

if (window.location.pathname === '/finishin-up.html') {
  finishBackBtn.addEventListener('click', finishBackPageBtn);
  summaryItem();
}
