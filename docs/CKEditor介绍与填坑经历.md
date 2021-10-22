（未完待续。。。）


# 1、基本介绍

一个号称很牛X的万能编辑器。由有着18年的富文本编辑开发经验的CKSource公司创造和维护。

> CKEditor 5 provides every type of WYSIWYG editing solution imaginable。

# 2、功能特性
CKEditor4 和 CKEditor5 有着极大差异，直接进行最新版本。

[官方介绍](https://ckeditor.com/ckeditor-5/)

## 结构
主要的包： @ckeditor/ckeditor5-core 、@ckeditor/ckeditor5-engine、 @ckeditor/ckeditor5-ui

## 特性
- 支持协作编辑
- 支持多种导出格式，HTML、PDF、Word等
- 提供各种格式化能力
- 支持高级内容扩展：内置图片上传插件，其他多媒体也可自行扩展
- 提供各种高效特性：自动保存、字数count、URL直接粘贴、Markdown语法
- 兼容MS Office 和 Google Docs 内容，可直接复制粘贴 （没有考虑WPS，外国人不用这东西）

以上特性可以根据需要选择全部或部分集成。

## 开箱即用的套餐
- Classic Editor 简单版本：约等于一个Markdown编辑器
- Inline Editor 无工具条的沉浸式编辑器
- Balloon editor 跟Inline Editor类似，编辑面板由按钮替代做了隐藏
- Document Editor 编辑体验趋近于Word的编辑器

# 3、项目中的实践

功能需求：支持各种文字格式的调整、图片上传、视频上传、外部粘贴内容（word、微信等）
> 这里其实还是要吐槽一下需求和产品设计：

> 一开始只是要求简单做一个文本编辑器（没有明确各种特性、能力，前端开发选择了一款MD编辑器） =》 要求能改文字颜色、字体字号等 + 上传图片 => 要求上传视频 => 拿着微信公众号的内容对标。。。

为什么不是一开始就确定需要一个仿微信内容编辑器的功能？呵呵

从CKEditor扩展的层面讲一下遇到的场景：

### 扩展需求场景一：变更生成HTML的格式

为适应flutter渲染，需要将image style.width转为width属性

1、[官方文档中](https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html)有提到配置 `htmlSuppiort` 可以扩展一些元素属性的支持，但并没有生效；

2、后来直接写了一段脚本对 getData() 后的内容做dom操作

``

### 扩展需求场景二：支持视频插入和引入

这个CKEditor是没有支持的，但是开发插件需要一定时间，所以最好的方式是找一些别人做的扩展插件，这在npm中也有一些。

但是尝试了几个，集成都有问题（目测是版本不同导致的），比如 @visao/ckeditor5-video，后来找个一个中国人写的插件（@xccjh/xccjh-ckeditor5-video-file-upload）勉强能够支持。


# 4、总结

## 优点
## 缺点
## 适用的场景



**参考资料** 

[主流的开源「富文本编辑器」都有什么缺陷？](https://www.zhihu.com/question/404836496)
