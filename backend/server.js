const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Kapcsolat létrehozva az adatbázissal!");
  })
  .catch(err => {
    console.log("Nem sikerült kapcsolódni az adatbázishoz!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require("./app/routes/szotar.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`A szerver a ${PORT} porton fut.`);
});
