const {Router} = require("express")
const helloRouter = Router()
const {
    addUser, 
    updateUser,
    deleteUser,
    login,
    tokenLogin,
    addNote,
    updateNote,
    deleteNote
} = require("../controllers")

const {
    hashPassword,
    createToken,
    decodeToken
} = require("../middleware")

helloRouter.post("/user", hashPassword, createToken, addUser, addNote)
helloRouter.patch("/user", hashPassword, updateUser, updateNote)
helloRouter.delete("/user/:username", deleteUser, deleteNote)
helloRouter.post("/user/login", createToken, login)
helloRouter.get("/user", decodeToken, tokenLogin)

module.exports = helloRouter