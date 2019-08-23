# 需要解决什么问题?
  * 仅从名字就能知道一个 CSS 选择器具体做什么;
  * 从名字能大致清楚一个选择器可以在哪里使用;
  * 从CSS 类的名称可以看出它们之间的联系;

# BEM命名
BEM 是一种真正消除不确定性的命名方式，它使得结构样式更加清晰，我们有足够的信心做任何修改。

  * block：模块，名字单词间用 - 连接
  * element：元素，模块的子元素，以 __ 与 block 连接
  * modifier：修饰，模块的变体，定义特殊模块，以 -- 与 block 连接

```
  .calendar-header__leftcontainer {
     
  }
```
### 项目命名
 全部采用小写方式， 以下划线分隔。

例：my_project_name

### 目录命名
参照项目命名规则；

有复数结构时，要采用复数命名法。

例：scripts, styles, images, data_models

### JS文件命名
参照项目命名规则。

例：account_model.js

### CSS, SCSS文件命名
参照项目命名规则。

例：retina_sprites.scss

### HTML文件命名
参照项目命名规则。

例：error_report.html

## reference
https://seesparkbox.com/foundry/bem_by_example (比较直观的BEM英文范例)
https://www.jianshu.com/p/5e018c7f0bc6 (解释的比较清楚的BEM规范)
https://www.kancloud.cn/digest/code-guide/42602