/*jshint esversion: 8 */


var count = 0;
var pageCount = 0;
var item_per_row = 4;
var cardHTML;
var request = new XMLHttpRequest();
request.open('GET', './cards.json', true);
var carouselDiv;
var rowDiv;
$(".sortable").sortable();
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success! Her is the fire
    var data = JSON.parse(request.responseText);
    var h1heading = document.getElementById("h1Tcg");
    h1heading.innerHTML = "Welcome to your card collection, " + data.username + "!";
    data.characters.forEach(async function (value) {
      console.log("WITHIN FOREACH --->>>" + value.url);

      /*optional stuff to do after success */
      if (pageCount === 0 && count === 0) { // Start of a row
        carouselDiv = document.createElement("div");
        carouselDiv.className = 'carousel-item active';
        rowDiv = document.createElement("div");
        rowDiv.className = 'row';
        carouselDiv.appendChild(rowDiv);
        document.getElementById("multi-item-cards-inner").appendChild(carouselDiv);
      }
      if (pageCount > 0 && count === 0) { // Start of a row
        carouselDiv = document.createElement("div");
        carouselDiv.className = 'carousel-item';
        rowDiv = document.createElement("div");
        rowDiv.className = 'row';
        carouselDiv.appendChild(rowDiv);
        document.getElementById("multi-item-cards-inner").appendChild(carouselDiv);
      }
      var colDiv = document.createElement("div");
      colDiv.className = 'col-md-3';
      rowDiv.appendChild(colDiv);
      var image = document.createElement("img");
      image.src = value.url;
      image.className = "card-img-top";
      colDiv.appendChild(image);
      cardHTML = document.createElement("div");
      cardHTML.className = 'card-body';
      colDiv.appendChild(cardHTML);
      var h5Title = document.createElement("h5");
      h5Title.className = 'card-title';
      h5Title.textContent = value.name;
      cardHTML.appendChild(h5Title);
      var para = document.createElement("p");
      para.className = 'card-text';
      para.innerHTML = "Race: " + value.race + "<br />Battle Points: " + value.battlepoints + "<br />Card ID: " + value.id;
      cardHTML.appendChild(para);

      count++;
      if (count === item_per_row) { // End of row
        count = 0;
        pageCount++;

      }

    });

  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function () {
  // There was a connection error of some sort
};

request.send();