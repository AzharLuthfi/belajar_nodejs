// contact app pake Yargs (argumen command line)
const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  hapusContact,
} = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan Kontak Baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

// menampilkan semua daftar nama & nomor contact
yargs.command({
  command: "list",
  describe: "Menampilkan list nama dan nomor hp",
  handler: () => {
    listContact();
  },
});

// menampilkan detail contact dengan arg nama sebagai parameter
yargs.command({
  command: "detail",
  describe: "Menampilkan detail contact",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    detailContact(argv.nama);
  },
});

// menghapus contact dengan arg nama sebagai parameter
yargs.command({
  command: "delete",
  describe: "Menghapus contact",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    hapusContact(argv.nama);
  },
});

yargs.parse();
