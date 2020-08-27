/*jshint esversion: 8 */
const fs = require('fs-extra');
var path = require('path');
var data = require("../data/dataparser");
const simpleGit = require('simple-git');
const { updateUserScore } = require('../helpers/helper');
const git = simpleGit();
const helpers = require('../helpers/helper');


async function tradeTCG(user,message,context) {
  const command = message.toLowerCase().replace("!tradetcg ", "");
  const [card, person, card2] = command.split(" ");
  var textOutput;

  const userVictim = await helpers.updateUserScore(tags.username);
    if(user.fields.playsTCG === true){
  const fileContentVictim = fs.readFileSync(`./tcg/${victim}/cards.json`, 'utf8');
  const fileContent = fs.readFileSync(`./tcg/${context.username}/cards.json`, 'utf8');
  var cardsContentVictim = JSON.parse(fileContentVictim);
  var cardsContent = JSON.parse(fileContent);
  stealTry = data.didTheySteal(cardsContentVictim,cardsContent);
  fs.writeFileSync(`./tcg/${victim}/cards.json`, JSON.stringify(stealTry.victimCards), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File has been created");
    
  });
  fs.writeFileSync(`./tcg/${context.username}/cards.json`, JSON.stringify(stealTry.cards), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File has been created");
    
  });
    }else if(userVictim.fields.playsTCG === false){
      textOutput = victim + " isn't playing, so they have zero cards to steal.";
      return textOutput; 
    }else{
      textOutput = "You haven't started playing, please type !playtcg to start playing.";
      return textOutput; 
    }

    
    if(stealTry.caught === true){
      const balance = parseInt(user.fields.gold) - parseInt(10);
    await helpers.updateScoreAfterPurchase(user,balance);
    textOutput = "You got caught stealing! That costed you 10 gold coins for bail and your new balance is "+balance+".";
    }else{
      textOutput = "You were sneaky and stole the '"+stealTry.theCard.name+"' card.";
    }

try {
  await git.cwd('C:\\Users\\wrongholt\\Documents\\WgeorgioBot\\tcg');
  await git.add('C:\\Users\\wrongholt\\Documents\\WgeorgioBot\\tcg');
  await git.commit(`${context.username} was naughty and tried to steal`);
  await git.push('origin', 'master');
}
catch (e) { console.log(e); }
  return textOutput;
}
module.exports = tradeTCG;

