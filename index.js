//select items
var input = document.getElementById("input");
var btn = document.getElementById("btn");
var list = document.getElementById("list-id");
var saveBtn = document.getElementById("save-btn");
var data = [];
var data2 = [];
//function to generate radom ids for checkbox
function generateUniqueID() {
  return `checkbox-${Math.random()}`;
}
//events
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("Write something");
  } else {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let checkboxID = generateUniqueID();
    checkbox.id = checkboxID;
    let div = document.createElement("div");
    div.appendChild(checkbox);
    let text = document.createElement("p");
    text.innerHTML = input.value;
    data.push({ text: input.value, checked: false, id: checkboxID });
    input.value = "";
    let cross = document.createElement("span");
    cross.innerHTML = "&times;";
    text.appendChild(cross);
    div.appendChild(text);
    list.appendChild(div);
  }
});
list.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    const checkboxID = e.target.parentElement.parentElement.children[0].id;
    updateCheckedState(checkboxID, false);
    //when removing we also making sure that the checked is false so when fitering we will not get this value again
    e.target.parentElement.parentElement.remove();
    updateData();
  } else if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    //because we cannot acess the checkkbox, i.e. the check function onclick will not work when we are adding event listener to the "list". we have to make it manually,
    //that on click ,the checkbox gets checked.
    const checkboxID = e.target.id;
    updateCheckedState(checkboxID, e.target.checked);
  }
});
function updateData() {
  //storing only the checked datas only in a new array data2. we cannot update the same array because if we do, then the next filter will be done with
  //wrong data
  data2 = data.filter((item) => item.checked);
  console.log("modified", data2);
}
//function to update checked state.
function updateCheckedState(checkboxID, checked) {
  data.map((item) => {
    if (item.id === checkboxID) {
      return (item.checked = checked);
    }
  });
}
//on click savebtn updated to localStorage
saveBtn.addEventListener("click", () => {
  updateData();
  localStorage.setItem("items", JSON.stringify(data2));
});
