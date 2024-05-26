const taskInput = document.querySelector("#task-input");
const submitBtn = document.querySelector("#submit-btn");
const formAlert = document.querySelector(".form-alert");
const tasksContainer = document.querySelector(".tasks-container");
const loading = document.querySelector(".loading");

const deleteTask = async (e) => {
  const _id = e.target.parentElement.dataset.id;
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );
  if (confirmed) {
    try {
      await axios.delete(`/api/v1/tasks/${_id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
};

const submitForm = async () => {
  const name = taskInput.value;
  try {
    await axios.post("/api/v1/tasks", { name });
    showTasks();
    taskInput.value = "";
    formAlert.textContent = `Task added successfully !`;
    formAlert.classList.remove("error");
    formAlert.classList.add("success");
  } catch (error) {
    formAlert.classList.remove("success");
    formAlert.classList.add("error");
    formAlert.textContent = `Error , please try again !`;
  }
  formAlert.style.display = "block";
  setTimeout(() => {
    formAlert.style.display = "none";
    formAlert.classList.remove("error", "success");
  }, 1500);
};
submitBtn.addEventListener("click", submitForm);

const showTasks = async () => {
  loading.style.visibility = "visible";
  try {
    const res = await axios.get("/api/v1/tasks");
    const tasks = res.data.tasks;
    if (tasks < 1) {
      loading.style.visibility = "hidden";
      tasksContainer.innerHTML = `<h5 class='empty-tasks'> No tasks in your list .. <i class="fas fa-box-open"></i></h5>`;
      return;
    }

    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskId, name } = task;
        return `<div class="single-task ${completed ? "taskCompleted" : ""}">
      <h5><i class="far fa-check-circle "></i> <span>${name}</span></h5>
      <div class="task-btns">
        <a href="task.html?id=${taskId}" title="edit" class="edit-btn">
          <i class="fas fa-edit"></i>
        </a>
        <button type="button" class="delete-btn" title="delete" data-id=${taskId}>
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      
      })
      .join("");
    tasksContainer.innerHTML = allTasks;
    const deleteButtons = document.querySelectorAll(".delete-btn");

    // Add event listener to each delete button
    deleteButtons.forEach((button) => {
      button.addEventListener("click", deleteTask);
    });

  } catch (error) {
    console.log(error.message);
    tasksContainer.innerHTML =
      '<h5 class="empty-tasks"><i class="fas fa-exclamation-triangle"></i> Error, please try again later....</h5>';
  }
  loading.style.visibility = "hidden";
};
showTasks();
