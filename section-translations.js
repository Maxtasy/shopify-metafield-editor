const MetafieldEditor = require("./metafield-editor");
const fs = require("fs");
const arr = require("./section-translations.json");

const key = "homepage";
const namespace = "translations";
const type = "json_string";

// bring metafield in the right format
const obj = {};

arr.forEach(({ sectionId, ...element }) => {
  obj[sectionId] = element;
});

// update metafield in shopify
MetafieldEditor.create({
  key,
  namespace,
  type,
  value: JSON.stringify(obj),
});
