const fs = require('fs');
const { config } = require('../config');
const { remove } = require('../src/metafield-editor/remove');
const { get } = require('../src/metafield-editor/get');

// Import a list of all product IDs.
const productIds = require('./product-ids.json');

// Create a promise list of all get requests.
const promiseList = productIds.map((productId) => {
  return get(config.papasplatz, { resource: 'products', resourceId: productId });
});

const metafieldsToDelete = [];

// Once all promises of the promise list are resolved.
Promise.all(promiseList).then((products) => {
  products.forEach(({ metafields }) => {
    // Push the metafields that match our requirements into the metafields array.
    const matchingMetafield = metafields.find(
      (metafield) => metafield.namespace === 'hc_faq' && metafield.key === 'questions'
    );

    if (matchingMetafield) metafieldsToDelete.push(questionsMetafield);
  });

  metafieldsToDelete.forEach((metafield) => {
    remove(config.papasplatz, {
      resource: 'products',
      resourceId: metafield.owner_id,
      metafieldId: metafield.id,
    });
  });
});
