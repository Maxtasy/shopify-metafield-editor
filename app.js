const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const csv = require("csvtojson");

const app = express();

app.listen(3000);

app.use(express.static(__dirname + "/public"));

// register view engine
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
  res.render("index", { title: "Index" });
});

app.get("/file_import", (req, res) => {
  res.render("file_import", { title: "File Import", metafields: null });
});

app.post("/file_import", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const oldPath = files.csv_file.path;
    const newPath = __dirname + "/uploads/" + files.csv_file.name;

    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;

      csv({
        checkType: true,
      })
        .fromFile(newPath)
        .then((metafields) => {
          res.render("file_import", { title: "File Import", metafields });
        });
    });
  });
});

app.get("/edit", (req, res) => {
  res.render("edit", { title: "Edit Metafield" });
});
