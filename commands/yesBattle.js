/*jshint esversion: 8 */
const fs = require('fs-extra');
var path = require('path');
var data = require("../data/dataparser");
const helpers = require('../helpers/helper');

async function yesBattleTCG(user,context) {
  var rounds = "";
  if(user.fields.playsTCG === true){
      const fileContent = fs.readFileSync(`./tcg/${context.username}/cards.json`, 'utf8');
       cardsContent = JSON.parse(fileContent);
       theBattleMatched = await helpers.getOpenGame(context.username);

      if(!theBattleMatched){
        return "There isn't a game right now to type !join or !battle";
      }
      for(var i = 1; i <= 3; i++){
        var theBattle = await helpers.initiateBattle(JSON.parse(theBattleMatched.fields.InstigatorCards),cardsContent);
        if(theBattle.winner === "instigator"){
          rounds += i +". "+ theBattleMatched.fields.InstigatorName +" won the match. The recieved the '"+ theBattle.loserCard.name + "' card.";
        }else if(theBattle.winner === "opponent"){
          rounds += i +". "+ theBattleMatched.fields.OpponentName +" won the match. The recieved the '"+ theBattle.loserCard.name + "' card.";
        }else if(theBattle.winner === "tie"){
          rounds += i +". It was a tie. ";
        }
      }
      helpers.deleteBattle(theBattleMatched);
   
    
  }else{
    return "Please type !playtcg to get cards to play. Then you can battle.";
  }

var textOutput = rounds;
 await helpers.gitPush(`${context.username} battled`);
  return textOutput;
}
module.exports = yesBattleTCG;

