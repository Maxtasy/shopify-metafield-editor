const config = require('../../config.json');
const axios = require('axios');

const { apiKey, apiPassword, store, accessToken } = config;

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
const create = ({ resource, resourceId, key, namespace, type = 'json', value }) => {
  const metafield = {
    namespace,
    key,
    value,
    type,
  };

  let path;

  if (!resource || resource == 'shop') {
    path = `/admin/api/2022-10/metafields.json`;
  } else {
    path = `/admin/api/${resource}/${resourceId}/metafields.json`;
  }

  axios
    .post(
      `https://${store}${path}`,
      {
        metafield,
      },
      { headers: { 'X-Shopify-Access-Token': accessToken } }
    )
    .then((res) => {
      console.log(`Metafield for ${resource}/${resourceId} created.`);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { create };
