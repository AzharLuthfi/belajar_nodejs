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

// fungsi simpan contact
const simpanContact = (nama, email, noHp) => {
  const datacontact = { nama, email, noHp };
  if (fs.existsSync("data/contacts.json")) {
    try {
      // 1. ceks direktori tujuan ada enggak
      const data = fs.readFileSync("data/contacts.json", "utf-8"); // 2. baca data dari directory
      const contacts = JSON.parse(data); // 3. rubah data string yg dibaca dari direktory jadi json
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

module.exports = { simpanContact };
