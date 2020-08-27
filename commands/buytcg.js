/*jshint esversion: 8 */
const fs = require('fs-extra');
var path = require('path');
var data = require("../data/dataparser");
const simpleGit = require('simple-git');
const { updateUserScore } = require('../helpers/helper');
const git = simpleGit();
const helpers = require('../helpers/helper');


async function buyTCG(user,context) {
  
  const fileContent = fs.readFileSync(`./tcg/${context}/cards.json`, 'utf8');
  var cardsContent = JSON.parse(fileContent);
  await data.cardRarityPicker(5, cardsContent);

 fs.writeFileSync(`./tcg/${context}/cards.json`, JSON.stringify(cardsContent), (err) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log("File has been created");
  
});
var fiveCardCost = 10;
var textOutput;
if(user.fields.gold > fiveCardCost){
  const balance = parseInt(user.fields.gold) - parseInt(fiveCardCost);
await helpers.updateScoreAfterPurchase(user,balance);
textOutput = "You have bought a 5 card booster! They cost "+fiveCardCost+" and your balance is "+balance+".";
}else{
  textOutput = "I am sorry you don't have enough gold coins to buy a booster pack.";
}

await helpers.gitPush(`Added 5 cards to ${context}`);
  return textOutput;
}
module.exports = buyTCG;