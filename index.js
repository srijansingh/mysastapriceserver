const port = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const productRoute = require("./routes/routes");
const customerRoute = require("./routes/customer");

const app = express();

app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/auth', authRoute);
app.use('/api', productRoute);
app.use('/user', customerRoute);
// Routes


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message : message, data: data})
})

mongoose.connect(
    'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority'
).then(result => {
    app.listen(port, () => {
        console.log("Server running at "+port);
    })
})
.catch(err => console.log(err))