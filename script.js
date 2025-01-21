let items = ["adrian", "jose", "pepe"];
// itemContainer = document.getElementById('#itemContainer');

document.addEventListener("DOMContentLoaded", () => {
  stringItems = JSON.stringify(items);
  localStorage.setItem("items", stringItems);

  const itemForm = document.getElementById("itemForm");
  itemForm.addEventListener("submit", handleSubmit);

  loadItems(JSON.parse(localStorage.getItem("items")));
});

function loadItems(items) {
  document.querySelector("#itemContainer").innerHTML = "";
  items.forEach((item, index) => {
    addItemList(index, item);
  });
}

function onEdit(index) {
  lsItems = JSON.parse(localStorage.getItem("items"));

  value = lsItems[index]

  const editForm = document.createElement("form");
  editForm.dataset.index = index;
  editForm.innerHTML = `
            <input name="newvalue" type="text" value="${value}">
            <input type="submit" value="save"></input>
  `;
  const itemElement = document.getElementById(`${index}`);
  itemElement.append(editForm);

  editForm.addEventListener("submit", handleEdit);
}

function handleEdit(e) {
  e.preventDefault();

  index = e.target.dataset.index;
  value = e.target.newvalue.value;
  console.log(`index: ${index}, value ${value}`);

  lsItems = JSON.parse(localStorage.getItem("items"));
  lsItems[index] = value;

  localStorage.setItem("items", JSON.stringify(lsItems));

  loadItems(lsItems);
}

function handleSubmit(e) {
  e.preventDefault();
  let inputField = document.getElementById("rawInput");
  let input = inputField.value.trim();

  // si es mayor que cero se agrega al array
  if (input.length > 0) {
    index = items.length + 1;
    lsItems = JSON.parse(localStorage.getItem('items'));
    lsItems.push(input)
    localStorage.setItem('items', JSON.stringify(lsItems))
    loadItems(lsItems)
  }
}

function onDelete(index) {
  console.log(`on delete ${index}`);

  lsItems = JSON.parse(localStorage.getItem("items"));

  lsItems.splice(index, 1);

  localStorage.setItem("items", JSON.stringify(lsItems));

  console.log(localStorage.getItem('items'));

  loadItems(lsItems);
}

function addItemList(index, input) {
  let newItem = document.createElement("div");
  newItem.className = "singleItem";
  newItem.id = index;
  newItem.innerHTML = `
        <div class="details">
            <p id="item-${index}">${input}</p>
            <button onclick="onDelete(${index})">Delete</button>
            <button onclick="onEdit(${index})">Edit</button>
        </div>
        `;
  document.querySelector("#itemContainer").append(newItem);
}
