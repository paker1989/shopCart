
## Upload 上传文件
上传文件和图片。可以选择从本地选择或者从网络提取图片.

### API


| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| prefix | 前缀 | string | `'bxu'` | '' |
| withoutModal | 选择打开modal显示或者直接显示 | `boolean` | `false` | null |
| type | 文件类型 | `string` 或者 `Array` | `['image', 'text']` | `image`, `text` |
| imageOnly | 只显示图片选择 | `boolean` | `false` | null |

### 数据类型以及接口
```
// FileInput to UploadPanel
[
    "src": "xxxxxxxx", // image src
    "file": file, // complete file 
    "fk": "UID_KEY_#{xx}" // primary key
],
[
    <!-- 
      if file.size > 1GB ? readAsArrayBuffer(): readAsText
    -->

    "data": evt.target.result 
    "file": file, // complete File object
    "fk": "UID_KEY_#{xx}" // primary key  
]

```
提供给顶端Upload组件的出口的数据类型为`images`和`texts`. 数据类型和上面一样
```
{
    images: [
        "src": "xxxxxxxx", // image src
        "file": file, // complete file 
        "fk": "UID_KEY_#{xx}" // primary key
    ],
    texts: [
        "data": evt.target.result 
        "file": file, // complete File object
        "fk": "UID_KEY_#{xx}" // primary key      
    ]
}
```

顶端props需要有`exeUpload({ images, texts })`方法来处理upload，否则会有warning