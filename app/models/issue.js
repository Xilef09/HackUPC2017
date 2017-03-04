var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var IssueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    time: {
        type: String
    },
    projectName: {
        type: String
    },
    userRef: {
        type: String
    }
});


module.exports = mongoose.model('Issue', IssueSchema);