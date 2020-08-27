/*jshint esversion: 8 */

const debug = require('debug');
const _ = require('lodash');
var Roll = require('roll'),
  roll = new Roll();
const dlog = debug('bot:commands:dice');

function rollDice(sides) {
  var theRoll = roll.roll(sides);
  return theRoll.result;
}

function dice(args) {
  let [sides] = args;
  let description = '';
  if (_.isNil(sides) || _.isEmpty(sides)) sides = "d20";
  dlog(`sides %s`, sides);
  if (!sides.includes("d")) {
    // d WAS NOT found
    sides = 'd'+sides;
}
  if (sides !== "d20" || sides !== "1d20") description = `(${sides.split('d')[1]})`;
  return `You rolled ${rollDice(sides)} ${description}`;
}

module.exports = dice;