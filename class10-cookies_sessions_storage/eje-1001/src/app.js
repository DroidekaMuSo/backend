const express = require("express")
const displayRoutes = require("express-routemap")
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config();

const viewsRouter = require("./routes/views.router.js")
const cookiesRouter = require("./routes/cookies.router.js")

const { PORT = 5_000 } = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}`, "/views"))
app.set("view engine", "handlebars")

app.use("/views", viewsRouter)
app.use("/cookies", cookiesRouter)

app.listen(PORT, () => {
    displayRoutes(app)
    console.log(`API running on port ${PORT}`)
})
