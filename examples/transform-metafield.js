const fs = require('fs');
const { config } = require('../config');
const { get } = require('../src/metafield-editor/get');
const { create } = require('../src/metafield-editor/create');

// Import a list of all product IDs.
const productIds = require('./all-products.json');

// Create a promise list of all get requests.
const promiseList = productIds.map((productId) => {
  return get(config.papasplatz, { resource: 'products', resourceId: productId });
});

const newMetafields = [];

// Once all promises of the promise list are resolved.
Promise.all(promiseList).then((products) => {
  products.forEach(({ metafields }) => {
    // Push the metafields that match our requirements into the metafields array.
    const matchingMetafield = metafields.find(
      (metafield) => metafield.namespace === 'hc_faq' && metafield.key === 'questions'
    );

    if (matchingMetafield) {
      // Manipulate metafields data as you wish.
      matchingMetafield.value = 'New value';
      matchingMetafield.namespace = 'new_namespace';
      matchingMetafield.key = 'new_key';
      matchingMetafield.type = 'string';

      newMetafields.push(matchingMetafield);
    }
  });

  newMetafields.forEach((metafield) => {
    create(config.papasplatz, {
      resource,
      resourceId: metafield.owner_id,
      key,
      namespace,
      type,
      value,
    });
  });
});
