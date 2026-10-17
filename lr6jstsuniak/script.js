// ==============================
// DOM
// ==============================
const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

// Індивідуальний варіант 1: background-color та text-align
const backgroundColor = document.querySelector('#background-color');
const backgroundColorValue = document.querySelector('#background-color-value');
const textAlign = document.querySelector('#text-align');

const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');

const cssCode = document.querySelector('#css-code');
const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');

const scrollTopButton = document.querySelector('#scroll-top');

// ==============================
// TABS
// ==============================
function hideTabs() {
 tabs.forEach(function (tab) {
 tab.classList.remove('active');
 });

 tabContents.forEach(function (content) {
 content.classList.remove('active');
 });
}

function showTab(tabName) {
 const tab = document.querySelector(`[data-tab="${tabName}"]`);
 const content = document.querySelector(`[data-content="${tabName}"]`);

 if (tab) {
 tab.classList.add('active');
 }

 if (content) {
 content.classList.add('active');
 }
}

tabs.forEach(function (tab) {
 tab.addEventListener('click', function (event) {
 // Аналіз об'єкта event
 console.log(event.type);
 console.log(event.target);
 console.log(event.currentTarget);

 const tabName = event.currentTarget.dataset.tab;

 hideTabs();
 showTab(tabName);
 });
});

// ==============================
// CSS CODE
// ==============================
let currentRadius = '0px 0px 0px 0px';

function updateCSSCode() {
 cssCode.value =
 `border-radius: ${currentRadius};\n` +
 `background-color: ${backgroundColor.value};\n` +
 `text-align: ${textAlign.value};`;
}

// ==============================
// BORDER RADIUS
// ==============================
function generateBorderRadius() {
 const topLeftRadius = topLeft.value;
 const topRightRadius = topRight.value;
 const bottomRightRadius = bottomRight.value;
 const bottomLeftRadius = bottomLeft.value;

 const radius = `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;

 preview.style.borderRadius = radius;
 currentRadius = radius;

 topLeftValue.textContent = `${topLeftRadius} px`;
 topRightValue.textContent = `${topRightRadius} px`;
 bottomRightValue.textContent = `${bottomRightRadius} px`;
 bottomLeftValue.textContent = `${bottomLeftRadius} px`;

 updateCSSCode();
}

topLeft.addEventListener('input', generateBorderRadius);
topRight.addEventListener('input', generateBorderRadius);
bottomRight.addEventListener('input', generateBorderRadius);
bottomLeft.addEventListener('input', generateBorderRadius);

// ==============================
// ДОДАТКОВІ ВЛАСТИВОСТІ (варіант 1)
// ==============================
backgroundColor.addEventListener('input', function () {
 preview.style.backgroundColor = backgroundColor.value;
 backgroundColorValue.textContent = backgroundColor.value;
 updateCSSCode();
});

textAlign.addEventListener('change', function () {
 preview.style.textAlign = textAlign.value;
 updateCSSCode();
});

// ==============================
// COPY
// ==============================
function showCopyMessage() {
 copyMessage.textContent = 'CSS-код скопійовано';
}

function copyCSS() {
 navigator.clipboard.writeText(cssCode.value)
 .then(showCopyMessage)
 .catch(function () {
 // Запасний варіант, якщо Clipboard API недоступний
 cssCode.select();
 document.execCommand('copy');
 showCopyMessage();
 });
}

copyButton.addEventListener('click', copyCSS);

// ==============================
// FORM
// ==============================
function validatePresetName() {
 if (presetName.value.trim() === '') {
 presetName.classList.add('error');
 presetError.textContent = 'Введіть назву пресета';
 return false;
 }

 presetName.classList.remove('error');
 presetError.textContent = '';
 return true;
}

presetName.addEventListener('focus', function () {
 presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
 presetName.classList.remove('focused');
 validatePresetName();
});

function handlePresetSubmit(event) {
 event.preventDefault();

 if (!validatePresetName()) {
 return;
 }

 console.log(`Пресет: ${presetName.value.trim()}`);
 console.log(cssCode.value);
}

presetForm.addEventListener('submit', handlePresetSubmit);

// ==============================
// KEYBOARD
// ==============================
function handleKeyDown(event) {
 if (event.key === 'Escape') {
 topLeft.value = 0;
 topRight.value = 0;
 bottomRight.value = 0;
 bottomLeft.value = 0;

 generateBorderRadius();
 }
}

document.addEventListener('keydown', handleKeyDown);

// ==============================
// SCROLL
// ==============================
function handleScroll() {
 // Реалізується на ІІІ рівні
}

// ==============================
// ІНІЦІАЛІЗАЦІЯ
// ==============================
generateBorderRadius();