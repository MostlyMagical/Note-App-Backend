require("./db/connection")
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000
const helloRouter = require("./routes")

app.use(express.json())
app.use(cors())
app.use(helloRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})