var Vote = mongoose.model('Vote');

module.exports = (function() {
	return {
          update: function(req, res){
          			Preference.findOne({id: req.preferenceId})
          				.populate('preferences')
          				.exec(function(err, post){
          				if(err){
          					console.log(err);
          				} else {
          					if(req.vote > 0){
          						post.upvotes += 1;
          					} else {
          						post.downvotes += 1;
          					}
          					// Need to figure out whether we want to get the updated vote count here and
          					//send it back, or if we want to handle that in a callback in the factory.
          					//Right now we are doing neither.
          					post.save(function(err){
          						if(err){
          							console.log(err);
          						} else {
          							res.json({message: 'Vote updated'});
          						}
          					});
          				}
          			});
          		}
            }
