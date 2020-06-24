const form = document.querySelector(".header");
const groceryInput = document.getElementById("grocery-input");
const submitBtn = document.querySelector(".header__button");
const groceryList = document.querySelector(".grocery__list");
const clearBtn = document.querySelector(".grocery__clear-btn");
const alert = document.querySelector(".header__alert");
const groceryListBackground = document.querySelector(
  ".grocery__list-background"
);

//editing
let editElement;
let editFlag = false;
let editID = "";

// event listeners
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
// load items
window.addEventListener("DOMContentLoaded", setupItems);

// functions
function addItem(e) {
  e.preventDefault();
  const value = groceryInput.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);
    clearBtn.classList.add("grocery__clear-btn--show");
    // add to local storage
    addToLocalStorage(id, value);
    //remove bg
    groceryListBackground.classList.add("grocery__list-background--hide");
    // set back to default
    setBackToDefault();
    displayAlert("Item added to the list", "success");
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Item changed", "success");
    highlightElem(editElement.parentElement);
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter a value", "danger");
  }
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`header__alert--${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`header__alert--${action}`);
  }, 1000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery__item");
  if (items.length) {
    items.forEach((item) => {
      groceryList.removeChild(item);
    });
    clearBtn.classList.remove("grocery__clear-btn--show");
    displayAlert(`Removed all items`, "danger");
    //remove bg
    groceryListBackground.classList.remove("grocery__list-background--hide");
    setBackToDefault();
    localStorage.removeItem("list");
  }
}

// delete element
function deleteItem(e) {
  const element = e.currentTarget.parentNode.parentNode;
  const id = element.dataset.id;
  element.remove();
  if (groceryList.children.length <= 1) {
    clearBtn.classList.remove("grocery__clear-btn--show");
  }
  displayAlert(`Item removed`, "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}

// edit element

function editItem(e) {
  const element = e.currentTarget.parentNode.parentNode;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  groceryInput.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "Edit item";
}

// set back to default
function setBackToDefault() {
  groceryInput.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Add Item";
}

// highlight the element when added or edited
function highlightElem(element) {
  element.classList.add("grocery__item--added");
  setTimeout(function () {
    element.classList.remove("grocery__item--added");
  }, 1000);
}

// local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// setup items
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    groceryListBackground.classList.add("grocery__list-background--hide");
    clearBtn.classList.add("grocery__clear-btn--show");
  }
}

function createListItem(id, value) {
  const element = document.createElement("li");
  element.classList.add("grocery__item");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="grocery__item-text">${value}</p>
    <div class="grocery__item-btn-container">
      <button class="grocery__item-btn grocery__item-btn--edit"><i class="fas fa-pen" title="Edit Item"></i>
      </button>
      <button class="grocery__item-btn grocery__item-btn--delete">
        <i class="fas fa-times-circle" title="Delete Item"></i>
      </button>
    </div>`;
  const deleteBtn = element.querySelector(".grocery__item-btn--delete");
  const editBtn = element.querySelector(".grocery__item-btn--edit");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);
  groceryList.appendChild(element);
  highlightElem(element);
}
