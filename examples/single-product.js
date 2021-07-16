const MetafieldEditor = require("../metafield-editor");

const data = require("./single-product.json");

const key = "meta";
const namespace = "data";
const type = "json_string";

MetafieldEditor.create({
  resource: "products",
  resourceId: data.productId,
  key,
  namespace,
  type,
  value: JSON.stringify(data),
});
