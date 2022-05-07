const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Sikeres kapcsolat a MongoDB-vel.");
    initial();
  })
  .catch(err => {
    console.error("Kapcsolat hiba", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Üdvözöllek az alkalmazásomban." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


  const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`A szerver ${PORT} -as porton fut.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("'user' hozzáadva a roles gyűjteményhez");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("'moderator' hozzáadva a roles gyűjteményhez");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("'admin' hozzáadva a roles gyűjteményhez");
      });
    }
  });
}