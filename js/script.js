const tasks = [];

const addNewTask = (newTaskContent) => {
  tasks.push({ content: newTaskContent });
  render();
};

const removeTask = (taskIndex) => {
  tasks.splice(taskIndex, 1);
  render();
};

const toggleTaskDone = (taskIndeks) => {
  tasks[taskIndeks].done = !tasks[taskIndeks].done;
  render();
};

const bindEvents = () => {
  const removeButtons = document.querySelectorAll(".js-remove");
  removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener("click", () => {
      removeTask(index);
    });
  });

  const doneButtons = document.querySelectorAll(".js-done");
  doneButtons.forEach((doneButton, index) => {
    doneButton.addEventListener("click", () => {
      toggleTaskDone(index);
    });
  });
};

const render = () => {
  let htmlString = "";
  for (const task of tasks) {
    htmlString += `
       <li class="list__items">

          <button class="js-done list__buttons list__buttons--done">${task.done ? "✓" : ""}</button>
            
          <span class="list__itemsText${task.done ? " list__itemsText--done" : ""}">${task.content}</span>

          <button class="js-remove list__buttons list__buttons--delete">⩂</button>

       </li>
     `;
  }
  document.querySelector(".js-tasks").innerHTML = htmlString;
  bindEvents();
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const inputField = document.querySelector(".js-newTask");
  const newTaskContent = inputField.value.trim();

  inputField.focus();

  if (newTaskContent === "") {
    return;
  }

  addNewTask(newTaskContent);
  inputField.value = "";
};

const init = () => {
  render();
  const form = document.querySelector(".js-form");
  form.addEventListener("submit", onFormSubmit);
};

init();
