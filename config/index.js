/**
 * Created by xiaobxia on 2017/9/17.
 */
module.exports = {
  path: {
    dist: './dist',
    scss: './src/scss/*.scss',
    scssWatch: './src/scss',
    js: './src/js/*.js',
    jsWatch: './src/js',
    example: './examples'
  },
  server: {
    port: 8080
  },
  pxtorem: {
    rootValue: 16,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  },
  autoprefixer: {
    "browserslist": [
      "> 1%",
      "last 2 versions"
    ]
  }
};
