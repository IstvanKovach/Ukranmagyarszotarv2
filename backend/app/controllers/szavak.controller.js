const db = require("../models");
const Szavak = db.szotar;


exports.create = (req, res) => {
  if (!req.body.szo1) {
    res.status(400).send({ message: "A tartalom nem lehet üres!" });
    return;
  }

 
  const szavak = new Szavak({
    szo1: req.body.szo1,
    szo2: req.body.szo2,
    published: req.body.published ? req.body.published : false
  });

 
  szavak
    .save(szavak)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hiba lépett fel a szavak készítése közben."
      });
    });
};


exports.findAll = (req, res) => {
  const szo1 = req.query.szo1;
  var condition = szo1 ? { szo1: { $regex: new RegExp(szo1), $options: "i" } } : {};

  Szavak.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hiba lépett fel a szavak lekérése közben."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Szavak.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Nem található ilyen szó ezzel az ID-vel: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Hiba történt a szó lekérdezése közben ezzel az ID-vel:" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "A frissítendő adatok nem lehetnek üresek!!"
    });
  }

  const id = req.params.id;

  Szavak.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Nem lehet frissíteni a szót ezzel az ID-vel: ${id}. Lehet nincs ilyen szó!`
        });
      } else res.send({ message: "A szó sikeresen frissítve lett." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Hiba történt a szó frissitésekor a következő ID-vel:" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Szavak.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Nem törölhető ezzel az ID-vel rendelkező szó: ${id}. Lehet nincs ilyen szó!`
        });
      } else {
        res.send({
          message: "A szó sikeresen törölve lett!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nem sikerült törölni a szót ezzel az ID-vel: " + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Szavak.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} A szavak sikeresen törölve lettek!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Valami hiba történt az összes szó eltávolítása közben."
      });
    });
};


exports.findAllPublished = (req, res) => {
  Szavak.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hiba történt a szavak beolvasása közben."
      });
    });
};
