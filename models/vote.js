require("../db/schema");
var mongoose = require("mongoose");
var VoteModel = mongoose.model("Vote");

module.exports = VoteModel;
