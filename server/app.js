const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const app = express();

app.use(morgan("dev"));

var movie;
var cache = [];

app.get("/", function (req, res, next){

  var movie = req.query;
  var key = Object.keys(movie)[0];
  var value = movie[key]
  console.log(value);

  if (cache.hasOwnProperty(value)) {
      res.send(cache[value])
  } else {

  axios.get("http://www.omdbapi.com/?apikey=8730e0e&" + key + "=" + encodeURI(value))
    .then(function(response){
      res.status(200).send(response.data);
      cache[value] = response.data;
      next();
    })
    .catch(function (error) {
      // console.log(error);
    });
  }
  
});

  


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;