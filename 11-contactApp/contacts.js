// contact App
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf8");
}

// membuat function untuk membaca dan memparse data dari file contacts.js
function readFileContact() {
  const fileBuffer = fs.readFileSync(filePath, "utf8");
  const fileJSON = JSON.parse(fileBuffer);
  return fileJSON;
}

// fungsi simpan contact
const simpanContact = (nama, email, noHp) => {
  const datacontact = { nama, email, noHp };
  if (fs.existsSync("data/contacts.json")) {
    try {
      // panggil fungsi readFileContact
      const contacts = readFileContact();
      // validasi data nama apakh ada yang duplikat
      const duplikat = contacts.find((contact) => contact.nama === nama);
      if (duplikat) {
        console.log(
          chalk.bgRed.magenta.bold("Nama sudah ada, silakan ganti nama lainnya")
        );
        return;
      }
      // validasi data email apakah sesuai format email dimana email boleh kosong
      if (email !== "") {
        if (!validator.isEmail(email)) {
          console.log(chalk.bgRed.magenta.bold("Email tidak valid"));
          return;
        }
      }
      // validasi data noHp apakah sesuai format noHp dimana noHp tidak boleh kosong
      if (!validator.isMobilePhone(noHp)) {
        console.log(chalk.bgRed.magenta.bold("Nomor HP tidak valid"));
        return;
      }

      contacts.push(datacontact); // 4. push data contact ke array contacts
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf-8"); // 5. tuliskan data baru dari variable contacts ke dalam file tujuan
      console.log(chalk.bgGreenBright.green.bold("data telah ditambahkan!"));
    } catch (error) {
      console.log(
        chalk.bgRed.magenta.bold("data tidak bisa ditambahkan") + error
      );
    }
  } else {
    console.log(chalk.bgRed.magenta.bold("direktori tidak ditemukan"));
  }
};

// fungsi menampilkan semua data nama dan nomor contact
const listContact = () => {
  if (fs.existsSync("data/contacts.json")) {
    try {
      // panggil fungsi readFileContact
      const contacts = readFileContact();
      console.log(chalk.green.bold("List Contact:"));
      contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${chalk.blue(contact.nama)} - ${contact.noHp}`);
      });
    } catch (error) {
      console.log(
        chalk.bgRed.magenta.bold("data tidak bisa ditampilkan") + error
      );
    }
  }
};

// fungsi untuk menampilkan detail berdasarkan nama
const detailContact = (nama) => {
  if (fs.existsSync("data/contacts.json")) {
    try {
      // panggil fungsi readFileContact
      const contacts = readFileContact();
      const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
      );
      if (contact) {
        console.log(chalk.green.bold("Detail Contact:"));
        console.log(`Nama: ${chalk.blue(contact.nama)}`);
        console.log(`Nomor HP: ${chalk.blue(contact.noHp)}`);
        if (contact.email) {
          console.log(`Email: ${chalk.blue(contact.email)}`);
        }
      } else {
        console.log(chalk.bgRed.magenta.bold("data tidak ditemukan"));
      }
    } catch (error) {
      console.log(
        chalk.bgRed.magenta.bold("data tidak bisa ditampilkan") + error
      );
    }
  }
};

// fungsi untuk menghapus data dengan parameter  nama
const hapusContact = (nama) => {
  if (fs.existsSync("data/contacts.json")) {
    try {
      // panggil fungsi readFileContact
      const contacts = readFileContact();
      const contactIndex = contacts.findIndex(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
      );
      // kalo enggak pake .findIndex() bisa pake filter() -- > ini akan mengembalikan array baru
      // dimana akan berisi data selain data yang kita cari
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);
        fs.writeFileSync(
          "data/contacts.json",
          JSON.stringify(contacts, null, 2)
        );
        console.log(chalk.green.bold("Data berhasil dihapus"));
      } else {
        console.log(chalk.bgRed.magenta.bold("data tidak ditemukan"));
      }
    } catch (error) {
      console.log(chalk.bgRed.magenta.bold("data tidak bisa dihapus") + error);
    }
  }
};

module.exports = { simpanContact, listContact, detailContact, hapusContact };
