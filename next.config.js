// import withLess from '@zeit/next-less';
//
// export default withLess({
//     /* config options here */
// });

const withLess = require('@zeit/next-less');
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
});
