module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      szo1: String,
      szo2: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Szavak = mongoose.model("szotar", schema);
  return Szavak;
};
