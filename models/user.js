var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
require("../db/schema");
var User = mongoose.model("User");



// User.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = User;
