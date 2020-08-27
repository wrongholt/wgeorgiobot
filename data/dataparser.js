/*jshint esversion: 8 */
const yaml = require('yaml');
const fs   = require('fs');
var _ = require('lodash');
// Get document, or throw exception on error
let doc = {};
try {
   doc = yaml.parse(fs.readFileSync(__dirname + '/maindata.yaml', 'utf8'));
} catch (e) {
  console.log(e);
}

getRandom = (rarity) => {
  if( doc.hasOwnProperty('rarities') ) {
  if(doc.rarities.hasOwnProperty(rarity)){
    var rarityGroup = doc.rarities[rarity];
    var shuffledArray = _.shuffle(rarityGroup);
    var pickOne = _.sample(shuffledArray);
  return pickOne;
  }else{
    console.log("OH NO ERROR");
    return;
  }}  
  
};

exports.cardRarityPicker = async (howManyCards,cardObj) => {
  var i;
for (i = 0; i < howManyCards; i++){
  var percent = Math.floor(Math.random() * 100)/100;
  var rarity;
  if(percent <= 0.05){
    rarity = "rare";
  }else if(percent > 0.05 && percent <= 0.25){
    rarity = "uncommon";
  }else{
    rarity = "common";
  }
  var moreData = getRandom(rarity);
  if(!cardObj.hasOwnProperty("characters")){
    cardObj.characters = [];
  }
  cardObj.characters.push(moreData);

}
cardObj.characters = sortByKeyAsc(cardObj.characters, "name");
  return cardObj;
};
function sortByKeyAsc(array, key) {
  return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
exports.didTheySteal = (cardsObjVictims,cardsObj) =>{
  var percent = Math.floor(Math.random() * 100)/100;
  if (percent > 0.50){
    var shuffledArray = _.shuffle(cardsObjVictims.characters);
    var pickOne = _.sample(shuffledArray);
    removeItemOnce(cardsObjVictims.characters,pickOne);
  var addedCards = cardsObj.characters.push(pickOne);

    return {
      "victimCards": cardsObjVictims,
      "cards": cardsObj,
      "theCard":pickOne,
      "caught": false
    };
  }else{
    return {
      "victimCards": cardsObjVictims,
      "cards": cardsObj,
      "caught": true
    };
  }
};
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}