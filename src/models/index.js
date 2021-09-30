const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema)
const Note = mongoose.model("User", noteSchema)

module.exports = {
    User,
    Note
}