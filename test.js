const axios = require("axios");

const variant = 39299456893026;

let path;

if (variant) {
  path = `/admin/api/2021-07/products/6552568463458/variants/${variant}.json`;
} else {
  path = `/admin/api/2021-07/products/6552568463458.json`;
}

axios
  .get(
    `https://063d59ebc6bea5cf7f7984bcce417ac8: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@lotuscrafts3.myshopify.com${path}`
  )
  .then((res) => console.log(res.data))
  // .then((res) => console.log(res.data.product.handle))
  .catch((error) => {
    console.error(error);
  });
