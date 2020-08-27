/*jshint esversion: 8 */
const helpers = require('../helpers/helper');
const debug = require('debug');
const _ = require('lodash');
const dlog = debug('bot:commands:monster');

me = async(tags) =>{
  const user = await helpers.updateUserScore(tags);

  if(user.fields.playsTCG === true){
    return `Your balance is currently ${user.fields.gold} and your web page is ${user.fields.website}`;
  }else{
    return `Your balance is currently ${user.fields.gold}`;
  }
  
};

module.exports = me;