module.exports = {
    development: {
        database: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app',
        jwtSecret: process.env.JWT_SECRET || 'development_secret_key',
        port: process.env.PORT || 3000
    },
    test: {
        database: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/todo-test',
        jwtSecret: process.env.JWT_TEST_SECRET || 'test_secret_key',
        port: process.env.PORT || 4000
    },
    production: {
        database: process.env.MONGODB_URI,
        jwtSecret: process.env.JWT_SECRET,
        port: process.env.PORT || 8080
    }
};