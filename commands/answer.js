
/*jshint esversion: 8 */
const helpers = require('../helpers/helper');
const debug = require('debug');
const dlog = debug('bot:answer');


 function answer(message, context) {
    const command = message.toLowerCase().replace("ancient what is", "").trim();
    dlog(`AFTER COMMAND NAME = ${command}`);
          let messageOut = "";
          var item1 = command; 
          var speechText =  helpers.GetValues.GetSearchInfo(item1);
          messageOut = `${context.username} ${speechText}`;

          if (messageOut) {
           return messageOut;
          }
         return messageOut;
}

module.exports = answer;