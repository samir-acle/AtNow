var User = require("../db/schema");
var bcrypt = require("bcrypt-nodejs");

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
