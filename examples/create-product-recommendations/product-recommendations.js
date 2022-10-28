// TODO: Check if the complementary product still exists. If not, don't add it.

const fs = require('fs');

const lines = fs.readFileSync('product-recommendations.csv').toString().split('\n');

const jsonObject = {};

lines.forEach((line, index) => {
  if (index === 0) return;

  const [count, productId, complementaryId] = line.split(',');

  if (!jsonObject[productId]) jsonObject[productId] = [];

  const cleanedComplementaryId = complementaryId.replace('\r', '');

  if (productId !== cleanedComplementaryId) {
    jsonObject[productId].push({
      count,
      id: cleanedComplementaryId,
    });
  }
});

const newJsonFile = fs.writeFileSync('product-recommendations.json', JSON.stringify(jsonObject));
