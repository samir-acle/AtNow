var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bcrypt = require("bcrypt-nodejs");

var VoteSchema = new Schema ({
    location_id: String,
    vote_flag: Boolean,
    createdAt: {type: Date, default: Date.now},
});

var PreferenceSchema = new Schema ({
    default_location: String,
    removed_location: [],
});

var voteCountSchema = new Schema ({
    location_id: String,
    count: Number,
});

var UserSchema = new Schema ({
    local: {
      firstname: String,
      lastname: String,
      email: String,
      password: String,
    },
      votes: [VoteSchema],
      preferences: [PreferenceSchema]
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


module.exports = mongoose.model("User", UserSchema);
