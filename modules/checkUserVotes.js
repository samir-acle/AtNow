//checks database to see if user has voted for the location provided
//returns index of the vote in the userVotes array as well as the vote type (upvote or downvote)
module.exports = function(locationID){
  var index, prevVote;
  var currentUser = global.currentUser;

  if (!currentUser){
    return;
  }

  var votesArray = currentUser.votes;

  for (var i = 0; i < votesArray.length; i++) {
    if (votesArray[i].location_id === locationID){
      index = i;
      prevVote = votesArray[i].vote;
      return [index,prevVote];
    }
  }
};
