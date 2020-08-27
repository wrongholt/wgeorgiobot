/*jshint esversion: 8 */


var count = 0;
var uncommonCount = 0;
var rareCount = 0;
var cardHTML;
var request = new XMLHttpRequest();
request.open('GET', './cards.json', true);
var carouselDiv;
var rowDiv;
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {

    var data = JSON.parse(request.responseText);
    var h1heading = document.getElementById("h1Tcg");
    h1heading.innerHTML = "Welcome to your card collection, " + data.username + "!";
    var totalCount = Object.keys(data.characters).length;
    var h3Total = document.getElementById("totalCount");
    h3Total.innerHTML = "Total Cards: " + totalCount;
    var uniqueCout = [...new Set(data.characters.map(x => x.id))];
    var h3Unique = document.getElementById("uniqueCount");
    h3Unique.innerHTML = "Total Singles: " + uniqueCout.length;

    data.characters.forEach(async function (value) {
      console.log("WITHIN FOREACH --->>>" + value.rarity);

      if (value.rarity === "common"){
        var everyForth = (count % 4);

        if(count === 0){
         tabCommon = document.createElement("div");
        tabCommon.className = "tab-pane fade show active";
        tabCommon.id = "commonTab";
        document.getElementById("multi-item-cards-inner").appendChild(tabCommon);
        }
        if (everyForth == 0) { 
           commonrowDiv = document.createElement("div");
           commonrowDiv.className = 'row';
          tabCommon.appendChild(commonrowDiv);
        }
        var colDiv = document.createElement("div");
      colDiv.className = 'col-md-3';
      commonrowDiv.appendChild(colDiv);
      var image = document.createElement("img");
      image.src = value.url;
      image.className = "card-img-top modal-content";
      image.id ="imageCard"+count;
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
      }else if (value.rarity === "uncommon"){
        let everyForth = (uncommonCount % 4);
        if(uncommonCount ===0){
         tabUncommon = document.createElement("div");
        tabUncommon.className = "tab-pane fade";
        tabUncommon.id = "uncommonTab";
        document.getElementById("multi-item-cards-inner").appendChild(tabUncommon);
        }
        if (everyForth == 0) { 
         uncommonRowDiv = document.createElement("div");
         uncommonRowDiv.className = 'row';
          tabUncommon.appendChild(uncommonRowDiv);
        }
        var colDiv = document.createElement("div");
      colDiv.className = 'col-md-3';
      uncommonRowDiv.appendChild(colDiv);
      var image = document.createElement("img");
      image.src = value.url;
      image.className = "card-img-top modal-content";
      image.id ="imageCard"+uncommonCount;
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

      uncommonCount++;
      }else if (value.rarity === "rare"){
        let everyForth = (rareCount % 4);
        if(rareCount === 0){
         tabRare = document.createElement("div");
          tabRare.className = "tab-pane fade";
          tabRare.id = "rareTab";
          document.getElementById("multi-item-cards-inner").appendChild(tabRare);
        }

        if (everyForth == 0) { 
           rarerowDiv = document.createElement("div");
           rarerowDiv.className = 'row';
          tabRare.appendChild(rarerowDiv);
        }
        var colDiv = document.createElement("div");
      colDiv.className = 'col-md-3';
      rarerowDiv.appendChild(colDiv);
      var image = document.createElement("img");
      image.src = value.url;
      image.className = "card-img-top modal-content";
      image.id ="imageCard"+rareCount;
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

      rareCount++;
      }


      $(document).on("click", ".card-img-top", function () {
        $("#image").modal("show");
        var theImageUrl = $(this).attr('src');
        var theModalImage = document.getElementById('imgModal');
        theModalImage.src = theImageUrl;
   });
    });

  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function () {
  // There was a connection error of some sort
};

request.send(); 