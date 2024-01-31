import express, { Express } from "express";
import auth from "./auth";
import socketManager from "./server-socket";
// import multer from "multer";
// import csvParser from "csv-parser";

const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// importing models
import Book from "./models/Book";
// const User = require("./models/User");
import User from "./models/User";
// const CsvFile = require("./models/CsvFile");

// const storage = multer.memoryStorage();
// const upload = multer();

// router.post("/upload-csv", upload.single("file"), (req, res) => {
//   const multerFile: Express.Multer.File | undefined = req.file;
//   console.log("reached here 1");
//   if (multerFile) {
//     console.log("reached here 2");
//     const originalname = multerFile.originalname;
//     const buffer = multerFile.buffer;

//     const newCsvFile = new CsvFile({
//       filename: originalname,
//       content: buffer.toString(),
//     });

//     newCsvFile.save().then((file) => {
//       res.send(file);
//       console.log("file saved");
//     });
//   } else {
//     res.json({ message: "no file uploaded" });
//   }
// });

router.get("/books", (req, res) => {
  // empty selector means get all documents
  Book.find({}).then((books) => res.send(books));
});

router.post("/books", auth.ensureLoggedIn, (req, res) => {
  console.log(req.body);
  const newBook = new Book({
    title: req.body.title,
    authors: req.body.authors,
    isbn: req.body.isbn,
    pages: req.body.pages,
    dateread: req.body.dateread,
    rating: req.body.rating,
    cover: req.body.cover,
    reader_id: req.user?._id,
    publisher: req.body.publisher,
    published_date: req.body.published_date,
    preview_link: req.body.preview_link,
    description: req.body.description,
    genre: req.body.genre,
    status: req.body.status,
  });

  newBook.save().then((book) => res.send(book));
});

router.get("/users", (req, res) => {
  // empty selector means get all documents
  User.find({}).then((users) => res.send(users));
});

router.delete("/books", auth.ensureLoggedIn, (req, res) => {
  Book.findByIdAndRemove(req.body.id).then(() => res.send({}));
});

router.post("/updateUsers", (req, res) => {
  console.log(req.body.passedId);
  if (!req.user) {
    res.status(400);
    res.send({ message: "error not logged in" });
    return;
  }
  const user = req.user;
  User.updateOne({ _id: req.user._id }, { $addToSet: { blends: req.body.passedId } }).then(
     () => {
      res.send({});
    }
  );
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
