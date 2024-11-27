const http = require("http");
const conn = require("./db");
const PORT = 8080;

const server = http.createServer((req, res) => {
  const urlParts = req.url.split("/");

 
   if (
    urlParts[1] === "books" &&
    urlParts[2] === "recommendations" &&
    req.method === "GET"
  ) {
    const recommendationQuery = 'SELECT * FROM "Books" WHERE "Id" = $1';
    const values=[1];
    conn.query(recommendationQuery, values, (err, result) => {
      if (err) {
        console.error("Error fetching recommendation", err);
        res.statusCode = 500;
        res.end("Failed to fetch recommendation");
      } else {
        if (result.rows.length > 0) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result.rows[0]));
        } else {
          res.statusCode = 404;
          res.end("No book found with Id = 1");
        }
      }
    });}
 else if (urlParts[1] === "books" && req.method === "GET") {
    conn.query('SELECT * FROM "Books"', (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        res.statusCode = 500;
        res.end("Failed to fetch books");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result.rows));
      }
    });
  }

  else if (urlParts[1] === "books" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const { title, author, isbn, publishedYear } = JSON.parse(body);

        if (!title || !author || !isbn || !publishedYear) {
          res.statusCode = 400;
          res.end(
            "All fields (Title, Author, ISBN, PublishedYear) are required."
          );
          return;
        }

        const insert = `
                INSERT INTO "Books" ("Title", "Author", "ISBN", "PublishedYear")
                VALUES ($1, $2, $3, $4)
            `;
        const values = [title, author, isbn, publishedYear];

        conn.query(insert, values, (err, result) => {
          if (err) {
            console.error("Error inserting data", err);
            res.statusCode = 500;
            res.end("Failed to insert book");
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Book inserted successfully" }));
          }
        });
      } catch (err) {
        console.error("Invalid JSON body:", err);
        res.statusCode = 400;
        res.end("Invalid JSON format");
      }
    });
  } else if (urlParts[1] === "books" && req.method === "PUT" && urlParts[2]) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const { title, author, isbn, publishedYear } = JSON.parse(body);

        if (!title || !author || !isbn || !publishedYear) {
          res.statusCode = 400;
          res.end(
            "All fields (Title, Author, ISBN, PublishedYear) are required."
          );
          return;
        }

        const update = `
        UPDATE "Books"
        SET "Title" = $1, "Author" = $2, "ISBN" = $3, "PublishedYear" = $4
        WHERE "Id" = $5
      `;
        const values = [title, author, isbn, publishedYear, urlParts[2]];

        conn.query(update, values, (err, result) => {
          if (err) {
            console.error("Error updating data", err);
            res.statusCode = 500;
            res.end("Failed to update book");
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end("Book updated successfully");
          }
        });
      } catch (err) {
        console.error("Invalid JSON body:", err);
        res.statusCode = 400;
        res.end("Invalid JSON format");
      }
    });
  } else if (
    urlParts[1] === "books" &&
    req.method === "DELETE" &&
    urlParts[2]
  ) {
    const deleteQuery = 'DELETE FROM "Books" WHERE "Id" = $1';
    const values = [urlParts[2]];

    conn.query(deleteQuery, values, (err, result) => {
      if (err) {
        console.error("Error deleting data", err);
        res.statusCode = 500;
        res.end("Failed to delete book");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Book deleted successfully");
      }
    });
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
