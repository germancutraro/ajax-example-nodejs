const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

mongoose.connect('mongodb://localhost/ajaxNode', {useMongoClient: true});
mongoose.connection.on('open', () => console.log('Connected!'));
mongoose.connection.on('error', () => console.log('Error to connected to the database!'));
mongoose.Promise = global.Promise;
let userSchema = new mongoose.Schema({
  name: String,
  surname: String
});

let User = mongoose.model('users', userSchema);

app.post('/add', (req, res) => {
  User.create({name: req.body.name, surname: req.body.surname}).then( () => {
    res.send(`${req.body.name} Saved!`);
  }).catch(err => res.send('Error'));
});

app.listen(3000, err => console.log('Running!'));
