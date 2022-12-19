const display = document.querySelector("#display");
const nameInput = document.querySelector("#name-input");
const countryInput = document.querySelector("#country-input");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", () => {
  //  Sets localData to empty array if the localStorage is empty
  const localData = JSON.parse(localStorage.getItem("agify")) || [];
  const name = nameInput.value;
  const countryID = countryInput.value;

  if (localData.length === 0){
    getAge(name, countryID).catch((error) => console.log("Something went wrong", error));
    return;
  }

  //  Check if the query has been made in past
  for (let data of localData){
    if (data.name === name && data.country_id === countryID){
      displayResult(data);
      return;
    }
  }

  getAge(name, countryID).catch((error) => console.log("Something went wrong", error));

});

async function getAge(name, countryID){
  const response = await fetch(`https://api.agify.io?name=${name}&country_id=${countryID}`);
  const data = await response.json();
  save(data);
  displayResult(data);
}

// Add data into the DOM
const displayResult = (result) => {
  const div = formatResult(result);
  display.appendChild(div);
}

// Format data in HTML
const formatResult = (data) => {
  const div = document.createElement("div");
  const content = `
    <p>
      Name: ${data.name}
    </p>
    <p>
      Location: ${data.country_id}
    <p>
      Age: ${data.age},
    </p>
    <p>
      Number of people with the same name: ${data.count}
    </p>
    <hr>
  `
  div.innerHTML = content;
  return div;
}

// Save api response in local storage
const save = (data) => {
  localData = JSON.parse(localStorage.getItem("agify")) || [];
  localData.push(data);

  localStorage.setItem("agify", JSON.stringify(localData));
}
