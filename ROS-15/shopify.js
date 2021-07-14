const axios = require("axios");
const config = require("../config.json");

const data = require("./data.json");

const API_KEY = config.api_key;
const API_PASSWORD = config.api_password;
const STORE = config.store;

let index = 0;

const interval = setInterval(() => {
  const {
    id,
    metafield: { key, namespace, value, valueType },
  } = data[index];

  const path = `/admin/api/2021-04/products/${id}/metafields.json`;
  const metafield = {
    key,
    namespace,
    value: typeof value !== "string" ? JSON.stringify(value) : value,
    value_type: valueType,
  };

  axios
    .post(`https://${API_KEY}:${API_PASSWORD}@${STORE}${path}`, {
      metafield,
    })
    .then((res) => {
      console.log(`Metafield for ${id} created.`);
    })
    .catch((error) => {
      console.error(error.response.data.errors);
    });

  index += 1;
  if (index >= data.length) {
    clearInterval(interval);
  }
}, 500);
