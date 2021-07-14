const axios = require("axios");
const config = require("../config.json");

const collections = require("./collections.json");
const subCollections = require("./sub-collections.json");

const collectionData = [...collections, ...subCollections];

const API_KEY = config.api_key;
const API_PASSWORD = config.api_password;
const STORE = config.store;

let index = 0;

const interval = setInterval(() => {
  const {
    handle,
    metafield: { key, namespace, value },
  } = collectionData[index];
  const customCollectionPath = `/admin/api/2021-04/custom_collections.json?limit=250`;
  const smartCollectionPath = `/admin/api/2021-04/smart_collections.json?limit=250`;

  axios
    .get(`https://${API_KEY}:${API_PASSWORD}@${STORE}${customCollectionPath}`)
    .then(({ data }) => {
      const match = data.custom_collections.find(
        (collection) => collection.handle === handle
      );

      if (match) {
        const path = `/admin/api/2021-04/collections/${match.id}/metafields.json`;
        const metafield = {
          key,
          namespace,
          value: JSON.stringify(value),
          value_type: "json_string",
        };

        axios
          .post(`https://${API_KEY}:${API_PASSWORD}@${STORE}${path}`, {
            metafield,
          })
          .then(() => {
            console.log(`Metafield for ${handle} created.`);
          })
          .catch((error) => {
            console.error(error);
          });

        return;
      }

      axios
        .get(
          `https://${API_KEY}:${API_PASSWORD}@${STORE}${smartCollectionPath}`
        )
        .then(({ data }) => {
          const match = data.smart_collections.find(
            (collection) => collection.handle === handle
          );

          if (match) {
            const path = `/admin/api/2021-04/collections/${match.id}/metafields.json`;
            const metafield = {
              key,
              namespace,
              value: JSON.stringify(value),
              value_type: "json_string",
            };

            axios
              .post(`https://${API_KEY}:${API_PASSWORD}@${STORE}${path}`, {
                metafield,
              })
              .then(() => {
                console.log(`Metafield for ${handle} created.`);
              })
              .catch((error) => {
                console.error(error);
              });

            return;
          }

          console.log(false, handle, match);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });

  index += 1;
  if (index >= collectionData.length) {
    clearInterval(interval);
  }
}, 500);
