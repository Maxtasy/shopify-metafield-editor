const axios = require('axios');

/**
 * Deletes a metafield.
 *
 * @param {Object} config -
 * @param {String} resource - The resource type.
 * @param {Number} resourceId - The resource ID.
 */
const remove = async (config, { resource, resourceId, metafieldId }) => {
  let path;

  if (!resource || resource == 'shop') {
    path = `/admin/api/2022-10/metafields.json`;
  } else {
    path = `/admin/api/2022-10/${resource}/${resourceId}/metafields/${metafieldId}.json`;
  }

  try {
    const response = await axios.delete(`https://${config.store}${path}`, {
      headers: { 'X-Shopify-Access-Token': config.accessToken },
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data.errors);
  }
};

module.exports = { remove };
