const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customer');
const Product = require("../models/products");
const Flipkart = require('../models/flipkart');


// User Signup

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed.');
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password,12)
    .then(hashPw => {
        const user = new Customer({
            email:email,
            password:hashPw,
            name:name
        });
        return user.save();
    })
    .then(result => {
        const token = jwt.sign({
            email:result.email,
            userId:result._id.toString()
        }, 
        'supersecret', 
        {expiresIn: '1h'}
        );
        res.status(200).json({
            token:token, 
            userId:result._id.toString(), 
            email:result.email})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Customer.findOne({email:email})
    .then(user => {
        if(!user){
            const error = new Error('Email not found');
            error.statusCode = 401;
            throw error;
        }
        loadeduser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email:loadeduser.email,
            userId:loadeduser._id.toString()
        }, 
        'supersecret', 
        {expiresIn: '1h'}
        );
        res.status(200).json({token:token, userId:loadeduser._id.toString(), email:loadeduser.email})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};


exports.fetchCategory = (req, res, next) => {
    Product.distinct("category")
    .then(result => {
        console.log(result);
        res.status(200).json({
            category : result
        })
    })
    .catch(err => {
        res.status(401).json({
            message: err
        })
    })
};


// exports.fetchCategory = (req, res, next) => {
//     Product.aggregate([{$match: { status: "active" }},{$group: { _id: "$category" }}, {$sort : {total: -1}}])
//     .then(result => {
//         console.log(result);
//         res.status(200).json({
//             category : result
//         })
//     })
//     .catch(err => {
//         res.status(401).json({
//             message: err
//         })
//     })
// };


exports.fetchCategoryProduct = (req, res, next) => {
    const searchItem = req.params.category;
    Product.find( { "category":`${searchItem}`})
    .then(result => {
      console.log(result)
      res.status(200).json({
        post : result
      });
    })
    .catch(err => {
      console.log(err)
    })
  };


exports.fetchActiveProduct = (req, res, next) => {
    Product.find({"status":"active"})
    .then(result => {
        console.log(result)
        res.status(200).json(
            {
        post : result
        });
    })
    .catch(err => {
        console.log(err)
    })
}


exports.fetchBrandProduct = (req, res, next) => {
    const searchItem = req.body.searchItem;
    Product.find({$and: [{"brand":`${searchItem}`},{"status":"active"}]})
    .then(result => {
        console.log(result)
        res.status(200).json(
            {
        post : result
        });
    })
    .catch(err => {
        console.log(err)
    })
}



exports.fecthSingleProduct = (req, res, next) => {
    const id = req.params._id
    Product.findById(id)
    .then(result => {
        console.log(result)
        res.status(200).json({
        post : result
        });
    })
    .catch(err => { 
        console.log(err)
    })
};



exports.fetchSearchResult = (req, res, next) => {
    const searchItem = req.body.searchItem;
    console.log(req.body)
    Flipkart.find(  { $text : { $search: `${searchItem}` } } )
    .then(result => {
      console.log(result)
      res.status(200).json({
        post : result
      });
    })
    .catch(err => {
      console.log(err)
    })
};


exports.fetchActiveSearchResult = (req, res, next) => {
    const searchItem = req.body.searchItem;
    console.log(req.body)
    Product.find({$and:[{ $text: { $search: `${searchItem}` } }, {"status":"active"}]})
    .then(result => {
      console.log(result)
      res.status(200).json({
        post : result
      });
    })
    .catch(err => {
      console.log(err)
    })
};
