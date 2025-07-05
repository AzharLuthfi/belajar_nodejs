const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
var methodOverride = require("method-override");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// require express-validator
const { body, check, validationResult } = require("express-validator");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const PORT = 3000;

// setup method overide
app.use(methodOverride("_method"));

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
app.use(express.urlencoded({ extended: true }));

// gunakan ejs
app.set("view engine", "ejs"); // secara default kita harus menyimpan file ejs di views
app.set("views", path.join(__dirname, "views")); // path ke direktori views
app.set("layout", "main-layout");
app.use(expressLayouts); // thrid party middleware
app.use(express.static(path.join(__dirname, "public"))); // build in middleware

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

// halaman about
app.get("/about", (req, res) => {
  // ini akan nyari file about.ejs di direktori views kalo ekstensinya masih html rubah ke .ejs sesuai tamplating angine yang di pake
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render("contact", {
      layout: "layouts/main-layout",
      title: "Halaman Contact",
      contacts,
      msg: req.flash("msg"),
    });
  } catch (err) {
    res.send("Terjadi error: " + err.message);
  }
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
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama Contact Sudah Digunakan!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Halaman Tambah Data",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        // add flash massage
        req.flash("msg", "Data Contact Berhasil Ditambahkan!");
        res.redirect("/contact"); // kalo sudah arahkan ke halaman contact
      });
    }
  }
);

app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    // add flash massage
    req.flash("msg", "Data Contact Berhasil Dihapus!");
    res.redirect("/contact"); // kalo sudah arahkan ke halaman contact
  });
});

// halaman edit data
app.get("/contact/edit/:nama", async (req, res) => {
  const nama = req.params.nama; // ambil parameter nama dari url
  const contact = await Contact.findOne({ nama: nama }); // cari di file data contact

  if (!contact) {
    return res.status(404).render("404", {
      layout: "layouts/main-layout",
      title: "404 Not Found!",
    });
  } else {
    res.render("edit-contact", {
      layout: "layouts/main-layout",
      title: "Edit Contact",
      contact,
    });
  }
});

// prosess ubah data
app.put(
  "/contact",
  [
    check("email", "Email Tidak Valid!").isEmail(),
    check("nohp", "No HP Tidak Valid!").isMobilePhone("id-ID"),
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Contact Sudah Digunakan!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Halaman Edit Data",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body, // untuk menampilkan data kembali di form
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // add flash massage
        req.flash("msg", "Data Contact Berhasil Diedit!");
        res.redirect("/contact"); // kalo sudah arahkan ke halaman contact
      });
    }
  }
);

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  try {
    const nama = req.params.nama;
    // const contact = findContact(nama);
    const contact = await Contact.findOne({ nama: nama });

    res.render("detail", {
      layout: "layouts/main-layout",
      title: "Detail Contact",
      contact,
    });
  } catch (err) {
    res.send("Terjadi error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
