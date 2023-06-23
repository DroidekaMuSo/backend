const router = require("express").Router()

router.get("/", async (req, res) => {
    try {
        const cookie = req.cookies

        res.render("cookie", { cookie })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router