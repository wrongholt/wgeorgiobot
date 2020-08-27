/*jshint esversion: 8 */

const dice = require('./dice');
const save = require('./save');
const followers = require('./followers');
const monsters = require('./monster');
const answer = require('./answer');
const ancient = require('./ancient');
const tcgStart = require('./tcgStart');
const buyTCG = require('./buytcg');
const me = require('./me');
const steal = require('./steal');
const battle = require('./battle');
const join = require('./join');
const yesJoin = require('./yesBattle');


module.exports = {
  dice,
  followers,
  answer,
  monsters,
  save,
  ancient,
  tcgStart,
  buyTCG,
  me,
  steal,
  join,
  battle,
  yesJoin
};