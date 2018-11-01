var MongoClient = require('mongodb').MongoClient;

var dbUrl = "mongodb://47.99.181.207:27017";

function connectDb(callback) {
    MongoClient.connect(dbUrl, {useNewUrlParser:true}, function(err,db){
        if(err) {
            console.log('数据库连接失败');
            return;
        }
        callback(db);
        db.close();
    })
}

exports.connectDb = connectDb

exports.findOne = function(dbname,collectionname,json,callback){
    connectDb(function(db) {
        const DB = db.db(dbname);
        const collection = DB.collection(collectionname);
        var result = collection.findOne(json,null,callback);
    });
}

exports.find = function(dbname,collectionname,json,callback) {
    connectDb(function(db) {
        const DB = db.db(dbname);
        const collection = DB.collection(collectionname);
        var result = collection.find(json).toArray(callback);
    });
}

exports.findCount = function(dbname,collectionname,json,callback) {
    connectDb(function(db) {
        const DB = db.db(dbname);
        const collection = DB.collection(collectionname);
        collection.find(json).count().then(res => {
            callback(null, res)
        }).catch(e => {
            callback(e, null)
        })
    });
}

exports.insertOne = function(dbname,collectionname,json,callback){
    connectDb(function(db) {
        const DB = db.db(dbname);
        const collection = DB.collection(collectionname);
        collection.insertOne(json,callback)
    })
}
