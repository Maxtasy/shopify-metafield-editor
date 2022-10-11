const fs = require('fs');

const { create } = require('./src/metafield-editor/create');

const fileContent = fs.readFileSync('./product-recommendations.json').toString();
const jsonData = JSON.parse(fileContent);

Object.keys(jsonData).forEach((productId) => {
  const productReferenceList = [];

  jsonData[productId].forEach((complementaryProduct, index) => {
    if (index < 9) productReferenceList.push(`gid://shopify/Product/${complementaryProduct.id}`);
  });

  create({
    resource: 'product',
    resourceId: productId,
    key: 'product_recommendations',
    namespace: 'meta',
    type: 'list.product_reference',
    value: `[${productReferenceList.join(',')}]`,
  });
});
