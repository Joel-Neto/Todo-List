/* --- Initialization --- */

const todoInput = document.getElementById("new-todo-input");
const newTodoBtn = document.getElementById("new-todo-button");
const thingsTodoContainer = document.getElementById("things-todo-container");

/* --- Functions --- */

const validateInput = () => todoInput.value.trim().length > 0;

const handleAddTask = () => {
  const isInputValid = validateInput();

  console.log(isInputValid);

  if (!isInputValid) {
    return todoInput.classList.add("invalid");
  }

  const thingTodoItem = document.createElement("div");
  thingTodoItem.classList.add("todo-item");

  const thingTodoText = document.createElement("p");
  thingTodoText.innerHTML = `<i class="fa-solid fa-circle"></i><span>${todoInput.value}</span>`;

  const finishThingTodoBtn = document.createElement("button");
  finishThingTodoBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  finishThingTodoBtn.classList.add("todo-btn");

  finishThingTodoBtn.addEventListener("click", handleFinishTodo);

  const removeThingTodoBtn = document.createElement("button");
  removeThingTodoBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  removeThingTodoBtn.classList.add("todo-btn");

  removeThingTodoBtn.addEventListener("click", handleRemove);

  thingTodoItem.append(thingTodoText, finishThingTodoBtn, removeThingTodoBtn);
  thingsTodoContainer.appendChild(thingTodoItem);

  todoInput.value = "";
  todoInput.classList.remove("invalid");

  updateToLocalStorage();
};

const handleInputChange = () => {
  const isInputValid = validateInput();

  if (isInputValid) {
    return todoInput.classList.remove("invalid");
  }
};

const handleFinishTodo = (event) => {
  const finishBtn = event.target;
  const finishBtnParent = finishBtn.parentNode;

  finishBtnParent.classList.toggle("done");

  updateToLocalStorage();
};

const handleRemove = (event) => {
  const removeBtn = event.target;
  const removeBtnParent = removeBtn.parentNode;

  removeBtnParent.remove();

  updateToLocalStorage();
};

const updateToLocalStorage = () => {
  const todos = thingsTodoContainer.childNodes;

  const localStorageTodos = [...todos].map((task) => {
    const taskContent = task.firstChild;
    const isTaskDone = task.classList.contains("done");

    return { content: taskContent.textContent, isTaskDone };
  });

  window.localStorage.setItem("todos", JSON.stringify(localStorageTodos));
};

const refreshTodoListUsingLocalStorage = () => {
  const todosFromLocalStorage = JSON.parse(
    window.localStorage.getItem("todos")
  );

  if (todosFromLocalStorage) {
    for (let todo of todosFromLocalStorage) {
      const thingTodoItem = document.createElement("div");
      thingTodoItem.classList.add("todo-item");

      if (todo.isTaskDone) {
        thingTodoItem.classList.add("done");
      }

      const thingTodoText = document.createElement("p");
      thingTodoText.innerHTML = `<i class="fa-solid fa-circle"></i><span>${todo.content}</span>`;

      const finishThingTodoBtn = document.createElement("button");
      finishThingTodoBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
      finishThingTodoBtn.classList.add("todo-btn");

      finishThingTodoBtn.addEventListener("click", handleFinishTodo);

      const removeThingTodoBtn = document.createElement("button");
      removeThingTodoBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      removeThingTodoBtn.classList.add("todo-btn");

      removeThingTodoBtn.addEventListener("click", handleRemove);

      thingTodoItem.append(
        thingTodoText,
        finishThingTodoBtn,
        removeThingTodoBtn
      );

      thingsTodoContainer.appendChild(thingTodoItem);
    }
  }
};

refreshTodoListUsingLocalStorage();

const handleKeyDownBtn = (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
};

/* --- Events --- */

newTodoBtn.addEventListener("click", handleAddTask);
todoInput.addEventListener("change", handleInputChange);
todoInput.addEventListener("keydown", handleKeyDownBtn);
