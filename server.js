import 'dotenv/config';
import mongoose from './config/mongoose';
import bodyParser from 'body-parser'
import express from 'express';
import routes from './src/controllers/request'


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());

routes(app);

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
