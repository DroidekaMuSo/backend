const router = require("express").Router()

router.get("/", async (req, res) => {
    try {
        const cookies = req.cookies;

        res.send(cookies);

    } catch (error) {
        console.log(error)
    }
})

router.post("/create", async (req, res) => {
    try {
        res.cookie("cookieUser", { user: `${req.body.email}` }, { maxAge: 10000 })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router