const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {User} = require("../models")

exports.hashPassword = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8)
        }
        next()
    } catch (error) {
        res.status(508).send(error)
    }
}

exports.createToken = (req, res, next) => {
    try {
        const token = jwt.sign({
            username: req.body.username
        }, process.env.SECRET)
        req.token = token
        next()
    } catch (error) {
        res.status(509).send(error)
    }
}

exports.decodeToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({username: decodedToken.username})
        if(!user){
            throw new Error("decode token error")
        }
        req.user = user
        next()
    } catch (error) {
        res.status(510).send(error)
    }
}