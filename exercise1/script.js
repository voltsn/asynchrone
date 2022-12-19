
const btn = document.querySelector("#ex1 button");

btn.addEventListener("click", () => {
  loadText().catch((error) => {
    console.error("Something went wrong", error);
  });
});

async function loadText() {
  const response = await fetch("./data.json");
  const data = await response.json();
 
  list = createList(data.text);
  document.querySelector("#ex1").insertBefore(list, btn);
}

const createList = (textArray) => {
  const list = document.createElement("ul");
  for (let text of textArray){
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(text));

    list.appendChild(listItem);
  }

  return list;
}
