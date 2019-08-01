// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Earthbar',
  plugins: [
    {
      // use: '~/src/sources/Products'
      use: '~/src/sources/collections'
      // options: {
      //   apiKey: 'keyEkWnax7TUb9Cr9',
      //   base: 'appreweFcjGsJvFEs'
      // }
    }
  ]
};
