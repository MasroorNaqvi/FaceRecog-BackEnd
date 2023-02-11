const handleimage = (req, res, db) => {
  const { id } = req.body;
  console.log(id);

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .then(() => {
      db.select("entries")
        .from("users")
        .where("id", "=", id)
        .then((entriesArr) => res.json(entriesArr[0].entries));
    })
    .catch((err) => {
      res.status(404).json("Unable to get entries");
    });
};

module.exports = {
  handleimage: handleimage,
};
