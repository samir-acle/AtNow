var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema ({
    local: {
      firstname: String,
      lastname: String,
      email: String,
      password: String,
    },
    // facebook: {
    //   id: String,
    //   token: String,
    //   username: String,
    //   displayName: String
    // },
      votes: [VoteSchema],
      preferences: [PreferenceSchema]
});

var bcrypt = require("bcrypt-nodejs");

var VoteSchema = new Schema ({
    location_id: String,
    downvotes: {type: Number, default: 0},
    upvotes: {type: Number, default: 0},
    _topicId: Number
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

var PreferenceModel = mongoose.model("Preference", PreferenceSchema);
var VoteModel = mongoose.model("Vote", VoteSchema);
var VoteCountModel = mongoose.model("VoteCount", VoteCountSchema);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


module.exports = mongoose.model("User", UserSchema);
