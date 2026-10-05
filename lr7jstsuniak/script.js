/* ===================== Допоміжні функції ===================== */

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
}

function scoreText(state) {
    const percent = state.total === 0 ? 0 : Math.round(state.correct / state.total * 100);
    return `Загальний рахунок ${percent}% (${state.correct} правильних відповідей з ${state.total})`;
}

function showResult(element, isOk, text) {
    element.textContent = text;
    element.className = isOk ? 'ok' : 'error';
}


function fahrenheitToCelsius() {
    const fInput = document.getElementById('fahrenheit');
    const cInput = document.getElementById('celsius');
    const f = parseFloat(fInput.value.replace(',', '.'));
    if (isNaN(f)) {
        cInput.value = '';
        return;
    }
    cInput.value = Number((5 / 9 * (f - 32)).toFixed(2));
}

function celsiusToFahrenheit() {
    const fInput = document.getElementById('fahrenheit');
    const cInput = document.getElementById('celsius');
    const c = parseFloat(cInput.value.replace(',', '.'));
    if (isNaN(c)) {
        fInput.value = '';
        return;
    }
    fInput.value = Number((c * 9 / 5 + 32).toFixed(2));
}

const quiz2 = { total: 0, correct: 0, a: 0, b: 0, answered: false };

function generateTask2() {
    quiz2.a = randInt(2, 9);
    quiz2.b = randInt(2, 9);
    quiz2.answered = false;

    document.getElementById('task2').textContent = `${quiz2.a} × ${quiz2.b} =`;

    const input = document.getElementById('answer2');
    input.value = '';
    input.disabled = false;
    document.getElementById('check2').disabled = false;

    const result = document.getElementById('result2');
    result.textContent = '';
    result.className = '';

    input.focus();
}

function checkAnswer2() {
    if (quiz2.answered) return;

    const input = document.getElementById('answer2');
    const result = document.getElementById('result2');
    const value = input.value.trim();

    if (value === '') {
        showResult(result, false, 'Введіть відповідь');
        return;
    }

    const rightAnswer = quiz2.a * quiz2.b;
    quiz2.answered = true;
    quiz2.total++;

    if (Number(value) === rightAnswer) {
        quiz2.correct++;
        showResult(result, true, 'Правильно!');
    } else {
        showResult(result, false, `Помилка, правильна відповідь «${rightAnswer}»`);
    }

    input.disabled = true;
    document.getElementById('check2').disabled = true;
    document.getElementById('score2').textContent = scoreText(quiz2);
}

function initTask2() {
    document.getElementById('score2').textContent = scoreText(quiz2);
    generateTask2();
}

const quiz3 = { total: 0, correct: 0, a: 0, b: 0, answered: false };

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function generateOptions(rightAnswer) {
    const options = new Set([rightAnswer]);
    while (options.size < 4) {
        const wrong = randInt(Math.max(1, rightAnswer - 12), rightAnswer + 12);
        options.add(wrong);
    }
    return shuffle(Array.from(options));
}

function generateTask3() {
    quiz3.a = randInt(2, 9);
    quiz3.b = randInt(2, 9);
    quiz3.answered = false;

    document.getElementById('task3').textContent = `${quiz3.a} × ${quiz3.b} =`;

    const optionsBox = document.getElementById('options3');
    optionsBox.textContent = '';

    const options = generateOptions(quiz3.a * quiz3.b);
    options.forEach(function (option, index) {
        const label = createEl('label');
        const radio = createEl('input');
        radio.type = 'radio';
        radio.name = 'answer3';
        radio.id = 'option3_' + index;
        radio.value = option;
        radio.addEventListener('change', checkAnswer3);

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsBox.appendChild(label);
    });

    const result = document.getElementById('result3');
    result.textContent = '';
    result.className = '';
}

function checkAnswer3(event) {
    if (quiz3.answered) return;
    quiz3.answered = true;
    quiz3.total++;

    const rightAnswer = quiz3.a * quiz3.b;
    const result = document.getElementById('result3');

    if (Number(event.target.value) === rightAnswer) {
        quiz3.correct++;
        showResult(result, true, 'Правильно!');
    } else {
        showResult(result, false, `Помилка, правильна відповідь «${rightAnswer}»`);
    }

    document.querySelectorAll('#options3 input').forEach(function (radio) {
        radio.disabled = true;
    });

    document.getElementById('score3').textContent = scoreText(quiz3);
}

function initTask3() {
    document.getElementById('score3').textContent = scoreText(quiz3);
    generateTask3();
}


