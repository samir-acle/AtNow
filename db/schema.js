var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema ({
    local: {
      email: String,
      password: String,
    },
    votes: [VoteSchema],
    preferences: [PreferenceSchema]
    }
)};

var VoteSchema = new Schema ({
    location_id: String,
    vote_flag: Boolean,
    createdAt: {type: Date, default: Date.now},
});

var PreferenceSchema = new Schema ({
    default_location: String,
    removed_location: [],
});

var VoteCountSchema = new Schema ({
    location_id: String,
    count: Number,
});
