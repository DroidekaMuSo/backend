const authMdw = (req, res, next) => {
    if (req.session?.user === "diego" || req.session?.admin) {
        return next
    }

    return res.status(401).json({
        message: "Unauthorized access"
    })
}

module.exports = authMdw