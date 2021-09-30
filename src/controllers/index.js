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