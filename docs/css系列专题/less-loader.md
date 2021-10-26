# 1. 在webpack中使用
`npm install less less-loader --save-dev`
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
};
```
# 2. 自定义plugin
## 2.1 定义（就是一个具有install方法的对象）
```javascript
function MyCustomLessPlugin(options) {
    this.options = options;
}

MyCustomLessPlugin.prototype = {
  
	install: function(less, pluginManager, funcitons) {
  	// less: less上下文
    // puginManager: 通过pluginManager.webpackLoaderContext可以获取当前loader上下文
    // functions: less支持的函数列表
  },
  
  setOptions: function(argumentString) {
    // 处理options
   },
   
   printUsage: function() {
     // 打印插件使用说明
   },
  
   minVersion: [2, 0, 0]
  
}
```
## 2.2 使用
```javascript
const MyCustomLessPlugin = require('my-custom-less-plugin');

module.exports = {
  ...
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          plugins: [
            new MyCustomLessPlugin({ // options }),
          ],
        },
      },
    },
  ...
};
```
