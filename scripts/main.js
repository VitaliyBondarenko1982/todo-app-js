'use strict';

createTodoApp(document.getElementById('todo-app'));

function createTodoApp(element, todos = []) {
  render();

  element.addEventListener('submit', (evt) => {
    if (!evt.target.closest('.todo-app__form')) {
      return;
    }

    evt.preventDefault();

    const fieldElement = element.querySelector('.todo-app__field');

    addTodo(fieldElement.value);
  });

  element.addEventListener('change', (evt) => {
    const todoElement = evt.target.closest('.todo-app__item');

    if (!todoElement) {
      return;
    }

    const todoId = +todoElement.dataset.id;
    const todo = todos.find(item => item.id === todoId);

    todo.completed = evt.target.checked;
    render();
  });

  element.addEventListener('click', (evt) => {
    const todoElement = evt.target.closest('.todo-app__item');
    const todoId = +todoElement.dataset.id;

    if (evt.target.tagName !== 'SPAN') {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    todos = todos.filter(todo => todo.id !== todoId);
    render();
  });

  function render() {
    const unfinishedTodos = todos.filter(todo => !todo.completed);

    element.innerHTML = `
    <div class="todo-app">
      <form class="todo-app__form">
        <label> Please, write down your todo:
          <input type="text" class="todo-app__field">
        </label>
      </form>
      <ul class="todo-app__list">
        ${todos.map(todo => `
          <li class="todo-app__item" data-id="${todo.id}">
            <label>
              <input type="checkbox" ${todo.completed ? 'checked' : ''} />
              ${todo.title}
            </label>
            <span class="todo-app__remove">x</span>
          </li>
        `).join('')}
      </ul>
      <p class="todo-app__info">
        Items left ${unfinishedTodos.length} of ${todos.length}
      </p>
    </div>
  `;
  }

  function addTodo(title) {
    const todo = {
      id: todos.length + 1,
      title: title,
      completed: false,
    };

    todos.push(todo);

    render();
  }
}
