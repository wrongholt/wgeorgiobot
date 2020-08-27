/*jshint esversion: 8 */
const helpers = require('../helpers/helper');
const debug = require('debug');
const _ = require('lodash');
const dlog = debug('bot:commands:monster');

getMonster = async() =>{
  var filter = "";
  const monsters = await helpers.httpGet(filter, "Monsters");
  var monsterRecords = monsters.records;
 var monstersArray = [];
  for (var i = 0; i < monsterRecords.length;) {
    monstersArray.push(monsterRecords[i].fields.Name);
      i++;
    }
  var randomMonster = await helpers.randomNoRepeats(monstersArray);
  console.log(randomMonster);
  return `You have rolled a random monster, which is ${randomMonster}`;
};

module.exports = getMonster;
