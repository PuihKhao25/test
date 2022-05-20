require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001

const signUpRouter = require("./router/auth");
const mongoose = require('mongoose');

const methodOverride = require('method-override')

const connectDB = require('./data/connectDB')

connectDB()

app.use(methodOverride('_method'))
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
// console.log(path.join(__dirname, i))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/', signUpRouter)

app.listen(PORT, () => console.log(`run success ${PORT}`))