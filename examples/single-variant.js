const MetafieldEditor = require("../metafield-editor");

const data = require("./single-variant.json");

const key = "meta";
const namespace = "data";
const type = "json_string";

MetafieldEditor.create({
  resource: "variants",
  resourceId: data.variantId,
  key,
  namespace,
  type,
  value: JSON.stringify(data),
});
