require("../db/schema");
var mongoose = require("mongoose");
var User = mongoose.model("User");
module.exports = User;
