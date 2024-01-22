import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
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

router.get("/test", (req, res) => {
  res.send({ message: "the API is working!" });
});

// GET books
router.get("/books", (req, res) => {
  // const user = req.user;
  res.send({ message: "getting user's books" });
});

// POST a book
router.post("/books", (req, res) => {
  // const user = req.user;
  // smth like user.getBooks().push(newBook);
  res.send({ message: "pushing new book into user's books" });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
