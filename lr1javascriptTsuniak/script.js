
// Завдання 1
alert('Зараз буде виведено привітання');
const fullName = 'Цюняк Неоніла';
const greetingP = document.createElement('p');
greetingP.textContent = `Hello, ${fullName}!`;
document.body.appendChild(greetingP);

// Завдання 2
const isConfirmed = confirm('Ви підтверджуєте дію?');
const confirmP = document.createElement('p');

if (isConfirmed) {
  confirmP.textContent = 'Ви натиснули кнопку "ОК"';
} else {
  confirmP.textContent = 'Ви натиснули кнопку "Відміна"';
}
document.body.appendChild(confirmP);

// Завдання 3

const journalNumber = 17;
const lastDigit = journalNumber % 10;
const tableTitle = document.createElement('h2');
tableTitle.textContent = `Таблиця множення для числа ${lastDigit}`;
document.body.appendChild(tableTitle);
for (let i = 1; i <= 10; i++) {
  const row = document.createElement('p');
  row.classList.add('table-row');
  row.textContent = `${lastDigit} x ${i} = ${lastDigit * i}`;
  document.body.appendChild(row);
}

// Завдання 1
function checkEvenOdd(number) {
  const resultP = document.createElement('p');
  if (number % 2 === 0) {
    resultP.textContent = `Число ${number} — парне`;
    resultP.classList.add('even');
  } else {
    resultP.textContent = `Число ${number} — непарне`;
    resultP.classList.add('odd');
  }

  document.body.appendChild(resultP);
}
checkEvenOdd(journalNumber);

// Завдання 2
function generatePassword(name, number) {
  const namePart = name.slice(0, 3);
  const numberPart = number * 2;
  return `${namePart}${numberPart}`;
}

const studentFirstName = 'Тарас';
const password = generatePassword(studentFirstName, journalNumber);
const passwordDiv = document.createElement('div');
passwordDiv.classList.add('password-box');
passwordDiv.textContent = `Згенерований пароль: ${password}`;
document.body.appendChild(passwordDiv);

// Завдання 3
function calculateAverageGrade() {
  const grade1 = Number(prompt('Введіть першу оцінку:'));
  const grade2 = Number(prompt('Введіть другу оцінку:'));
  const grade3 = Number(prompt('Введіть третю оцінку:'));
  const average = (grade1 + grade2 + grade3) / 3;
  const gradeDiv = document.createElement('div');
  gradeDiv.id = String(journalNumber);
  gradeDiv.classList.add('grade-box');
  gradeDiv.textContent = `Середній бал: ${average.toFixed(2)}`;

  document.body.appendChild(gradeDiv);
}
calculateAverageGrade();


// Завдання 4
function collectStudents() {
  const studentsCount = Number(prompt('Введіть кількість студентів у групі:'));
  const listTitle = document.createElement('h2');
  listTitle.textContent = 'Список студентів групи';
  document.body.appendChild(listTitle);
  for (let i = 1; i <= studentsCount; i++) {
    const studentName = prompt(`Введіть прізвище та ім'я студента №${i}:`);
    const studentP = document.createElement('p');
    studentP.textContent = `${i}. ${studentName}`;
    document.body.appendChild(studentP);
  }
}

collectStudents();