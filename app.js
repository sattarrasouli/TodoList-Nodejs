const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./src/config/database")

dotenv.config()

const app = express()

connectDB()

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('JWT_SECRET is not defined');
    process.exit(1); // Exit if the variable is missing
}

app.use(express.json())

const authRoutes = require("./src/routes/authRoutes");
const todoRoutes = require("./src/routes/todoRoutes")

app.use('/api/auth', authRoutes)
app.use("/api/todos", todoRoutes)

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke')
})

module.exports = app;