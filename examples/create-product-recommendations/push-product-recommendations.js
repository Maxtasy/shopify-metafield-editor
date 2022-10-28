const fs = require('fs');

const { create } = require('../../src/metafield-editor/create');

const fileContent = fs.readFileSync('./product-recommendations.json').toString();
const jsonData = JSON.parse(fileContent);

let wait = 0;

Object.keys(jsonData).forEach((productId, index) => {
  const productReferenceList = [];

  jsonData[productId].forEach((complementaryProduct, index) => {
    if (index < 10) productReferenceList.push(`"gid://shopify/Product/${complementaryProduct.id}"`);
  });

  create({
    resource: 'products',
    resourceId: productId,
    key: 'product_recommendations',
    namespace: 'meta',
    type: 'list.product_reference',
    value: `[${productReferenceList.join(',')}]`,
  });
});
