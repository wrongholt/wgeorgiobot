/*jshint esversion: 8 */
var _ = require('lodash');
const https = require('https');
const yaml = require('yaml');
const fs = require('fs');
var Airtable = require('airtable');
const fetch = require("node-fetch");
require('dotenv').config({
  path: 'variable.env'
});
const simpleGit = require('simple-git');
const git = simpleGit();
 
exports.gitPush = async(string) =>{
  try {

    await git.add('./*');
    await git.commit(string);
    await git.push('origin', 'master');
  }
  catch (e) { console.log(e); }
    

}

exports.httpGet = async (filter, table) => {
  var options = {
    host: "api.airtable.com",
    port: 443,
    path: "/v0/" + process.env.AirtableBase + "/" + table + "?api_key=" + process.env.ApiAirtable + filter,
    method: "GET"
  };
  //console.log("FULL PATH = http://" + options.host + options.path);
  return new Promise(((resolve, reject) => {
    const request = https.request(options, (response) => {
      response.setEncoding("utf8");
      let returnData = "";
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(new Error(`${response.statusCode}: ${response.req.getHeader("host")}${response.req.path}`));
      }
      response.on("data", (chunk) => {
        returnData += chunk;
      });
      response.on("end", () => {
        resolve(JSON.parse(returnData));
      });
      response.on("error", (error) => {
        reject(error);
      });
    });
    request.end();
  }));
};

