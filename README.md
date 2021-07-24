How to use:

1. Create your spreadsheet in the following format
    - ![Spreadsheet Template](https://github.com/maxtasy/shopify-metafield-editor/raw/master/img/spreadsheet_template.png)
    - The first row is used to set your keys
    - Each following row should represent a single metafield
    - The first four columns are reserved for the necessary information about the metafield
        - resource: articles, blogs, collections, customers, orders, pages, products, the shop, variants
        - resourceId: unique id associated with the resource
        - key
        - namespace
2. Export your spreadsheet as data.csv and put it in the same directory
    - ![CSV Export](https://github.com/maxtasy/shopify-metafield-editor/raw/master/img/csv_export.png)
3. Rename config.example.json to config.json and enter your details
4. Install packages with `npm install`
5. Execute `npm run create`

More info on metafields:
https://shopify.dev/docs/themes/liquid/reference/objects/metafield
https://shopify.dev/docs/admin-api/rest/reference/metafield
