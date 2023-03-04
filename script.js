var histroy = JSON.parse(localStorage.getItem("histroy") || "[]");
var searched = JSON.parse(localStorage.getItem("searched") || "[]");

var searchingNow = document.getElementById("searchingNow");
let histroyBtn = document.getElementById("histroyBtn");

searchingNow.addEventListener("click", searchingData);

function searchingData() {
  var searchingInput = document.getElementById("searchingInput").value;
  let str = searchingInput.split(" ");
  let dateAndTime = getTime();
  console.log(searchingInput, str);
  if (searchingInput != "") {
    let items = {
      text: searchingInput,
      time: dateAndTime,
    };
    histroy.push(items);
    localStorage.setItem("histroy", JSON.stringify(histroy));
    let url =
      "https://www.googleapis.com/books/v1/volumes?q=" + str[0] + str[1];

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // let dataitems = data;
        searched.push(data);
        localStorage.setItem("searched", JSON.stringify(searched));
        fetchdata(data);
      })
      .catch((error) => console.log(error));
  } else {
    alert("fill the input box");
  }
}

function getTime() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const dateandtime = `${day}/${month + 1}/${year} at ${hour + 1}:${
    minutes + 1
  }`;

  return dateandtime;
}

function fetchdata(data) {
  let output = document.getElementById("output");
  var searchingInput = document.getElementById("searchingInput").value;
  let outputText = document.getElementById("outputText");
  let searched = document.getElementById("searchingInOut");
  output.innerHTML = ""
  outputText.style.display = "block";
  histroyBtn.style.visibility = "visible";
  searched.innerHTML = searchingInput;
  for (let i = 0; i < data.items.length; i++) {
    let item = `
            <div class="container">
            <img src="${data.items[i].volumeInfo.imageLinks.smallThumbnail}" alt="img">
            <div>Title: ${data.items[i].volumeInfo.title}</div>
            <div>Author: ${data.items[i].volumeInfo.authors}</div>
            <div>PageCount: ${data.items[i].pageCount}</div>
            <div>Publisher: ${data.items[i].volumeInfo.publisher}</div>
            <div><button class="btn2">Buy Now</button></div>
        </div>`;

    output.innerHTML += item;
  }
}

histroyBtn.onclick = () => {
  window.location.href = "history.html";
};
