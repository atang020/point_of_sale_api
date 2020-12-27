var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err

  var db = client.db('main')

  const menuCollection = db.collection('menu');
  //
  // db.collection('menu').find().toArray(function (err, result) {
  //   if (err) throw err
  //
  //   console.log(result)
  // })
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    const query = req.query;
    console.log("QERUY ", query)
    if (query) {
      const result = menuCollection.find(query).toArray()
        .then(results => {
          res.status(200).send(results);
        }).catch(error => {
          console.log("ERROR ", error)
        });
    } else {
      console.log("UMM")
      const result = menuCollection.find().toArray()
      .then(results => {
        res.status(200).send(results);
      });
    }
  });
})

module.exports = router;
