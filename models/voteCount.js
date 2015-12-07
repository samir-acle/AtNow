require("../db/schema");
var mongoose = require("mongoose");
var VoteCountModel = mongoose.model("VoteCount");

module.exports = VoteCountModel;
