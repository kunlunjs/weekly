# 1.postcss-loader

## 1.1 配置方式

- webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```

- postcss.config.js（postcss-loader 会自动查找这个文件）

```javascript
module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
      }
    ]
  ]
}
```

## 1.2 配置项

### 1.2.1 execute(类型:布尔,默认值:undefined)

css-in-js 配置

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.style.js$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-js'
              },
              execute: true
            }
          }
        ]
      }
    ]
  }
}
```

### 1.2.2 postcssOptions(类型:对象或者函数,默认值:undefined)

- 对象：参考[链接](https://postcss.org/api/#processoptions)
- 函数：不同场景使用不同配置

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|sss)$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: loaderContext => {
            // loaderContext：当前文件的上下文信息
            if (/\.sss$/.test(loaderContext.resourcePath)) {
              return {
                parser: 'sugarss',
                plugins: [
                  ['postcss-short', { prefix: 'x' }],
                  'postcss-preset-env'
                ]
              }
            }

            return {
              plugins: [
                ['postcss-short', { prefix: 'x' }],
                'postcss-preset-env'
              ]
            }
          }
        }
      }
    ]
  }
}
```

- config

类型：布尔或字符串，默认值：undefined
loader 配置和配置文件合并，loader 配置优先级高，配置文件查找优先级如下：

- `package.json`文件中的 postcss 属性
- JSON 或 YAML 格式的`.postcssrc`文件
- `postcssrc.json`，`postcssrc.yaml`，`.postcssrc.yml`，`.postcssrc.js`，`postcssrc.cjs`文件
- `postcss.config.js`，`postcss.config.cjs`文件

# 2.postcss-plugin

## 2.1 自定义插件

```javascript
var postcss = require('postcss')

module.exports = postcss.plugin('postcss-test-plugin', function (opts) {
  opts = opts || {} // 处理 options
  return function (root, result) {
    //遍历所有的选择器
    root.walkRules(function (rule) {
      //遍历所有的属性
      rule.walkDecls(function (decl) {
        //dect 是一个包含属性-值对和一些操作方法的样式对象，最重要的两个属性是decl.prop 属性名和decl.value 属性值.
        //过滤包含 overflow , overflow-x , overflow-y 的属性
        rule.walkDecls(/^overflow-?/, function (decl) {
          if (decl.value === 'scroll') {
            //判断是否已经有-webkit-overflow-scrolling，防止重复添加
            var hasTouch = rule.some(function (i) {
              return i.prop === '-webkit-overflow-scrolling'
            })
            if (!hasTouch) {
              rule.append({
                prop: '-webkit-overflow-scrolling',
                value: 'touch'
              })
            }
          }
        })
      })
    })
  }
})
```

## 2.2 使用插件

```javascript
const postcssTestPlugin = require('postcss-test-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              postcssTestPlugin({
                // options
              })
            ]
          }
        }
      }
    ]
  }
}
```
