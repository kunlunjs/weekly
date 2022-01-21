## Installation

`npx tailwindcss init` 生成配置文件

引入 tailwindcss

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

或

```js
import 'tailwindcss/tailwind.css'
```

响应式

- `sm` 640px
- `md` 768px
- `lg` 1024px
- `xl` 1280px
- `2xl` 1536px

## Base Styles

Tailwindcss

## Layout

## Flexbox and Grid

## Spacing

## Sizing

## Typography

## Backgrounds

## Borders

## Effects

## Filters

## Tables

## Transtions and Animation

## Transforms

## Interactivity

## SVG

## Accessibility

## Official Plugins

## tailwind.conf.js

```js
module.exports = {
  theme: {
    /* 自定义断点 */
    tablet: '640px',
    laptop: '1024px',
    desktop: '1280px'
  },
  variants: {
    extend: {
      padding: ['hover'],
      appearance: ['hover', 'focus'] // false
    }
  }
}
```
