/*jshint esversion: 8 */
const fs = require('fs-extra');
var path = require('path');
var data = require("../data/dataparser");
const helpers = require('../helpers/helper');
const simpleGit = require('simple-git');
const git = simpleGit();

 async function tcgStart(context,user) {
  var cardObj = {};
  var moreData = await data.cardRarityPicker(10, cardObj);
  moreData.username = context;
  fs.writeFileSync(`./dist/cards.json`, JSON.stringify(moreData), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File has been created");
});


  const fileContent = fs.readFileSync(path.join(__dirname, '../dist') + '/index.html');
  fs.copy('./dist',`./tcg/${context}`)
  .then(() => console.log('success!'))
  .catch(err => console.error(err));

  helpers.updateAsPlayer(user);
await helpers.gitPush(`Made a site for ${context}`);
  return `webpage was created ${user.fields.website}`;

 
 }

module.exports = tcgStart;

