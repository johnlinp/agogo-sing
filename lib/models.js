var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, function(err, res) {
    if (err) throw err;
});

module.exports = {};

module.exports.Answer = mongoose.model('Answer', new mongoose.Schema({
    realName: String,
    canAttend: String,
    invitationMethod: String,
    invitationAddr: String,
    phone: String,
    isVegan: Boolean,
    saySomething: String,
}));
