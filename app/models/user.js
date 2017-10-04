var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  myLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  sharedLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}]
})

// user method for generating a hashed password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// user method to check if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User', userSchema);
module.exports = User;
