
## Upload 上传文件
上传文件和图片。可以选择从本地选择或者从网络提取图片.

### 上传文件方式
+ 小于`1Mb`的文件，以`json`格式直接发送`data`给后台，直接存储
+ 大于`1Mb`而小于`50Mb`, 以`multipart\form-data`格式发送给后台，直接存储;
+ 大于`50Mb`, 以`multipart\form-data`格式,将文件切割分片发送给后台，发送完毕之后发送一个完结信号`finalize`给后台，后台在等待分片文件`(Promise.all([promises]).then(() => {}))`全部到位后拼接文件后存储到最终文件夹;

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