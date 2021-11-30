const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  // const collection = client.db("test").collection("devices");
  const db = client.db("test");

  db.command({ ping: 1 }, function (err, result) {
    if (!err) {
      console.log("Подключение с сервером успешно установлено");
      console.log(result);
    } else {
      console.log(err);
    }

    client.close();
  });
});
