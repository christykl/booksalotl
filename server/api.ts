import express, { Express } from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import multer from "multer";
import csvParser from "csv-parser";

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
const Book = require("./models/Book");
const User = require("./models/User");
const CsvFile = require("./models/CsvFile");

const storage = multer.memoryStorage();
const upload = multer();

router.post("/upload-csv", upload.single('file'), (req, res) => {
  const multerFile: Express.Multer.File | undefined = req.file;
  console.log("reached here 1");
  if (multerFile) {
    console.log("reached here 2");
    const originalname = multerFile.originalname;
    const buffer = multerFile.buffer;

    const newCsvFile = new CsvFile({
      filename: originalname,
      content: buffer.toString(),
    });

    newCsvFile.save().then((file) => {
      res.send(file);
      console.log("file saved");
    });
  }
  else {
    res.json({ message: 'no file uploaded'})
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
