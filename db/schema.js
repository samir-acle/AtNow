var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var VoteSchema = new Schema ({
  location_id: String,
  vote: Boolean,
  user: {type: ObjectId, ref: "User"},
  createdAt: {type: Date, default: Date.now},
  name: String
});

var PreferenceSchema = new Schema ({
  default_location: String,
  user: {type: ObjectId, ref: "User"},
  removed_location: []
});

var LocationSchema = new Schema ({
  location_id: String,
  count: Number
});

var UserSchema = new Schema ({
  local: {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  },
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String
  },
  votes: [VoteSchema],
  preferences: [PreferenceSchema]
});

var bcrypt = require("bcrypt-nodejs");

var PreferenceModel = mongoose.model("Preference", PreferenceSchema);
var VoteModel = mongoose.model("Vote", VoteSchema);
var LocationModel = mongoose.model("Location", LocationSchema);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


module.exports = mongoose.model("User", UserSchema);
