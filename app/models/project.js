var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    programRef: {
        type: String
    },
    userRef: {
        type: String
    }
});


module.exports = mongoose.model('Project', ProjectSchema);