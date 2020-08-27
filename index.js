/*jshint esversion: 8 */
const Discord = require('discord.js');
const client2 = new Discord.Client();
const tmi = require('tmi.js');
const debug = require('debug');
require('dotenv').config({ path: 'variable.env' });
const commands = require('./commands');
const helpers = require('./helpers/helper');
const dlog = debug('bot:index');
//TODO Write JEST tests
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		secure: true,
		reconnect: true
	},
	identity: {
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	},
	channels: [ 'wgeorgio','goldzulu','JBNunn' ]
});
client2.on('ready', () => {
  console.log(`Logged in as ${client2.user.tag}!`);
});

client2.login('');
client2.on('message', async (msg) => {
console.log("THE MESSAGE " + msg.content);
console.log("THE AUTHOR " + msg.author.username);
const [commandName, ...commandArgs] = msg.content.trim().split(' ');
  dlog(`COMMAND NAME = ${commandName}`);
  var username = msg.author.username;
  const user = await helpers.updateUserScore(username);

switch (commandName) {

  case '!steal':
    const stealMessage = await commands.steal(user,msg.content,username);
    msg.reply(`${username} ${stealMessage}`);
    break;
  case '!battle':
    const battleMessage = await commands.battle(user,username);
    msg.reply(`${username} ${battleMessage}`);
    break; 
  case '!join':
    const joinMessage = await commands.join(user,username,msg.content);
    msg.reply(`${username} ${joinMessage}`);
    break; 
  case '!roll':
    const diceMessage = commands.dice(commandArgs);
    console.log("IN CASE ROLL" + diceMessage);

    dlog('diceMessage %s', diceMessage);
    msg.reply(`${username} ${diceMessage}`);
    break;
  case '!me':
    const meMessage = await commands.me(username);
    msg.reply(`${username} ${meMessage}`);
    break;    
  case '!save':
    const saveMessage = commands.save();
    msg.reply(`${username} ${saveMessage}`);
    break;  
  case '!playtcg':
      const tcgStartMessage = await commands.tcgStart(username,user);
      msg.reply(`${username} ${tcgStartMessage}`);
    break;  
  case '!buytcg':
      const buytcgMessage = await commands.buyTCG(user,username);
      msg.reply(`${tags.username} ${buytcgMessage}`);
    break;  
  case '!monster':
    const monMessage = await commands.monsters();
    console.log("IN CASE MONSTER" + monMessage);
    dlog('monsterMessage %s', monMessage);
    msg.reply(`${username} ${monMessage}`);
  break;

  default:
    break;
}
});
client.connect();

client.on('message', async (channel, tags, msg, self) => {
	// Ignore echoed messages.
	if(self) return;
  const message = msg.trim();
  const messageArray = message.split(" ");
  console.log("COMMAND NAME = " + messageArray[0]);
  const [commandName, ...commandArgs] = msg.trim().split(' ');
  dlog(`COMMAND NAME = ${commandName}`);
  let username = tags.username;
  const user = await helpers.updateUserScore(tags.username);
  switch (commandName) {

    case '!followers':
      commands
        .followers(commandArgs)
        .then((r) => client.say(channel, `@${username} ${r}`));
      break;
    case '!steal':
      const stealMessage = await commands.steal(user,msg,username);
      client.say(channel, `${username} ${stealMessage}`);
      break;
    case '!battle':
      const battleMessage = await commands.battle(user,username,msg);
      client.say(channel, `${username} ${battleMessage}`);
      break; 
    case '!join':
      const joinMessage = await commands.join(user,username,msg);
      client.say(channel, `${username} ${joinMessage}`);
      break; 
    case '!yes':
      const yesMessage = await commands.yesJoin(user,username);
      client.say(channel, `${yesMessage}`);
      break; 
    case '!roll':
      const diceMessage = commands.dice(commandArgs);
      console.log("IN CASE ROLL" + diceMessage);

      dlog('diceMessage %s', diceMessage);
      client.say(channel, `${username} ${diceMessage}`);
      break;
    case '!me':
      const meMessage = await commands.me(username);
      client.say(channel, `${username} ${meMessage}`);
      break;    
    case '!save':
      const saveMessage = commands.save();
      client.say(channel, `!tts ${username} ${saveMessage}`);
      break;  
    case '!playtcg':
        const tcgStartMessage = await commands.tcgStart(username,user);
        client.say(channel, `${username} ${tcgStartMessage}`);
      break;  
    case '!buytcg':
        const buytcgMessage = await commands.buyTCG(user,username);
        client.say(channel, `${username} ${buytcgMessage}`);
      break;  
    case 'ancient':
      client.say(channel, await commands.answer(message, tags));
        break;    
    case '!ancient':
      console.log("IN LOOKUP>>>>>");
      const ancientMessage = commands.ancient();
      dlog('ancientMessage %s', ancientMessage);
      client.say(channel, `!tts ${ancientMessage}`);
      break;
    case '!monster':
      const monMessage = await commands.monsters();
      console.log("IN CASE MONSTER" + monMessage);
      dlog('monsterMessage %s', monMessage);
      client.say(channel, `!tts ${username} ${monMessage}`);
    break;

    default:
      break;
  }
});
