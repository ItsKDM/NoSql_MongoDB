const mongoDB = require("mongodb");
const MongoClient = mongoDB.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://khuranaraj121:Application121@cluster0.k8gajgr.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
