var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  text: {type: String},
  timestamp: {type: Date, default: Date.now},
  name: {type: String},
  list_id: {type: mongoose.Schema.Types.ObjectId, ref: 'List'}
})

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
