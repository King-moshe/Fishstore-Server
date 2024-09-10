const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name:String,
    cat_url:String,
})

exports.CategoryModel = mongoose.model('categories', categorySchema);


exports.validateCategory = (_reqBody) => {
    let joiSchema = Joi.object({
        name:Joi.string().min(1).max(60).required(),
        cat_url:Joi.string().min(1).max(40).required(),
    })
    return joiSchema.validate(_reqBody);
}