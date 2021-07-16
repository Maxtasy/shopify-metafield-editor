const config = require("./config.json");
const axios = require("axios");
const csv = require("csvtojson");

const { apiKey, apiPassword, store } = config;

/**
 * Creates or updates a metafield.
 *
 * @param {string} resource The resource type.
 * @param {number} resourceId The resource ID.
 * @param {string} key The metafield key.
 * @param {string} namespace The metafield namespace.
 * @param {string} type The metafield type.
 * @param {string} value The value for the metafield.
 */
const create = ({ resource, resourceId, key, namespace, type = "json_string", value }) => {
  const metafield = {
    namespace,
    key,
    value,
    type,
  };

  let path;

  if (!resource) {
    path = `/admin/api/2021-07/metafields.json`;
  } else {
    path = `/admin/api/2021-07/${resource}/${resourceId}/metafields.json`;
  }

  axios
    .post(`https://${apiKey}:${apiPassword}@${store}${path}`, {
      metafield,
    })
    .then((res) => {
      console.log(`Metafield for ${resource}/${resourceId} created.`);
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * Creates metafields from a csv file.
 *
 * @param {string} filePath Path to the csv file.
 */
const bulkCreate = (filePath) => {
  csv({
    checkType: true,
  })
    .fromFile(filePath)
    .then((metafields) => {
      let index = 0;

      const interval = setInterval(() => {
        const { resource, resourceId, key, namespace, type, ...value } = metafields[index];

        create({
          resource,
          resourceId,
          key,
          namespace,
          type,
          value: JSON.stringify(value, null, 2),
        });

        index += 1;
        if (index >= metafields.length) {
          clearInterval(interval);
        }
      }, 500);
    });
};

module.exports = {
  create,
  bulkCreate,
};
