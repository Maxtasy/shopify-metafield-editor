const axios = require('axios');

/**
 * Gets a metafield.
 *
 * @param {String} config -
 * @param {String} resource - The resource type.
 * @param {Number} resourceId - The resource ID.
 */
const get = async (config, { resource, resourceId }) => {
  let path;

  if (!resource || resource == 'shop') {
    path = `/admin/api/2022-10/metafields.json`;
  } else {
    path = `/admin/api/2022-10/${resource}/${resourceId}/metafields.json`;
  }

  try {
    const response = await axios.get(`https://${config.store}${path}`, {
      headers: { 'X-Shopify-Access-Token': config.accessToken },
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data.errors);
  }
};

module.exports = { get };
