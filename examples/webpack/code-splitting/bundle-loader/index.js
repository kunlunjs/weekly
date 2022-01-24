require('bundle-loader!./file.js')(function (fileJSExports) {
  console.log(fileJSExports)
})
