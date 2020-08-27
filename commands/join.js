/*jshint esversion: 8 */
const fs = require('fs-extra');
var path = require('path');
var data = require("../data/dataparser");
const helpers = require('../helpers/helper');

async function joinBattleTCG(user,context,message) {
  var rounds = "";
  if(user.fields.playsTCG === true){
    const command = message.toLowerCase().replace("!join ", "");
    const [instigator] = command.split(" ");
      const fileContent = fs.readFileSync(`./tcg/${context}/cards.json`, 'utf8');
       cardsContent = JSON.parse(fileContent);
       theBattleMatched = await helpers.createGame(instigator,context,JSON.stringify(user),JSON.stringify(cardsContent));

      if(!theBattleMatched.fields.OpenGame){
        return "There isn't a game right now but we made one for you now wait for somone to type !join " + context;
      }
      for(var i = 1; i <= 3; i++){
        console.log("hello");
        var theBattle = await helpers.initiateBattle(JSON.parse(theBattleMatched.fields.InstigatorCards),cardsContent);
        if(theBattle.winner === "instigator"){
          rounds += i +". "+ theBattleMatched.fields.InstigatorName +" won the match. The recieved the '"+ theBattle.loserCard.name + "' card.";
          fs.writeFileSync(`./tcg/${theBattleMatched.fields.InstigatorName}/cards.json`, JSON.stringify(theBattle.instCards), (err) => {
            if (err) {
                console.error(err);
                return;
            }});
          fs.writeFileSync(`./tcg/${theBattleMatched.fields.OpponentName}/cards.json`, JSON.stringify(theBattle.oppCards), (err) => {
            if (err) {
                console.error(err);
                return;
            }});
        }else if(theBattle.winner === "opponent"){
          rounds += i +". "+ theBattleMatched.fields.OpponentName +" won the match. The recieved the '"+ theBattle.loserCard.name + "' card.";
          fs.writeFileSync(`./tcg/${theBattleMatched.fields.OpponentName}/cards.json`, JSON.stringify(theBattle.oppCards), (err) => {
            if (err) {
                console.error(err);
                return;
            }});
          fs.writeFileSync(`./tcg/${theBattleMatched.fields.InstigatorName}/cards.json`, JSON.stringify(theBattle.instCards), (err) => {
            if (err) {
                console.error(err);
                return;
            }});
        }else if(theBattle.winner === "tie"){
          rounds += i +". It was a tie. ";
        }
      }
      helpers.deleteBattle(theBattleMatched);
      
      
    
  }else{
    return "Please type !playtcg to get cards to play. Then you can battle.";
  }

var textOutput = rounds;
 await helpers.gitPush(`${context} battled`);
  return textOutput;
}
module.exports = joinBattleTCG;

