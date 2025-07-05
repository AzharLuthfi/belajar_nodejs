const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/coba_mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// // menambah satu data
// const contact1 = new Contact({
//   nama: "Bagas",
//   nohp: "081809962233",
//   email: "ba@mail.com",
// });

// // simpan ke collection
// contact1.save().then((contact) => console.log(contact));
