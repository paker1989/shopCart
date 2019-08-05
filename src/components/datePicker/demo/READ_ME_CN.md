```
new Date();
new Date(value);
new Date(dateString);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

参数`monthIndex` 是从“0”开始计算的，这就意味着一月份为“0”，十二月份为“11”。

## specification

### 一级 props (首先支持)
- prefix
- placeholder
- isPopup: `true`/`false`. true - default `true` -- 显示日期input,点击弹出; false -- 直接显示。
- value: 默认 Date.now(), 
- onChange: date change函数 - only support for `value` is given
- disabled: `true`/`false`, default `false`
- returnValueType: onChange的value type: `string | Date | number`;


### 次级props (迭代后支持)
- onOpen：弹出函数 - only support for `isPopup` = `true`
- onClose: 关闭函数 - only support for `isPopup` = `true`

### 默认的一些option:
- `popover.placement` = `Popover.Placement.autoBottomLeft`