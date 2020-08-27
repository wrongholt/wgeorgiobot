/*jshint esversion: 8 */
const fs = require('fs-extra');
var path = require('path');
var data = require("../data/dataparser");
const simpleGit = require('simple-git');
const git = simpleGit();
const helpers = require('../helpers/helper');
var session = require('express-session');
const express = require('express');
var app = express();
async function battleTCG(user,context) {
  let command;
  var textOutput;
  let userOpp;
    // command = message.toLowerCase().replace("!battle ", "");
    // const [opponent] = command.split(" ");
    // userOpp = await helpers.updateUserScore(opponent);
  // if(userOpp.fields.playsTCG === false){
  //   return "Your opponent doesn't have any cards they need to type !playtcg to get cards";
  // }
  if(user.fields.playsTCG === true){
    const fileContent = fs.readFileSync(`./tcg/${context}/cards.json`, 'utf8');
    var cardsContent = JSON.parse(fileContent);
    helpers.createGame(context,"",JSON.stringify(user),JSON.stringify(cardsContent));
    textOutput = "I am now waiting for your opponent. To play against "+context+" just type !join " +context + "";
    // if(opponent){
    // let fileContent = fs.readFileSync(`./tcg/${opponent}/cards.json`, 'utf8');
    // let cardsContent = JSON.parse(fileContent);
    // helpers.createGame(context.username,opponent,JSON.stringify(user),JSON.stringify(cardsContent));
    // textOutput = "OK, I have created the game now "+ opponent +" needs to reply by typing !yes to get this going.";
    // }
    
  }else{
    return "Please type !playtcg to get cards to play. Then you can battle.";
  }



  return textOutput;
}
module.exports = battleTCG;