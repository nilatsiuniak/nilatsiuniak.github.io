// Завдання 1
function task1_1() {
  const userName = prompt('Введіть ваше ім\'я:');

  const message = `Hello, ${userName}! Welcome to JavaScript`;
  alert(message);

  document.getElementById('output-1-1').textContent = message;
}

document.getElementById('btn-1-1').addEventListener('click', task1_1);

// Завдання 2
function task1_2() {
  const age = Number(prompt('Введіть ваш вік:'));
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const message = `You were born in ${birthYear}`;
  alert(message);

  document.getElementById('output-1-2').textContent = message;
}
document.getElementById('btn-1-2').addEventListener('click', task1_2);

// Завдання 3
function task1_3() {
  const firstName = prompt('Введіть ваше ім\'я:');
  const lastName = prompt('Введіть ваше прізвище:');
  console.log('Your full name is ' + firstName + ' ' + lastName);
  console.log(`Your full name is ${firstName} ${lastName}`);
  document.getElementById('output-1-3').textContent =
    `Your full name is ${firstName} ${lastName} (результат виведено у консоль двома способами — F12)`;
}

document.getElementById('btn-1-3').addEventListener('click', task1_3);

// Завдання 1
let userName = 'Тарас';

function task2_1() {
  console.log('Глобальна userName перед блоком if:', userName);

  if (true) {
    let userName = prompt('Введіть інше ім\'я (для локальної змінної):');
    console.log('Локальна userName всередині if:', userName);
    document.getElementById('output-2-1').textContent =
      `Глобальна userName: "Тарас" (не змінилась). Локальна userName всередині if: "${userName}". ` +
      `Пояснення: let має блочну область видимості — локальна змінна всередині {} не впливає на глобальну. ` +
      `Детальні значення виведено у консоль (F12).`;
  }
  console.log('Глобальна userName після блоку if:', userName);
}

document.getElementById('btn-2-1').addEventListener('click', task2_1);



// Завдання 2
function task2_2() {
  const name = prompt('Введіть ваше ім\'я:');
  const age = Number(prompt('Введіть ваш вік:'));
  const isConfirmed = confirm(`Hello, ${name}! Your age is ${age}. Continue?`);
  let message;
  if (isConfirmed) {
    message = 'Welcome!';
  } else {
    message = 'Goodbye!';
  }

  alert(message);
  document.getElementById('output-2-2').textContent = message;
}
document.getElementById('btn-2-2').addEventListener('click', task2_2);



// Завдання 3
function task2_3() {
  const number = Number(prompt('Введіть число:'));

  let message;
  if (number % 2 === 0) {
    message = 'Number is even';
  } else {
    message = 'Number is odd';
  }

  alert(message);
  document.getElementById('output-2-3').textContent = message;
}

document.getElementById('btn-2-3').addEventListener('click', task2_3);