let addTaskBtn = document.querySelector(".add-task-btn");
let formContainer = document.querySelector(".form-container");
let form = document.querySelector("form");
let formInput = document.querySelector("#form-input");
let formPriority = document.querySelector("#form-priority");
let formDate = document.querySelector("#form-date");
let formTextArea = document.querySelector("#form-textarea");
let submitBtn = document.querySelector(".form-submit");
let cancelBtn = document.querySelector(".form-cancel");
let resetBtn = document.querySelector(".form-reset");
let taskList = document.querySelector(".task-list");

addTaskBtn.addEventListener("click", () => {
  form.reset();
  addTaskBtn.classList.add("hide");
  formContainer.classList.remove("hide");
});

//task reset
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
});

//task cancel
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("hide");
  addTaskBtn.classList.remove("hide");
});

//task submit
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTaskBtn.classList.remove("hide");
  //creating task and adding it
  formContainer.classList.add("hide");
  let task = document.createElement("div");
  task.classList.add("task");
  taskList.appendChild(task);

  let taskContent = document.createElement("div");
  taskContent.classList.add("task-content");
  task.appendChild(taskContent);

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");
  taskContent.appendChild(checkBox);

  let taskName = document.createElement("input");
  taskName.classList.add("task-name");
  taskName.setAttribute("readonly", "readonly");
  taskContent.appendChild(taskName);
  taskName.value = formInput.value;

  let taskButtonsContainer = document.createElement("div");
  taskButtonsContainer.classList.add("task-buttons-container");
  taskContent.appendChild(taskButtonsContainer);

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit-button", "task-buttons");
  editBtn.innerHTML = "EDIT";
  taskButtonsContainer.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-button", "task-buttons");
  deleteBtn.innerHTML = "DELETE";
  taskButtonsContainer.appendChild(deleteBtn);

  let taskDetail = document.createElement("div");
  taskDetail.classList.add("task-detail");
  task.appendChild(taskDetail);

  let taskPriorityContainer = document.createElement("div");
  taskDetail.appendChild(taskPriorityContainer);

  let taskPriority = document.createElement("span");
  taskPriority.value = formPriority.value;
  taskPriority.innerHTML = `Priority : ${taskPriority.value} `;
  taskPriorityContainer.appendChild(taskPriority);

  let taskDateContainer = document.createElement("div");
  taskDetail.appendChild(taskDateContainer);

  let taskDueDate = document.createElement("span");
  taskDueDate.value = formDate.value;
  dateSetter(taskDueDate, formDate);
  taskDateContainer.appendChild(taskDueDate);

  let detailTag = document.createElement("details");
  task.appendChild(detailTag);

  let taskDetailText = document.createElement("textarea");
  taskDetailText.classList.add("textarea", "task-detail-text");
  taskDetailText.setAttribute("readonly", "readonly");
  taskDetailText.innerText = formTextArea.value;
  detailTag.appendChild(taskDetailText);

  //event listeners for created checkbox
  checkBox.addEventListener("click", () => {
    checkBox.classList.toggle("checked");
    taskName.classList.toggle("line-through");
    taskPriority.classList.toggle("line-through");
    taskDueDate.classList.toggle("line-through");
    detailTag.classList.toggle("line-through");
    taskDetailText.classList.toggle("line-through");
  });

  //event listeners for created delete button
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(task);
  });
  //event listeners for created edit button
  editBtn.addEventListener("click", () => {
    checkBox.classList.remove("checked");
    taskName.classList.remove("line-through");
    taskPriority.classList.remove("line-through");
    taskDueDate.classList.remove("line-through");
    detailTag.classList.remove("line-through");
    taskDetailText.classList.remove("line-through");

    if (editBtn.innerText == "EDIT") {
      editBtn.innerText = "Save";
      taskName.removeAttribute("readonly");
      taskDetailText.removeAttribute("readonly");
      detailTag.open = true;
      taskName.focus();
      let iTagPriority = document.createElement("i");
      let iTagDate = document.createElement("i");
      iTagPriority.classList.add("fa-solid", "fa-pen-to-square");
      iTagDate.classList.add("fa-solid", "fa-pen-to-square");
      taskPriority.insertAdjacentElement("afterend", iTagPriority);
      taskDueDate.insertAdjacentElement("afterend", iTagDate);
      editBtn.iTagPriority = iTagPriority;
      editBtn.iTagDate = iTagDate;
      //edit priority
      iTagPriority.addEventListener("click", () => {
        iTagPriority.classList.add("hide");
        taskPriority.innerHTML = `Priority : `;
        let newSelect = document.createElement("select");
        newSelect.classList.add("form-priority");
        taskPriority.insertAdjacentElement("afterend", newSelect);
        let options = ["None", "Low", "Medium", "High"];
        options.forEach((option) => {
          let newOption = document.createElement("option");
          newOption.value = option;
          newOption.innerText = option;
          newSelect.appendChild(newOption);
        });
        newSelect.value = taskPriority.value;
        editBtn.newSelect = newSelect; //saving reference for later deletion
        //event listener for created select
        newSelect.addEventListener("change", () => {
          iTagPriority.classList.remove("hide");
          newSelect.classList.add("hide");
          taskPriority.value = newSelect.value;
          taskPriority.innerHTML = `Priority : ${taskPriority.value} `;
        });
      });
      //edit date
      iTagDate.addEventListener("click", () => {
        iTagDate.classList.add("hide");
        taskDueDate.innerHTML = "Due-Date : ";
        let calendar = document.createElement("input");
        calendar.type = "date";
        calendar.value = taskDueDate.value;
        calendar.classList.add("form-date");
        taskDueDate.insertAdjacentElement("afterend", calendar);
        editBtn.calendar = calendar; //saving reference for later deletion

        //event listener for created calendar
        calendar.addEventListener("change", () => {
          iTagDate.classList.remove("hide");
          calendar.classList.add("hide");
          dateSetter(taskDueDate, calendar);
        });
      });
    } else {
      editBtn.innerText = "Edit";
      taskName.setAttribute("readonly", "readonly");
      taskDetailText.setAttribute("readonly", "readonly");
      detailTag.open = false;
      dateSetter(taskDueDate, taskDueDate);
      taskPriority.innerHTML = `Priority : ${taskPriority.value} `;
      editBtn.iTagPriority.remove();
      editBtn.iTagDate.remove();
      editBtn.calendar.remove();
      if (editBtn.newSelect) {
        editBtn.newSelect.remove();
      }
    }
  });
});

function dateSetter(taskDueDate, datePicker) {
  if (datePicker.value == undefined || datePicker.value == "") {
    taskDueDate.innerText = `Due-Date : Not set `;
  } else {
    taskDueDate.innerText = `Due-Date : ${datePicker.value} `;
    taskDueDate.value = datePicker.value;
  }
}

window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};

