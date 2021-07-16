const fs = require("fs");
const csv = require("csvtojson");

const csvFilePath = "./metafields.csv";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync("metafields.json", JSON.stringify(jsonObj, null, 2));
  });
