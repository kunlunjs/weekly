## 总结

1. `webpack` 默认不会在 `process.env.NODE_ENV` 上注入值
2. `webpack --mode` 有效取值： `development | production | none`
3. babel 配置文件读取顺序：`babel.config.js`、`.babelrc`、`.babelrc.json`、`babel.config.json`、package.json 中 `{ "babel": {}}`
