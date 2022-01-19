const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/testing")
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("DB Error: " + err.message));



module.exports = mongoose

//in connection configuration when depreciation occur, set {useNewUrlParser:true, useUnifiedTopology:true}