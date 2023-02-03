const handleRegister = (req, res, db, becrypt) => {
  const { name, email, password } = req.body;
  const hash = becrypt.hashSync(password);

  // transaction are used when two actions are co dependent,
  // if one fails,the other automatically fails,
  // this allows us to remove data insertion anomalities.
  db.transaction((trx) => {
    db.insert({
      hash: hash,
      email: email,
    })
      .into("login")
      .transacting(trx)
      .then(() => {
        return db("users")
          .insert({
            email: email,
            name: name,
            joined: new Date(),
          })
          .transacting(trx);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then((id) => {
      // after success of all ops,id of inserted is returned
      db.select("*")
        .from("users")
        .then((data) => res.json(data[data.length - 1])); //selecting and responding with that user
    })
    .catch((err) => {
      res.status(400).json("Unable");
    });
};

module.exports = {
  handleRegister: handleRegister,
};