exports.randomNoRepeats = async (array) => {
  var shuffledArray = _.shuffle(array);
  var pickOne = _.sample(shuffledArray);
  return pickOne;
};

 exports.GetValues = {
  GetAboutRace: function (race) {
    if (doc.hasOwnProperty('races')) {
      var races = doc.races;
      if (races.hasOwnProperty(race)) {
        return races[race].about.race;
      } else {
        console.log("Sorry no match");
        return false;
      }
    } else {
      console.log("Races not loaded");
      return false;
    }

  },


  GetLists: function (list) {
    var lists;
    if (!doc.hasOwnProperty(list)) {
      return "Not a list";
    }
    lists = doc[list];
    var outStr = Object.getOwnPropertyNames(lists);
    return outStr;
  },
  GetListInfo: function (list) {
    var lists;
    if (doc.hasOwnProperty(list)) {
      if (list === "races") {
        lists = doc.races;
      } else if (list === "classes") {
        lists = doc.classes;
      } else if (list === "backgrounds") {
        lists = doc.backgrounds;
      } else {
        return "Not a list";
      }
      var outStr = Object.getOwnPropertyNames(lists).slice(1).join(', ').replace(/, ([^,]*)$/, ' or $1');
      return outStr;
    }

  },
  GetAllRaceInfoList: function (race) {
    if (doc.hasOwnProperty('races')) {
      var races = doc.Races;

      if (races.hasOwnProperty(race)) {
        var outStr = "";
        var racesLength = Object.keys(races[race].about).length;
        if (races[race].About.length === 1) {
          outStr = Object.getOwnPropertyNames(races[race].about[0]);
        } else if (racesLength === 2) {
          outStr = Object.getOwnPropertyNames(races[race].about).join(' and ');
        } else if (racesLength > 2) {
          outStr = Object.getOwnPropertyNames(races[race].about).slice(1).join(', ').replace(/, ([^,]*)$/, ' and $1');
        }
        return this.GetAboutRace(race) + " Would you like to know more about this races " + outStr + "?";
      } else {
        console.log("Sorry no match");
        return false;
      }
    }
  },
  GetAllSortInfo: function (query, secondKey) {
    var firstKey = _.findKey(doc, secondKey);
    if (doc.hasOwnProperty(firstKey)) {
      if (doc[firstKey].hasOwnProperty(secondKey)) {
        var theObject = doc[firstKey][secondKey];
        var about = _.get(theObject, "about");
        var output = _.get(about, query);
        return output;
      } else {
        console.log("Sorry no match");
        return false;
      }

    }
  },
  GetSearchInfo: function (query) {
    var seen = new Set(),
      active = [doc];
    while (active.length) {
      var new_active = [],
        found = [];
      for (var i = 0; i < active.length; i++) {
        Object.keys(active[i]).forEach(function (k) {
          var x = active[i][k];
          if (k === query) {
            found.push(x);
          } else if (x && typeof x === "object" &&
            !seen.has(x)) {
            seen.add(x);
            new_active.push(x);
          }
        });
      }
      if (found.length) return found[0];
      active = new_active;
    }
    return "Not Found";
  }

};
exports.getOpenGame = async(username) =>{
  console.log(`<=== getOpenGame ===>`);
  const url = `https://api.airtable.com/v0/${process.env.AirtableBotBase}/Battle?api_key=${process.env.ApiAirtable}&filterByFormula=AND(OpponentName%3D"${username}")`;

  const options = {method: "GET"};
      
  return fetch(url, options)
  .then((res) => res.json())
  .then(data => console.log(data));
};
exports.createGame = async(insUsername,username,instigator,insCards) =>{
  console.log(`<=== airtable/getOpenGame.js ===>`);
  const url = `https://api.airtable.com/v0/${process.env.AirtableBotBase}/Battle?api_key=${process.env.ApiAirtable}&filterByFormula=AND(InstigatorName%3D"${insUsername}")`;

  const options = {method: "GET"};
      
  return fetch(url, options)
  .then((res) => res.json())
  .then((r) => {
    if (r.records.length === 0) return initiateBattle(insUsername, instigator, insCards);
    else return updateBattle(r.records[0],username, instigator, insCards);
  });
};
function initiateBattle(username, instigator, insCards) {
  console.log(`CREATING NEW USER RECORD FOR ${username}`);
  var airtable = new Airtable({ apiKey: process.env.ApiAirtable }).base(process.env.AirtableBotBase);
  return new Promise((resolve, reject) => {
    airtable("Battle").create({ "InstigatorName": username,"Instigator":instigator, "InstigatorCards": insCards,"OpenGame": false }, function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      resolve(record);
    });
  });
}
updateBattle = (user,username,opponent,oppCards) => {
  var airtable = new Airtable({ apiKey: process.env.ApiAirtable }).base(process.env.AirtableBotBase);
  return new Promise((resolve, reject) => {
      airtable('Battle').update(user.fields.RecordId, {
          "OpenGame": true,
          "OpponentName": username,
          "Opponent":opponent,
          "OpponentCards":oppCards
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          resolve(record);
        });
  });
};
exports.deleteBattle = (user) =>{
  let base = new Airtable({apiKey: process.env.ApiAirtable}).base('app1Aktj6rmHPT7X2');
  base('Battle').destroy(user.fields.RecordId, function(err, deletedRecord) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Deleted record', deletedRecord.id);
  });
};
exports.updateUserScore = async(user) =>{
  console.log(`<=== airtable/updateUserScore.js ===>`);
  //DETERMINE IF USER IS ALREADY IN DATABASE.
  const url = `https://api.airtable.com/v0/${process.env.AirtableBotBase}/Players?api_key=${process.env.ApiAirtable}&filterByFormula=AND(Name%3D"${user}")`;
  //console.log(`FULL PATH ${url}`);
      //IF NO, INSERT THEM AND GET RECORDID
      //IF YES, GET RECORDID

  const options = {method: "GET"};
      
  return fetch(url, options)
  .then((res) => res.json())
  .then((r) => {
      if (r.records.length === 0) return createUserRecord(user);
      else return updateScore(r.records[0]);
  });
};

function createUserRecord(username) {
  console.log(`CREATING NEW USER RECORD FOR ${username}`);
  var airtable = new Airtable({ apiKey: process.env.ApiAirtable }).base(process.env.AirtableBotBase);
  return new Promise((resolve, reject) => {
    airtable("Players").create({ "Name": username, "website": `https://wrongholt.github.io/tcg/${username}/`,"gold":1 }, function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      resolve(record);
    });
  });
}

