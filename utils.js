const fs = require("fs");
const path = require("path");

const booksDbPath = path.join(__dirname, "db", "books.json");
const usersDbPath = path.join(__dirname, "db", "users.json");

const AuthenticateUser = async (req, res, authHeader) => {
  fs.readFile(usersDbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(400);
      res.end("An error occurred.");
    }

    const userCred = JSON.parse(authHeader);
    const users = JSON.parse(data);

    const user = users.find(
      (user) =>
        user.username === userCred.username &&
        user.password === userCred.password
    );

    if (!user) {
      res.setHeader("Content-Type", "application/json");
      res.writeHeader(404);
      res.end(JSON.stringify({ message: "Invalid Credentials" }));
      return;
    }

    return user;
  });
};

const GetAllBooks = (req, res) => {
  fs.readFile(booksDbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(400);
      res.end("An error occurred.");
    }

    res.end(data);
  });
};

const AddNewBook = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const newBook = JSON.parse(parsedBook);

    fs.readFile(booksDbPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(400);
        res.end("An error occurred.");
      }

      const oldBooks = JSON.parse(data);
      const allBooks = [...oldBooks, { sn: oldBooks.length, ...newBook }];

      fs.writeFile(booksDbPath, JSON.stringify(allBooks), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal server error, could not save book to database.",
            })
          );
        }

        res.end(JSON.stringify(newBook));
      });
    });
    res.end();
  });
};

const UpdateBook = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const detailsToUpdate = JSON.parse(parsedBook);
    const bookId = detailsToUpdate.sn;

    fs.readFile(booksDbPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(400);
        res.end("An error occurred.");
      }

      let oldBooks = JSON.parse(data);
      const bookIndex = oldBooks.findIndex((oldBook) => oldBook.sn === bookId);

      oldBooks[bookIndex] = { ...oldBooks[bookIndex], ...detailsToUpdate };

      fs.writeFile(booksDbPath, JSON.stringify(oldBooks), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal server error, could not save book to database.",
            })
          );
        }

        res.end(JSON.stringify(oldBooks));
      });
    });
    res.end();
  });
};

const DeleteBook = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const detailsToUpdate = JSON.parse(parsedBook);
    const bookId = detailsToUpdate.sn;

    fs.readFile(booksDbPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(400);
        res.end("An error occurred.");
      }

      let oldBooks = JSON.parse(data);

      const newBooks = oldBooks.filter((book) => book.sn !== bookId);

      fs.writeFile(booksDbPath, JSON.stringify(newBooks), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal server error, could not save book to database.",
            })
          );
        }

        res.end(JSON.stringify(newBooks));
      });
    });
    res.end();
  });
};

const GetAuthors = (req, res) => {
  fs.readFile(booksDbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(400);
      res.end("An error occurred.");
    }

    let authors = JSON.parse(data).map((book) => book.author);

    const parsedAuthors = JSON.stringify(authors);
    res.end(parsedAuthors);
  });
};

const GetAuthor = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const detailsToUpdate = JSON.parse(parsedBook);
    const bookId = detailsToUpdate.sn;

    fs.readFile(booksDbPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(400);
        res.end("An error occurred.");
      }

      let oldBooks = JSON.parse(data);
      const book = oldBooks.find((oldBook) => oldBook.sn === bookId);

      const parsedAuthor = JSON.stringify(book.author);

      res.end(parsedAuthor);
    });
    res.end();
  });
};

const AddAuthor = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const newBook = JSON.parse(parsedBook);

    fs.readFile(booksDbPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(400);
        res.end("An error occurred.");
      }

      const oldBooks = JSON.parse(data);
      const allBooks = [...oldBooks, { sn: oldBooks.length, ...newBook }];

      fs.writeFile(booksDbPath, JSON.stringify(allBooks), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal server error, could not save book to database.",
            })
          );
        }

        res.end(JSON.stringify(newBook));
      });
    });
    res.end();
  });
};

const UpdateAuthor = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBook = Buffer.concat(body).toString();
    const detailsToUpdate = JSON.parse(parsedBook);
    const bookId = detailsToUpdate.sn;

    fs.readFile(booksDbPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(400);
        res.end("An error occurred.");
      }

      let oldBooks = JSON.parse(data);
      const bookIndex = oldBooks.findIndex((oldBook) => oldBook.sn === bookId);

      oldBooks[bookIndex] = { ...oldBooks[bookIndex], ...detailsToUpdate };

      fs.writeFile(booksDbPath, JSON.stringify(oldBooks), (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              message:
                "Internal server error, could not save book to database.",
            })
          );
        }

        res.end(JSON.stringify(oldBooks));
      });
    });
    res.end();
  });
};

module.exports = {
  AuthenticateUser,
  GetAllBooks,
  AddNewBook,
  UpdateBook,
  DeleteBook,
  GetAuthors,
  GetAuthor,
  AddAuthor,
  UpdateAuthor,
};
