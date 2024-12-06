const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already esxists"
            });
        }
        // create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        //generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid login credentials"
            });
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid login credentials"
            })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
        )

        res.json({
            user: {
                id: user._id,
                username: user.username
            },
            token
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}