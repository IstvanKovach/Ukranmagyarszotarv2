exports.allAccess = (req, res) => {
    res.status(200).send("Nyilvános tartalom.");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("Felhasználói tartalom.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin tartalom.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderátor tartalom.");
  };