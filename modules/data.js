const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://bsunnatov:87bjJfs0fx0o88GH@cluster0.uli3h.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url);
mongoClient.connect().then(mongoClient => {
    console.log("Подключение установлено");
    console.log(mongoClient.options.dbName); // получаем имя базы данных
    const db = mongoClient.db("test");
    const collection = db.collection("todos");
    const count =  collection.countDocuments().then(a=>{
        console.log(a)
    });
    
});