const taskId = document.getElementById("taskId");
const taskNameEdit = document.getElementById("taskName");
const completedEdit = document.getElementById("isCompleted");
const editSubmitBtn = document.getElementById("edit-btn");
const editAlert = document.querySelector(".edit-alert");
const params = window.location.search;
const loading = document.querySelector(".loading");
// console.log(params);
const URLid = new URLSearchParams(params).get("id");
// console.log(URLid);
// taskId.value = URLid;
let originalTask;
const showTask = async () => {
  loading.style.visibility = "visible";
  try {
    const task = await axios.get(`/api/v1/tasks/${URLid}`);
    const { _id: task_Id, completed, name } = task.data;
    taskId.value = task_Id;
    taskNameEdit.value = name;
    originalTask = name;
    if (completed) {
      completedEdit.checked = true;
    }
    loading.style.visibility = "hidden";
  } catch (error) {
    console.log(error);
    loading.style.visibility = "hidden";
  }
};
showTask();

const editTask = async () => {
  try {
    const taskName = taskNameEdit.value;
    const taskCompleted = completedEdit.checked;
    await axios.patch(`/api/v1/tasks/${URLid}`, {
      name: taskName,
      completed: taskCompleted,
    });
    showTask();
    editAlert.style.display = "block";
    editAlert.textContent = `Edit successfully !`;
    editAlert.classList.add("success");
    editAlert.classList.remove("error")
  } catch (error) {
    taskNameEdit.value = originalTask;
    editAlert.style.display = "block";
    editAlert.textContent = `Error, please try again ..`;
    editAlert.classList.add("error");
    editAlert.classList.remove('success');
  }
   setTimeout(() => {
     editAlert.style.display = "none";
     editAlert.classList.remove("error", "success");
   }, 1500);
};

editSubmitBtn.addEventListener("click", editTask);
