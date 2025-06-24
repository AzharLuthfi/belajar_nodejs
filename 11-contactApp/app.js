// contact app pake Yargs (argumen command line)
const yargs = require("yargs");
const { simpanContact } = require("./contacts");

yargs.command({
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
});

yargs.parse();
