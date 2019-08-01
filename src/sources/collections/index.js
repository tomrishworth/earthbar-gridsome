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
      typeName: 'Collection',
      route: '/collections/:title'
    });

    await client.collection.fetchAllWithProducts().then(collection => {
      collection.forEach(collection => {
        console.log(collection.title);
        contentType.addNode({
          id: collection.id,
          handle: collection.handle,
          title: collection.title,
          image: collection.images,
          description: collection.description,
          products: collection.products
        });
      });
    });
  });
};
