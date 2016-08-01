var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, function(err, res) {
    if (err) throw err;
});

module.exports = {};

module.exports.Answer = mongoose.model('Answer', new mongoose.Schema({
    realName: String,
    participateMethod: String,
    invitationMethod: String,
    invitationAddr: String,
    relationWithUs: String,
    numPeople: Number,
    phone: String,
    numVegan: Number,
    numChildren: Number,
    saySomething: Number,
}));
