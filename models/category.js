const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        category: {
            type:String
        },
        subcategory: {
            type: String
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('category', customerSchema)