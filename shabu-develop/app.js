
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');



const errorController = require('./controllers/error.js');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', express.static(path.join(__dirname, 'public')))
app.use('/user', express.static(path.join(__dirname, 'public')))

app.use("/axios",express.static('node_modules/axios/dist'));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))



const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');






// =========== Route ===========

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.use('/',loginRoutes);
app.use('/logout',loginRoutes);

app.use(errorController.get404Page);

// =========== Route ===========


app.listen(3000);
