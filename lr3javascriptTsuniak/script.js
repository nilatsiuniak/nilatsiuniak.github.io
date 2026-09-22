// Завдання 1
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
function showGreeting(fullName, age) {
  const message = `Hello, ${fullName}! You are ${age} years old.`;
  alert(message);
  return message;
}

function task1_1() {
  const firstName = prompt('Введіть ваше ім\'я:');
  const lastName = prompt('Введіть ваше прізвище:');
  const age = Number(prompt('Введіть ваш вік:'));
  const fullName = getFullName(firstName, lastName);
  const message = showGreeting(fullName, age);

  document.getElementById('output-1-1').textContent = message;
}
document.getElementById('btn-1-1').addEventListener('click', task1_1);

// Завдання 2
function getStudentInfo() {
  const name = prompt('Введіть ім\'я студента:');
  const score = Number(prompt('Введіть бал студента (0-12):'));
  return { name, score };
}

function checkGrade(score) {
  if (score >= 10) {
    return 'Excellent';
  } else if (score >= 7) {
    return 'Good';
  } else if (score >= 4) {
    return 'Satisfactory';
  } else {
    return 'Fail';
  }
}
function showResult(name, grade) {
  const message = `Student: ${name}\nGrade: ${grade}`;
  alert(message);
  return message;
}

function task1_2() {
  const student = getStudentInfo();
  const grade = checkGrade(student.score);
  const message = showResult(student.name, grade);
  document.getElementById('output-1-2').textContent = message;
}
document.getElementById('btn-1-2').addEventListener('click', task1_2);


// Завдання 3
const calculateTip = (amount, percent = 10) => {
  return (amount * percent) / 100;
};

function showTipResult(amount, tip) {
  const total = amount + tip;
  const message = `Bill: ${amount} грн\nTip (${(tip / amount * 100).toFixed(0)}%): ${tip} грн\nTotal: ${total} грн`;
  alert(message);
  return message;
}

function task1_3() {
  const amount = Number(prompt('Введіть суму рахунку (грн):'));
  const tip = calculateTip(amount);
  const message = showTipResult(amount, tip);
  document.getElementById('output-1-3').textContent = message;
}
document.getElementById('btn-1-3').addEventListener('click', task1_3);

// Завдання 1
function startGreetingTimer(message, seconds, callback) {
  document.getElementById('output-2-1').textContent = `Очікування ${seconds} сек...`;

  setTimeout(() => {
    console.log(message);
    document.getElementById('output-2-1').textContent = message;
    callback();
  }, seconds * 1000);
}

function task2_1() {
  const onTimerEnd = () => {
    alert('Time is up!');
  };

  startGreetingTimer('Привіт! Це повідомлення з таймера.', 3, onTimerEnd);
}
document.getElementById('btn-2-1').addEventListener('click', task2_1);

// Завдання 2
function calculate(a, b, operation) {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return 'Invalid operation';
  }
}
function showCalcResult() {
  const a = Number(prompt('Введіть перше число:'));
  const b = Number(prompt('Введіть друге число:'));
  const operation = prompt('Введіть операцію (+, -, *, /):');
  const result = calculate(a, b, operation)
  const message = `${a} ${operation} ${b} = ${result}`;
  alert(message);

  document.getElementById('output-2-2').textContent = message;
}
document.getElementById('btn-2-2').addEventListener('click', showCalcResult);

// Завдання 3
function createClickCounter() {
  let count = 0;
  return function () {
    count++;
    console.log('Поточне значення лічильника:', count);
    return count;
  };
}
const clickCounter = createClickCounter();

function task2_3() {
  const currentCount = clickCounter();
  document.getElementById('output-2-3').textContent =
    `Лічильник натискань: ${currentCount} (значення зберігається завдяки замиканню, дивись консоль F12)`;
}

document.getElementById('btn-2-3').addEventListener('click', task2_3);