const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true },

    description: {type: String},
    updatedBy: { 
        type: mongoose.Types.ObjectId, 
        ref: "User", 
        required: true }
}, 
{ timestamp: true });

const Category = mongoose.model("category", categorySchema);

module.exports = Category;