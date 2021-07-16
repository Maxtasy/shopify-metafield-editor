const MetafieldEditor = require("../metafield-editor");

const data = require("../collections-and-products.json");

const key = "meta";
const namespace = "data";
const type = "json_string";

let index = 0;

// loop over data elements
const interval = setInterval(() => {
  MetafieldEditor.create({
    resource: "products",
    resourceId: data[index].productId,
    key,
    namespace,
    type,
    value: JSON.stringify(data[index]),
  });

  index += 1;
  if (index >= data.length) {
    clearInterval(interval);
  }
}, 500);
