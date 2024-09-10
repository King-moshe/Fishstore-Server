const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../../config/secrets');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    date_created: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'owner']
    },
});

exports.UserModel = mongoose.model('users', userSchema);

exports.createToken = (user_id, role) => {
    let token = jwt.sign({ _id: user_id, role: role }, config.token_secret, { expiresIn: '500mins' });
    return token;
}

exports.validateUser = (_reqBody)=>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        email:Joi.string().min(2).max(100).email().required(),
        phone:Joi.string().min(2).max(100).required(),
        password:Joi.string().min(4).max(100).required(),
    });
    return joiSchema.validate(_reqBody);
}

exports.validateLogin = (_reqBody)=>{
    let joiSchema = Joi.object({
        email:Joi.string().min(2).max(100).email().required(),
        password:Joi.string().min(4).max(100).required(), 
    })
    return joiSchema.validate(_reqBody);
}