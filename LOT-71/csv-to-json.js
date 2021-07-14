const path = require("path");
const fs = require("fs");

const readFile = (filename) => fs.readFileSync(filename, "utf8");
const writeFile = (filename, body) => {
  return fs.writeFileSync(filename, JSON.stringify(body));
};

const tsv = readFile(path.join(__dirname, "data.tsv"));

const jsonify = (csv) => {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");

  lines.shift();

  const items = [];

  lines.forEach((line) => {
    line = line.replace("\r", "");

    const [productId, variantId, imageFilename, ticket] = line.split("\t");

    const view = ticket === "LOT-101" ? "teaser" : "details";
    const sectionId =
      ticket === "LOT-101" ? "16251575067804c1d5" : "162516559369888fde";

    const value = {
      view,
      subtitle: {
        de: "Subtitle (German)",
        en: null,
        es: null,
        fr: null,
        it: null,
      },
      image: {
        filename: imageFilename,
      },
    };

    const existingItem = items.find(
      (item) => item.productId === productId && item.variantId === variantId
    );

    if (!existingItem) {
      items.push({
        productId,
        variantId: variantId !== "" ? variantId : null,
        metafield: {
          [sectionId]: value,
        },
      });
    } else {
      console.log(existingItem.metafield);
      existingItem.metafield[sectionId] = value;
    }
  });

  writeFile(path.join(__dirname, "items.json"), items);
};

jsonify(tsv);
