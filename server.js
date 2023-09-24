var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

app.use("/",require('./routes'));

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);

})

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });