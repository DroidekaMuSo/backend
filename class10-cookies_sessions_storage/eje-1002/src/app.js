const express = require("express")
const displayRoutes = require("express-routemap")
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require("path")
require("dotenv").config()

const viewsRouter = require("./routes/views.router")
const sessionRouter = require("./routes/session.router")
const cookiesRouter = require("./routes/cookies.router")

const authMdw = require("./middleware/auth.middleware")

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: "secretSession",
    resave: true,
    saveUninitialized: true
}))

app.engine("handlebars", handlebars.engine())
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "handlebars")


app.use("/api/views/", viewsRouter)
app.use("/api/cookies/", cookiesRouter)
app.use("/api/session", sessionRouter)
app.use("/api/private", authMdw, (req, res) => {
    const userName = req.session.user

    return res.json({
        message: `Route protected, welcome ${userName}`
    })
})


app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
    displayRoutes(app)
})