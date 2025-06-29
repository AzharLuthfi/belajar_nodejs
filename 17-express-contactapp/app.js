const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  readFileContact,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contacts");
const path = require("path");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs"); // secara default kita harus menyimpan file ejs di views
app.set("views", path.join(__dirname, "views")); // path ke direktori views
app.set("layout", "main-layout");

app.use(expressLayouts); // thrid party middleware
app.use(express.static(path.join(__dirname, "public"))); // build in middleware
app.use(express.urlencoded({ extended: true })); // kalo bekerja dengan post harus pake middleware ini

// konfigurasi
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash("msg"),
  });
});

// halaman form tambah data
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Tambah Data",
    layout: "layouts/main-layout",
  });
});

// proses tambah data contact
app.post(
  "/contact",
  [
    check("email", "Email Tidak Valid!").isEmail(),
    check("nohp", "No HP Tidak Valid!").isMobilePhone("id-ID"),
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Contact Sudah Digunakan!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Halaman Tambah Data",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // add flash massage
      req.flash("msg", "Data Contact Berhasil Ditambahkan!");
      res.redirect("/contact"); // kalo sudah arahkan ke halaman contact
    }
  }
);

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
