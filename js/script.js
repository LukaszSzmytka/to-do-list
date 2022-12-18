{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const hideAllDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const doneButtons = document.querySelectorAll(".js-done");

    doneButtons.forEach((doneButton, taskIndex) => {
      doneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  bindButtonsEvents = () => {
    if (tasks.length !== 0) {
      const hideAllDoneButton = document.querySelector(".js-hideAllDone");

      hideAllDoneButton.addEventListener("click", () => {
        hideAllDoneTasks();
      });

      const toggleAllDoneButton = document.querySelector(".js-toggleAllDone");

      toggleAllDoneButton.addEventListener("click", () => {
        toggleAllTasksDone();
      });
    }
  };

  const renderTasks = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
    <li class="list__items${task.done && hideDoneTasks === true ? " list__items--hidden" : ""}">

    <button class="js-done list__buttons list__buttons--done">${task.done ? "✓" : ""}</button>
      
    <span class="list__itemsText${task.done ? " list__itemsText--done" : ""}">${task.content}</span>

    <button class="js-remove list__buttons list__buttons--delete">⩂</button>
    </li>
     `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlButtons = "";
    if (tasks.length !== 0) {
      htmlButtons += `
  <button class="js-hideAllDone section__hideButton">${hideDoneTasks === false ? "Ukryj" : "Pokaż"} ukończone</button>
  
  <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="js-toggleAllDone section__doneButton">Ukończ wszystkie</button>
  `;
   }
    document.querySelector(".js-buttons").innerHTML = htmlButtons;
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindButtonsEvents();
    bindRemoveEvents();
    bindToggleDoneEvents();
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
}
