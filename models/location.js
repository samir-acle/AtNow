require("../db/schema");
var mongoose = require("mongoose");
var LocationModel = mongoose.model("Location");

module.exports = LocationModel;
