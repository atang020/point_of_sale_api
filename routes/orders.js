var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err

  var db = client.db('main')

  const menuCollection = db.collection('orders');
  //
  // db.collection('menu').find().toArray(function (err, result) {
  //   if (err) throw err
  //
  //   console.log(result)
  // })

  /* GET orders listing. */
  router.get('/', function(req, res, next) {
    const params = req.params;
    if (params) {

    }
    const result = menuCollection.find().toArray()
      .then(results => {
        res.status(200).send(results);
      });
  });

  router.post('/', function(req, res, next) {
    const body = req.body;
    body.completedOrder = false;

    const result = menuCollection.insertOne(body).then(results => {
        res.status(200).send(results);
      });
  });
})

module.exports = router;
