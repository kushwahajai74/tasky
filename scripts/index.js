const state = {
  taskList: [],
};

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({ id, title, description, type, url }) => `
  <div class = "col-md-6 col-lg-4 mt-3" id=${id} key = ${id}>
    <div class = "card shadow-sm task__card">
      <div class="card-header d-flex justify-content-end task__card__header">
        <button type ='button' class = 'btn btn-outline-info mx-3' name = ${id}>
          <i class = 'fas fa-pencil-alt' name=${id}></i>
        </button>
        <button type ='button' class = 'btn btn-outline-danger' name = ${id} onclick="deleteTask.apply(this, arguments)">
          <i class = 'fas fa-trash-alt' name=${id}></i>
        </button>
      </div>
      <div class = "card-body">
        ${
          url
            ? `<img width='100%' src=${url} alt='card image caption' class ="card-image-top md-3 rounded-lg" />`
            : ` <img width='100%'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKPQdgJiGKhn9yoMvJQGqHCiV0b5XECl93GkNiHCbjudAZi2TuZD2CgDBjQifNAUgynVg&usqp=CAU"
            alt='card image caption' class ="card-image-top md-3 rounded-lg" />`
        }
        <h4 class = 'task__card___title'>${title}</h4>
        <p class="description trim-3-lines text-muted" data-gram_editor='false>${description}</p>
        <div clas='tags text-white d-flex flex-wrap'>
          <span class ='badge bg-primary m-1'>${type} </span>
        </div>
        <div class='card-footer'>
          <button type='button' class ='btn btn-outline-primary float-right'
          data-bs-toggle='modal'
          data-bs-target='#showTask'
          id =${id}
          onclick = 'openTask.apply(this, arguments)'
          >Open Task</button>
        </div>
      </div>

    </div>
  </div>
`;

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
  <div id = ${id}>
  ${
    url
      ? `<img width='100%' src=${url} alt='card image caption' class ="img-fluid place__holder__image mb-3" />`
      : `<img width='100%' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKPQdgJiGKhn9yoMvJQGqHCiV0b5XECl93GkNiHCbjudAZi2TuZD2CgDBjQifNAUgynVg&usqp=CAU"
        alt='card image caption' class ="img-fluid place__holder__image mb-3" />`
  }
  <strong class = 'text-sm test-muted'> Created On ${date.toDateString()}</strong>
  <h2 class = 'my-3'>${title}</h2>
  <p class = 'Lead'>
  ${description}
  </p>
  </div>
  `;
};

const updateLocalStorage = () => {
  localStorage.setItem(
    "tasks",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.tasks);
  if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  state.taskList.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
};

const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    type: document.getElementById("tags").value,
  };
  if (input.title === "" || input.description === "" || input.type === "") {
    return alert("Please fill all fields");
  }
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
    })
  );
  state.taskList.push({ ...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

const deleteTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;
  console.log(type);
  const removeTask = state.taskList.filter(({ id }) => id !== targetID);
  state.taskList = removeTask;
  updateLocalStorage();
  if (type === "BUTTON") {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};

const editTask = (e) => {
  if (!e) window.event;

  const targetID = e.target.id;
  const type = e.targe.tagName;

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if(type === "BUTTON")
    parentNode  = 
};
