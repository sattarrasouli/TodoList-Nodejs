const express = require("express")
const router = express.Router()
const { register, login } = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")

const { validateRegistration, validateLogin } = require("../middleware/validationMiddleware");

router.post("/register", validateRegistration, register)
router.post('/login', validateLogin, login);

router.get('/me', authMiddleware, (req, res) => {
    res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
    })
})

module.exports = router;