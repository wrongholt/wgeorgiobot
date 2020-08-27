var data = require("./dataparser");


var moreData = data.cardRarityPicker();

for(var i = 0; i < moreData.length; i++){
  console.log(moreData[i].name);
}

// console.log('THE DATA--->>>'+JSON.stringify(moreData));