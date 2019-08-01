const fetch = require('node-fetch');
const Client = require('shopify-buy');

module.exports = function(api, opts) {
  const client = Client.buildClient(
    {
      domain: 'earthbar-nz.myshopify.com',
      storefrontAccessToken: '59bf389109a7d8016e30d82c934bc10b'
    },
    fetch
  );

  api.loadSource(async store => {
    const contentType = store.addContentType({
      typeName: 'Product',
      route: '/products/:title'
    });

    await client.product.fetchAll().then(products => {
      products.forEach(product => {
        console.log(product.title);
        contentType.addNode({
          id: product.id,
          title: product.title,
          images: product.images,
          description: product.description,
          variants: product.variants,
          options: product.options,
          productType: product.productType,
          path: product.handle
        });
      });
    });
  });
};
