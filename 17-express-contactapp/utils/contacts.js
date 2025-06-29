// contact App
const fs = require("fs");

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

// fungsi untuk menampilkan detail berdasarkan nama
function findContact(nama) {
  const contacts = readFileContact();
  const contact = contacts.find((contact) => contact.nama === nama);
  return contact;
}

// fungsi untuk menuliskan data ke file contacts.json
const saveContacts = (contacts) => {
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), "utf8");
};

// fungsi untuk menambahkan contact baru
function addContact(contact) {
  const contacts = readFileContact();
  contacts.push(contact);
  saveContacts(contacts);
}

// fungsi untuk cek duplikasi nama contact
function cekDuplikat(nama) {
  const contacts = readFileContact();
  return contacts.find((contact) => contact.nama === nama);
}

module.exports = { readFileContact, findContact, addContact, cekDuplikat };
