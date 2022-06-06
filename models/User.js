const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    cccd: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
    },
    age: {
        type: String
    },
    
})

module.exports = mongoose.model("users", UserSchema)