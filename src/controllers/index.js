const {User, Note} = require("../models")
const bcrypt = require("bcryptjs")

exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).send({user: user, token: req.token, message: `${userName} successfully added`})
    } catch (error) {
        res.status(500).send({err: error})
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({userName: req.body.userName})
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send({user: user, token: req.token, message: "login successful"})
        } else {
            throw new Error()
        }
    } catch (error) {
        res.status(501).send({err: error})
    }
}

exports.tokenLogin = (req, res) => {
    try {
        res.status(200).send({user: req.user})
    } catch (error) {
        res.status(502).send({err: error})
    }
}

exports.updateUser = async (req, res) => {
    try {
        await User.updateOne(
            {userName: req.body.userName},
            {$Set: {[req.body.key]: req.body.update}}
            // check with andy what is happening here ^ (line 31)
        )
        res.status(200).send({message: `userName successfully updated to ${userName}`})
    } catch (error) {
        res.status(503).send({err: error})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({userName: req.params.userName})
        res.status(200).send({message: `${userName}'s account has been deleted`})
    } catch (error) {
        res.status(504).send({err: error})
    }
}

exports.addNote = async (req, res) => {
    try {
        const note = new Note(req.body)
        await note.save()
        res.status(200).send({user: user, token: req.token, message: `${title} successfully added`})
    } catch (error) {
        res.status(505).send({err: error})
    }
}

exports.updateNote = async (req, res) => {
    try {
        await Note.updateOne(
            {email: req.body.email},
            {$Set: {[req.body.key]: req.body.update}}
        )
        res.status(200).send({message: `successfully update ${title}`})
    } catch (error) {
        res.status(506).send({err: error})
    }
}

exports.deleteNote = async (req, res) => {
    try {
        await Note.deleteOne({title: req.params.title})
        res.status(200).send({message: `${title} successfully deleted`})
    } catch (error) {
        res.status(507).send({err: error})
    }
}