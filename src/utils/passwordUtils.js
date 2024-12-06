// src/utils/passwordUtils.js
const crypto = require('crypto');

// Generate a random salt
exports.generateSalt = (length = 16) => {
    return crypto.randomBytes(length).toString('hex');
};

// Hash password with salt
exports.hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(
        password,
        salt,
        1000,
        64,
        'sha512'
    ).toString('hex');
};