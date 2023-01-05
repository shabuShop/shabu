const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));



//-------------------------------
app.use('/admin', adminRoutes);
app.use('/user',userRoutes);

app.use(loginRoutes);

app.use(errorController.get404Page);
//-------------------------------

app.listen(3000);
