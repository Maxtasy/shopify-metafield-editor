const config = require("./config.json");
const axios = require("axios");
const data = require(`./${config.data_file}`);

const API_KEY = config.api_key;
const API_PASSWORD = config.api_password;
const STORE = config.store;
const METAFIELD_KEY = config.metafield_key;
const METAFIELD_NAMESPACE = config.metafield_namespace;
const METAFIELD_VALUE_TYPE = config.metafield_value_type;

function createMetafield(element) {
  const product_id = element.productID;
  const variant_id = element.variantID;

  axios
    .get(
      `https://${API_KEY}:${API_PASSWORD}@${STORE}/admin/api/2021-07/products/${product_id}.json`
    )
    .then((res) => {
      element.productHandle = res.data.product.handle;

      const value = JSON.stringify(element);

      const metafield = {
        namespace: METAFIELD_NAMESPACE,
        key: METAFIELD_KEY,
        value: value,
        value_type: METAFIELD_VALUE_TYPE,
      };

      let path;

      if (variant_id) {
        path = `/admin/api/2021-04/products/${product_id}/variants/${variant_id}/metafields.json`;
      } else {
        path = `/admin/api/2021-04/products/${product_id}/metafields.json`;
      }

      axios
        .post(`https://${API_KEY}:${API_PASSWORD}@${STORE}${path}`, {
          metafield,
        })
        .then((res) => {
          console.log(`Metafield for ${product_id} created.`);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

let index = 0;

// loop over data elements
const interval = setInterval(() => {
  createMetafield(data[index]);
  index += 1;
  if (index >= data.length) {
    clearInterval(interval);
  }
}, 500);
