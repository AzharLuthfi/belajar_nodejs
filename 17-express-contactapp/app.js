const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { readFileContact, findContact } = require("./utils/contacts");
const path = require("path");
const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs"); // secara default kita harus menyimpan file ejs di views
app.set("views", path.join(__dirname, "views")); // path ke direktori views
app.set("layout", "main-layout");

// thrid party middleware
app.use(expressLayouts);

// build in middleware
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // dia akan otomatis nyari index.ejs di direktori views
  const mahasiswa = [
    { nama: "Rizki", npm: "1234567890" },
    { nama: "Azhar", npm: "9876543210" },
    { nama: "Budi", npm: "9876543260" },
  ];
  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Azhar Luthfiadi",
    title: "Halaman Home",
    mahasiswa,
  }); // data nama yang akan dikirim ke index.ejs
});

app.get("/about", (req, res) => {
  // ini akan nyari file about.ejs di direktori views kalo ekstensinya masih html rubah ke .ejs sesuai tamplating angine yang di pake
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  const contacts = readFileContact();

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
  });
});

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
  const nama = req.params.nama;
  const contact = findContact(nama);

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Detail Contact",
    contact,
  });
});

app.get("/product/:id/category/:ctg_id", (req, res) => {
  const id = req.params.id;
  const ctg_id = req.params.ctg_id;
  res.send(`Product ID: ${id} <br> Category ID: ${ctg_id}`);
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const kategori = req.query.kategori;

  res.send(`Pencarian untuk: ${keyword}, kategori: ${kategori}`);
});

app.use("/", (req, res) => {
  // this is the catch all route
  res.render("404");
  res.status(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