let imagesArray = [
    {
        path: 'images/logitech.webp',
        title: 'Logitech G Pro',
        description: 'Механічна ігрова клавіатура'
    },
    {
        path: 'images/apple.webp',
        title: 'Apple Magic Keyboard',
        description: 'Бездротова клавіатура для Mac'
    },
    {
        path: 'images/keychrome.jpg',
        title: 'Keychron K2',
        description: 'Компактна механічна клавіатура'
    },
    {
        path: 'images/microsoft.webp',
        title: 'Microsoft Ergonomic',
        description: 'Ергономічна клавіатура для офісу'
    }
];

function initPhotoRotator(rotatorId, images) {
    const root = document.getElementById(rotatorId);
    if (!root || !images || images.length === 0) return;

    root.textContent = '';
    root.classList.add('rotator');

    let current = 0;

    const left = createEl('div', 'rotator__left');
    const linkBack = createEl('a', 'rotator__link', 'Назад');
    linkBack.href = '#';
    left.appendChild(linkBack);

    const counter = createEl('div', 'rotator__counter');

    const imgBox = createEl('div', 'rotator__imgbox');
    const img = createEl('img', 'rotator__img');
    imgBox.appendChild(img);

    const caption = createEl('div', 'rotator__caption');
    const title = createEl('span', 'rotator__title');
    const description = createEl('span', 'rotator__description');
    caption.appendChild(title);
    caption.appendChild(description);

    const right = createEl('div', 'rotator__right');
    const linkNext = createEl('a', 'rotator__link', 'Вперед');
    linkNext.href = '#';
    right.appendChild(linkNext);

    root.appendChild(left);
    root.appendChild(counter);
    root.appendChild(imgBox);
    root.appendChild(caption);
    root.appendChild(right);

    // Оновлення вмісту
    function render() {
        const item = images[current];
        counter.textContent = `Фотографія ${current + 1} з ${images.length}`;
        img.src = item.path;
        img.alt = item.title;
        title.textContent = item.title;
        description.textContent = item.description;

        // visibility, а не display — щоб не було «стрибків»
        linkBack.classList.toggle('hidden', current === 0);
        linkNext.classList.toggle('hidden', current === images.length - 1);
    }

    linkBack.addEventListener('click', function (event) {
        event.preventDefault();
        if (current > 0) {
            current--;
            render();
        }
    });

    linkNext.addEventListener('click', function (event) {
        event.preventDefault();
        if (current < images.length - 1) {
            current++;
            render();
        }
    });

    render();
}

const DIGIT_FONT = {
    0: ['111', '101', '101', '101', '111'],
    1: ['010', '110', '010', '010', '111'],
    2: ['111', '001', '111', '100', '111'],
    3: ['111', '001', '111', '001', '111'],
    4: ['101', '101', '111', '001', '001'],
    5: ['111', '100', '111', '001', '111'],
    6: ['111', '100', '111', '101', '111'],
    7: ['111', '001', '001', '001', '001'],
    8: ['111', '101', '111', '101', '111'],
    9: ['111', '101', '111', '001', '111']
};

function generateCaptchaNumber(digitsCount) {
    let result = '';
    for (let i = 0; i < digitsCount; i++) {
        result += randInt(0, 9);
    }
    return result;
}

function createDigitElement(digit) {
    const digitBox = createEl('div', 'captcha__digit');
    DIGIT_FONT[digit].forEach(function (row) {
        for (const cell of row) {
            const pixel = createEl('span', 'captcha__pixel');
            if (cell === '1') pixel.classList.add('on');
            digitBox.appendChild(pixel);
        }
    });
    return digitBox;
}

function initCaptcha(captchaId, digitsCount) {
    const root = document.getElementById(captchaId);
    if (!root) return;
    root.textContent = '';

    const code = generateCaptchaNumber(digitsCount);

    const label = createEl('div', 'captcha__label', 'Введіть число');
    const display = createEl('div', 'captcha__display');
    for (const digit of code) {
        display.appendChild(createDigitElement(digit));
    }

    const input = createEl('input', 'captcha__input');
    input.type = 'text';
    input.maxLength = digitsCount;

    const message = createEl('div', 'captcha__message');

    input.addEventListener('input', function () {
        const value = input.value.trim();
        if (value.length < digitsCount) {
            message.textContent = '';
            message.className = 'captcha__message';
            return;
        }
        if (value === code) {
            message.textContent = 'Вірно';
            message.className = 'captcha__message ok';
        } else {
            message.textContent = 'Помилка';
            message.className = 'captcha__message error';
        }
    });

    const wrapper = createEl('div', 'captcha');
    wrapper.appendChild(label);
    wrapper.appendChild(display);
    wrapper.appendChild(input);
    wrapper.appendChild(message);
    root.appendChild(wrapper);
}

document.addEventListener('DOMContentLoaded', function () {
    initTask2();
    initTask3();
    initPhotoRotator('rotator', imagesArray);
    initCaptcha('captcha', 4);
});