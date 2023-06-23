const router = require("express").Router();

router.get("/", (req, res) => {
    try {
        res.json({
            cookie: req.cookies
        })
    } catch (error) {
        console.log(error)
    }
})

router.post("/create", (req, res) => {
    res.cookie("cookieUser", {
        user: `${req.body.email}`
    },
        { maxAge: 20000 }).send();
})

module.exports = router