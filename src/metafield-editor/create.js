const axios = require('axios');

/**
 * Creates or updates a metafield.
 *
 * @param {Object} config -
 * @param {String} resource - The resource type.
 * @param {Number} resourceId - The resource ID.
 * @param {String} key - The metafield key.
 * @param {String} namespace - The metafield namespace.
 * @param {String} type - The metafield type.
 * @param {String} value - The value for the metafield.
 */
const create = (config, { resource, resourceId, key, namespace, type = 'json', value }) => {
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
    path = `/admin/api/2022-10/${resource}/${resourceId}/metafields.json`;
  }

  axios
    .post(
      `https://${config.store}${path}`,
      {
        metafield,
      },
      { headers: { 'X-Shopify-Access-Token': config.accessToken } }
    )
    .then((response) => {
      console.log(`Metafield for ${resource}/${resourceId} created.`, response);
    })
    .catch((error) => {
      console.error(error.response.data.errors);
    });
};

module.exports = { create };
