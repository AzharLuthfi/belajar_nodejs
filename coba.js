// console.log("hello world!"); // cara eksekusi di node
// 1. buka terminal
// 2. ketikkan node namaFile -> boleh pake ekstensi .js atau tidak
// 3. enter
// 4. maka akan muncul output "hello world!" di terminal

function cetakNama(nama) {
  return `Hallo, ${nama}`;
}

const PI = 3.14;
const mahasiswa = {
  nama: "Budy Hartono",
  sayHello() {
    return `Hallo Mahasiswa ini namanya ${this.nama}`;
  },
};

class Orang {
  constructor() {
    console.log("object orang telah dibuat!");
  }
}

// kalo kita punya lebih dari satu potong kode untuk di eksport pake object
// module.exports = { cetakNama: cetakNama, PI: PI };
// atau lebih singkat karena biasanya nama property dan apa yg kita kirim / export itu sama kita bisa lakukan ini
module.exports = { cetak: cetakNama, PI, mahasiswa, Orang }; // nama property adalah nama yang dipakai saat di module lain
