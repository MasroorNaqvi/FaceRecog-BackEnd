const handleSignin = (req, res, db, becrypt) => {
  db.select("*")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = becrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((data) => {
            res.json(["SignedIn", data[0]]);
          })
          .catch((err) => {
            res.status(420).json("Unable to SignIn");
          });
      } else {
        res.status(400).json("invalid");
      }
    });
};

module.exports = {
  handleSignin: handleSignin,
};