function updateScore(user) {
  var airtable = new Airtable({ apiKey: process.env.ApiAirtable }).base(process.env.AirtableBotBase);
  return new Promise((resolve, reject) => {
      airtable('Players').update(user.fields.RecordId, {
          "gold": user.fields.gold+1
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          resolve(record);
        });
  });
}

exports.updateAsPlayer = (user) => {
  var airtable = new Airtable({ apiKey: process.env.ApiAirtable }).base(process.env.AirtableBotBase);
  return new Promise((resolve, reject) => {
      airtable('Players').update(user.fields.RecordId, {
          "playsTCG": true
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          resolve(record);
        });
  });
};


 exports.updateScoreAfterPurchase = (user,balance) => {
  var airtable = new Airtable({ apiKey: process.env.ApiAirtable }).base(process.env.AirtableBotBase);
  return new Promise((resolve, reject) => {
      airtable('Players').update(user.fields.RecordId, {
          "gold": balance
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          resolve(record);
        });
  });
};

exports.initiateBattle = async (instigator, opponent) =>{
  var shuffledArray = _.shuffle(instigator.characters);
  var pickOne = _.sample(shuffledArray);
  var shuffledArrayOpp = _.shuffle(opponent.characters);
  var pickOneOpp = _.sample(shuffledArrayOpp);
  var theBattle = battle(pickOne,pickOneOpp);
  var instIndex = instigator.characters.indexOf(pickOne);
  var oppIndex = opponent.characters.indexOf(pickOneOpp);
  if(theBattle === "instigator"){
    instigator.characters.push(pickOneOpp);
    opponent.characters.splice(oppIndex, 1);
    let winnerObj = {
      winner: "instigator",
      loserCard: pickOneOpp,
      instCards: instigator,
      oppCards: opponent
    };
    return winnerObj;
  }else if(theBattle === "opponent"){
    opponent.characters.push(pickOne);
    instigator.characters.splice(instIndex, 1);
    let winnerObj = {
      winner: "opponent",
      loserCard: pickOne,
      instCards: instigator,
      oppCards: opponent
    };
    return winnerObj;
  }else if(theBattle === "tie"){
    let winnerObj = {
      winner: "tie",
    };
    return winnerObj;
  }
};

function battle(insCard, oppCard){
  var oppIndex;
  var insIndex;
  var i;
  var typesArray = [
    ["sword","bow"],
    ["cloak","axe"],
    ["magic","spear"]
  ];
  console.log("THE INS CARD---->>>"+JSON.stringify(insCard));
  for(i = 0; i < typesArray.length; i++){
    if(typesArray.indexOf(oppCard.type)){
      console.log(oppCard.type);
      console.log(i);
      oppIndex = i;
    } 
    if(typesArray.indexOf(insCard.type)){
      insIndex = i;
    }
  }

  const results = [
    ['t', 'c', 'u'],
    ['u', 't', 'c'],
    ['c', 'u', 't'],
    ];
    let userResult = results[oppIndex][insIndex];
    const resultMap = {
      't': "Tie",
      'u': "You win",
      'c': "You lose"
      };
     var theResult = resultMap[userResult];

  if (insCard.battlepoints > oppCard.battlepoints && theResult === "You win"){
    return "instigator";
  }else if (oppCard.battlepoints > insCard.battlepoints && theResult === "You win"){
    return "opponent";
  }else if (oppCard.battlepoints > insCard.battlepoints && theResult === "Tie"){
    return "opponent";
  }else if (insCard.battlepoints > oppCard.battlepoints && theResult === "Tie"){
    return "instigator";
  }else if (oppCard.battlepoints > insCard.battlepoints && theResult === "You lose"){
    return "opponent";
  }else if (insCard.battlepoints > oppCard.battlepoints && theResult === "You lose"){
    return "instigator";
  }else if (theResult === "Tie"){
    return "tie";
  }else if (theResult === "You lose"){
    return "opponent";
  }else if (theResult === "You win"){
    return "instigator";
  }else{return "tie";}
}