/**
 * Created by Rushdi on 2016-12-13.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,

    model: String,

    current_state: String,
    pos_x: Number,
    pos_y: Number
});

userSchema.statics.register = function(username, password, cb) {

    var new_user = new User({
        username: username,
        password: password,

        model: "default_model",

        current_state: "menu_state",
        pos_x: 0,
        pos_y: 0
    });

    new_user.save(function (err) {
        if (!err) {
            cb(true);
        } else {
            cb(false);
        }
    });
};

userSchema.statics.login = function(username, password, cb){

    User.findOne({username: username}, function(err, user){

        if(!err && user){
            if(user.password == password){
                cb(true, user);
            }else{
                cb(false, null);
            }
        }else{
            cb(false, null);
        }

    })

};

module.exports = User = gamedb.model('User', userSchema);