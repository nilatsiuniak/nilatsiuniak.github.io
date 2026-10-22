const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');

let tasks = [];     // { id, text, date, done }
let nextId = 1;

// Формат дати: 12.12.22, 16:09
function formatDate(date) {
  return date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

// Додавання завдання по Enter
input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: nextId++, text, date: formatDate(new Date()), done: false });
  input.value = '';
  render();
});

// Відображення списку
function render() {
  list.innerHTML = '';
  emptyMsg.hidden = tasks.length > 0;

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');

    // checkbox — лише для невиконаних (після виконання зникає)
    if (!task.done) {
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.addEventListener('change', () => {
        task.done = true;
        render();
      });
      li.appendChild(cb);
    }

    const body = document.createElement('div');
    body.className = 'task-body';
    body.innerHTML = '<span class="task-text"></span><span class="task-date"></span>';
    body.querySelector('.task-text').textContent = task.text;
    body.querySelector('.task-date').textContent = task.date;
    body.addEventListener('dblclick', () => startEdit(task, li));
    li.appendChild(body);

    // Видалення
    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = '×';
    del.title = 'Видалити';
    del.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      render();
    });
    li.appendChild(del);

    list.appendChild(li);
  });
}

// Редагування: замість пункту — <input>
function startEdit(task, li) {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = task.text;

  let finished = false;
  const finish = (save) => {
    if (finished) return;
    finished = true;
    const value = editInput.value.trim();
    if (save && value) task.text = value;
    render();
  };

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish(true);
    if (e.key === 'Escape') finish(false);
  });
  editInput.addEventListener('blur', () => finish(false));

  li.replaceChildren(editInput);
  editInput.focus();
  editInput.select();
}

render();