require('dotenv').config();
exports.config = {
    token_secret: process.env.SECRET_TOKEN,
    db_url: process.env.DB_URL
}