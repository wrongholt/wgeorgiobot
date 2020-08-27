
const dataHelper = require('./helpers/helper');

//console.log(dataHelper.GetAboutRace('dwarf'));

//console.log(dataHelper.GetAllSortInfo('barbarian', 'unarmored defense'));

var secondValue = "";
var infoValue = "human race";
if(!secondValue){
    var speechText =  "Search: "+dataHelper.GetValues.GetSearchInfo(infoValue);
  }
  //console.log(speechText);

// var search = dataHelper.GetSearchInfo("human");
console.log(speechText);
