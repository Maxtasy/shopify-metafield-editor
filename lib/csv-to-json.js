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

  const collections = [];
  const subCollections = [];

  lines.forEach((line) => {
    const [
      collection,
      subCollection,
      icon,
      title,
      subtitle,
      imageFileName,
      titleEN,
      subtitleEN,
      titleES,
      subtitleES,
      titleFR,
      subtitleFR,
      titleIT,
      subtitleIT,
    ] = line.split("\t");

    const existingCollection = collections.find(
      (item) => item.handle === collection
    );

    if (!existingCollection) {
      collections.push({
        handle: collection,
        metafield: {
          key: "collections",
          namespace: "data",
          value: [subCollection],
        },
      });
    } else {
      existingCollection.metafield.value.push(subCollection);
    }

    const existingSubCollection = subCollections.find(
      (item) => item.handle === subCollection
    );

    const value = {
      title: {
        de: title,
        en: titleEN,
        fr: titleFR,
        es: titleES,
        it: titleIT,
      },
      subtitle: {
        de: subtitle !== "" ? subtitle : null,
        en: subtitleEN,
        fr: subtitleFR,
        es: subtitleES,
        it: subtitleIT,
      },
      image: {
        filename: imageFileName.replace("\r", ""),
      },
      icon: icon !== "" ? icon.replace(".svg", "") : null,
    };

    if (!existingSubCollection) {
      subCollections.push({
        handle: subCollection,
        metafield: {
          key: "meta",
          namespace: "data",
          value: {
            [collection]: value,
          },
        },
      });
    } else {
      existingSubCollection.metafield.value[collection] = value;
    }
  });

  writeFile(path.join(__dirname, "collections.json"), collections);
  writeFile(path.join(__dirname, "sub-collections.json"), subCollections);
};

jsonify(tsv);
