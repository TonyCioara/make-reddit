const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.process || 3000;

const indexRouter = require('./controllers/index.js');
const postRouter = require('./controllers/posts.js');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/posts', postRouter);

app.listen(PORT, function() {
    console.log('Express server listening on port: ', PORT);
});