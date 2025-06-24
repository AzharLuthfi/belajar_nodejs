// hanya menangani interface pertanyaan
const { tulisPertanyaan, simpanContact } = require("./contacts");
const main = async () => {
  const nama = await tulisPertanyaan("Masukkan nama kontak : ");
  const email = await tulisPertanyaan("Masukkan Email kontak : ");
  const noTelp = await tulisPertanyaan("Masukkan No Telp kontak : ");
  simpanContact(nama, email, noTelp);
};

main();
