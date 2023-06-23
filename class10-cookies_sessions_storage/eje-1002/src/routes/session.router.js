const router = require("express").Router()

router.get("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (userName !== "diego" || password !== "12345") {
            return res.json({
                message: "Invalid credentials"
            })
        }

        req.session.userName = userName
        req.session.admin = true

        return res.json({
            message: "Login succesfully"
        })

    } catch (error) {
        console.log(error)
    }
})

router.get("/logOut", async (req, res) => {
    try {

        req.session.destroy((err) => {
            if (!err) {
                return res.json({
                    message: "Log out error", body: err
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/welcome", async (req, res) => {
    try {
        
        const { name } = req.query
        const counter = req.session?.counter

        if (!counter) {
            req.session.counter = 1

            return res.send(`Welcome ${name}`)
        }

        req.session.user = name
        req.session.admin = true
        req.session.counter++

        return res.send(`${name} has login succexfully ${req.session.counter} times`)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router