const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const charactersRouter = require('./routes/characters');
const userRouter = require('./routes/user');
const schema = require('./graph/schema');
const auth = require('./auth');

const host = 'localhost';

mongoose.connect(`mongodb://${host}:27017/rickmorty`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('Connected to DataBase')
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use('/characters', auth, charactersRouter);

module.exports = app;
