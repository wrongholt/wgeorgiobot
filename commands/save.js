/*jshint esversion: 8 */

const debug = require('debug');
const _ = require('lodash');
var Roll = require('roll'),
  roll = new Roll();
const dlog = debug('bot:commands:save');

function rollDice(sides) {
  var theRoll = roll.roll(sides);
  return theRoll.result;
}

function dice() {
  return `has rolled to help save the party the roll total was; ${rollDice('d20+5')}`;
}

module.exports = dice;