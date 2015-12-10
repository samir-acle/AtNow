module.exports = function(locationID){
  var index, prevVote;
  var currentUser = global.currentUser;

  if (!currentUser){
    return;
  }

  var votesArray = currentUser.votes;

    //TODO: use findOne?
  for (var i = 0; i < votesArray.length; i++) {
    if (votesArray[i].location_id === locationID){
      index = i; //TODO: remoe match
      prevVote = votesArray[i].vote;
      // console.log('match found');
      return [index,prevVote];
    }
  }
};
