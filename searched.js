let searchedOutput = document.getElementById("searchedOutput");
var searched = JSON.parse(localStorage.getItem("searched") || "[]");
var index = JSON.parse(localStorage.getItem("index") || "[]");
var histroy = JSON.parse(localStorage.getItem("histroy") || "[]");

let i = Number(index.length - 1);
console.log("i", i, "index", index.length);
let x = index[i].ind;
console.log("x", x);
console.log(searched[x]);
console.log(searched[i]);

fetchdata(searched[x]);
loadList(histroy[x]);

function loadList(data) {
  console.log(data);
  var hisdata = document.getElementById("hisdata");
  hisdata.innerHTML = "";
  let item = `
        <li>
        <div class="left">
        1. ${data.text.toUpperCase()}
        </div>
        <div class="right">
          Searched on: ${data.time}
        </div>
        </li>`;

  hisdata.innerHTML = item;
}

function fetchdata(data) {
  let output = document.getElementById("output");
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