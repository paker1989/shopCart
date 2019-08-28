### grid-template-columns grid-template-rows 定义列宽 列高
  - repeat(): repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。
  - auto-fill
  - fr 

###grid-row-gap 

### grid-auto-flow 放置顺序
grid-auto-flow: column;

### justify-items, align-items, place-items
设置单元格内容的水平和垂直位置
### justify-self, align-self
和justify-items一样，但是是作用在单个单元格的

### justify-content，align-content，place-content 
*整个内容区域*在容器里面的水平位置

### grid-auto-columns, grid-auto-rows
用来设置，浏览器自动创建的多余网格的列宽和行高 (因为*一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。*)

## grid-column-start grid-column-end 属性，grid-row-start 属性，grid-row-end 属性 (合并简写: grid-column, grid-row)
*不常用* 用来指定项目的位置，具体方法就是指定项目的四个边框，分别定位在哪根网格线