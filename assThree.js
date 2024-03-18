const http = require("http");
const fs = require("fs");
const path = require("path");
const {
  AuthenticateUser,
  GetAllBooks,
  AddNewBook,
  UpdateBook,
  DeleteBook,
  GetAuthors,
  GetAuthor,
  AddAuthor,
  UpdateAuthor,
} = require("./utils");

const booksDbPath = path.join(__dirname, "db", "books.json");

const PORT = 4000;

const HOSTNAME = "localhost";

const requestHandler = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.setHeader("Content-Type", "application/json");
    res.writeHeader(400);
    res.end(JSON.stringify({ message: "Authorization Error" }));
    return;
  }

  await AuthenticateUser(req, res, authHeader);

  if (req.url === "/books" && req.method === "GET") {
    GetAllBooks(req, res);
  } else if (req.url === "/books" && req.method === "POST") {
    AddNewBook(req, res);
  } else if (req.url === "/books" && req.method === "PUT") {
    UpdateBook(req, res);
  } else if (req.url === "/books" && req.method === "DELETE") {
    DeleteBook(req, res);
  } else if (req.url === "/books/authors" && req.method === "GET") {
    GetAuthors(req, res);
  } else if (req.url === "/books/author" && req.method === "GET") {
    GetAuthor(req, res);
  } else if (req.url === "/books/author" && req.method === "POST") {
    AddAuthor(req, res);
  } else if (req.url === "/books/author" && req.method === "PUT") {
    UpdateAuthor(req, res);
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, HOSTNAME, () => {
  booksDb = JSON.parse(fs.readFileSync(booksDbPath, "utf8"));
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
});
