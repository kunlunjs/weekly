# 配置方式

- ## babel.config.json / .babelrc.json
  ```json
  {
  "presets": [...],
  "plugins": [...]
  }
  ```
- ## package.json
  ```json
  {
    "name": "my-package",
    "version": "1.0.0",
    "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
    }
  }
  ```
- ## 用 JavaScript 编写配置文件
  ```javascript
  const presets = [ ... ];
  const plugins = [ ... ];
  module.exports = { presets, plugins };
  ```
- ## 使用 CLI (@babel/cli)
  ```javascript
  babel --plugins @babel/plugin-transform-arrow-functions script.js
  ```
- ## 使用 API (@babel/core)
  ```javascript
  require('@babel/core').transformSync('code', {
    plugins: ['@babel/plugin-transform-arrow-functions']
  })
  ```

# 配置合并规则

配置选项直接覆盖，除了以下两种特殊情况

- 对于`assumptions`，`parserOpts`,`generatorOpts`选项对象合并(`Object.assun`)
- 对于`plugins`,`presets`根据插件/预设对象/函数本身的标识以及条目的名称进行替换

## 选项（除了 plugin/preset）合并

```javascript
{
  sourceType: "script",
  assumptions: {
    setClassFields: true,
    iterableIsArray: false
  },
  env: {
    test: {
      sourceType: "module",
      assumptions: {
        iterableIsArray: true,
      },
    }
  }
};
```

当 `NODE_ENV` 是 `test`，普通选项将被替换，`assumption` 选项将进行合并

```javascript
{
  sourceType: "module", // sourceType: "script" is overwritten
  assumptions: {
    setClassFields: true,
    iterableIsArray: true, // assumptions are merged by Object.assign
  },
}
```

## Plugin/Preset 合并

```javascript
plugins: [
  './other',
  ['./plug', { thing: true, field1: true }]
],
overrides: [{
  plugins: [
    ['./plug', { thing: false, field2: true }],
  ]
}]
```

overrides 选项列表将被合并到顶级，相同名称的插件选项将根据名称进行替换

```javascript
plugins: ['./other', ['./plug', { thing: false, field2: true }]]
```
