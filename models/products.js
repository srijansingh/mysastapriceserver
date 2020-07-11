const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id : {
        type: String
    },
    title: {
        type: String,
        text: true
    },
    category: {
        type: String,
        text: true
    },
    subcategory: {
        type: String,
        text: true
    },
    brand: {
        type: String,
        text: true
    },      
    // mrp:{
    //     type:String,
    //     default:null
    // },
    price:{ 
        type: String,
        default:'Price unavailable',
        text: true
    },
    rating: {
        type: String,
        default:'Rating unavailable'
    },
    // count: {
    //     type: String,
    //     default: null
    // },
    description:{
        type: String,
        default:'Description unavailable'
    },
    allimage:{
        type: String
    },
    image:{
        type:String
    },
    link:{
        type: String
    },
    status:{
        type: String,
        default:'inactive',
        text: true
    }
},{
    timestamps : true
})

const Product = mongoose.model('amazonproduct', productSchema);
module.exports = Product;