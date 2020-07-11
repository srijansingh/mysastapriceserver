const Product = require("../models/products");
const Category = require("../models/category");
const Customer = require("../models/customer");

//Product 

exports.insertCategory = (req, res, next) => {
  const subCategory = req.body.subcategory;
  const category = req.body.category;

  const cat = new Category({
    subcategory:subCategory,
    category:category
  })

  cat.save()
  .then(result => {
    res.status(200).json({
      post : result
    });
  });
}


exports.getAllProduct = (req, res, next) => {
    Product.find()
    .then(result => {
      console.log(result)
      res.status(200).json(
          {
        post : result.length
      });
    })
    .catch(err => {
      console.log(err)
    })
};

  
exports.getSingleProduct = (req, res, next) => {
    const id = req.params.id
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


// Get Active Product

exports.getAllActiveProduct = (req, res, next) => {
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
};


// Category db.sales.aggregate( [ { $group : { _id : "$item" } } ] )

exports.getAllCategory = (req, res, next) => {
    Product.distinct("category")
    .then(result => {
        console.log(result);
        res.status(200).json({
            category : result
        })
    })
}


exports.getCategoryProduct = (req, res, next) => {
  const searchItem = req.body.category;
  console.log(req.body)
  Product.find({"category" : `${searchItem}`})
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



exports.getAllProductBrand = (req, res, next) => {
    Product.aggregate([{$group : {_id : "$brand"}}])
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
};



exports.getBrandProduct = (req, res, next) => {
  const searchItem = req.body.category;
  console.log(req.body)
  Product.find({"brand" : `${searchItem}`})
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


// Search Item 

exports.getSearchResult = (req, res, next) => {
    const searchItem = req.body.searchItem;
    console.log(req.body)
    Product.find({ $text: { $search: `${searchItem}` } })
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




// Update the status

exports.activePosts = (req,res,next) => {
  const id = req.body.id;
  const status = 'active'
  Product.findById(id)
  .then(post => {
    if(!post){
      const error = new Error('Could not find');
      error.statusCode = 404;
      throw error;
    }
    post.status = status
    return post.save();
  })
  .then(result => {
    res.status(200).json({
      message : 'Successfully updated',
      post : result
    })
  })
  .catch(err => {
    console.log(err)
  })
}



// Count Products

exports.countAll = (req, res, next) => {
  Product.find().count()
  .then(response => {
    res.status(200).json({
      count : response
    })
  })
}


exports.countCat = (req, res, next) => {
  Product.distinct("category")
    .then(result => {
        console.log(result);
        res.status(200).json({
            count : result.length
        })
    })
}


exports.countActive = (req, res, next) => {
  Product.find({"status" : "active"}).count()
  .then(response => {
    res.status(200).json({
      count : response
    })
  })
}


exports.countBrand = (req, res, next) => {
  Product.aggregate([{$group : {_id : "$brand"}}])
    .then(result => {
      console.log(result)
      res.status(200).json(
          {
        count : result.length
      });
    })
    .catch(err => {
      console.log(err)
    })
}

// Count Finish


//Get All Customer

exports.getAllCustomer = (req, res, next) => {
  Customer.find()
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
};
