require("../db/schema");
var mongoose = require("mongoose");
// var VoteModel = mongoose.model("Vote");
var VoteModel = Backbone.Model.extend({
    urlRoot : '/',
    idAttribute: '_id',
    defaults:{
        name: '',
        votes: 0,
        votetype: 0,
        postedBy : '',
    },

    upvote: function(){
        this.set ({votetype : 1 }, {votes : this.get('votes') + 1});
        this.save();
        $.ajax({
            type: "POST",
            url:"/upvote",
            data : {postID : this.id , userID : window.userID , vote: 1},
            success : function(result){
                console.log(result);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }

        });

    },


});

module.exports = VoteModel;
