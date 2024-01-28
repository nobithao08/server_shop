const express = require('express')
const app = express()
const http = require('http').Server(app);

const cors = require("cors");
const port = 8000;
var upload = require('express-fileupload');
app.use('/', express.static('public'))
app.use(upload());

// API
const productAPI = require('./API/Router/products.router')
const userAPI = require('./API/Router/users.router')
const cartAPI = require('./API/Router/carts.router')
const historiesAPI = require('./API/Router/histories.router')
const emailAPI = require('./API/Router/email.router')
const commentAPI = require('./API/Router/comment.router')

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Boutique", {
  useFindAndModify: false,
  useCreateIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', './views');


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Tạo API
app.use('/products', productAPI)
app.use('/users', userAPI)
app.use('/carts', cartAPI)
app.use('/histories', historiesAPI)
app.use('/email', emailAPI)
app.use('/comment', commentAPI)

http.listen(port, () => {
    console.log(`listening on *: ${port}`);
});

