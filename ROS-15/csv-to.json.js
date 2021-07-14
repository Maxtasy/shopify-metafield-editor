const path = require("path");
const fs = require("fs");

const TABSTOP = "\t";
const NEWLINE = "\n";
const CARRIAGE_RETURN = "\r";

const readFile = (filename) => fs.readFileSync(filename, "utf8");
const writeFile = (filename, body) => {
  return fs.writeFileSync(filename, JSON.stringify(body));
};

const csv = readFile(path.join(__dirname, "data.csv"));
const tsv = readFile(path.join(__dirname, "data.tsv"));

const jsonify = (file) => {
  const rows = file.split(NEWLINE);
  const headers = rows[0].split(TABSTOP);

  // Remove header row
  rows.shift();

  const arr = [];

  rows.forEach((row) => {
    const sanitizedRow = row.replace(CARRIAGE_RETURN, "");
    const columns = sanitizedRow.split(TABSTOP);

    arr.push({
      id: columns[0],
      metafield: {
        key: "description_subtitle",
        namespace: "product",
        value: columns[1],
        valueType: "string",
      },
    });
  });

  writeFile(path.join(__dirname, "data.json"), arr);
};

jsonify(tsv);
