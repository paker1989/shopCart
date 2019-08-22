# Calendar dev roadmap

## Notices & Thoughts

### 部件
- header:
  > 今天 button，点击回到今天
  > 'display year + display month' component,
  > layout dropdownlist: 
    > 4天，日，周，月， - 为一个panel
    > 再预留一个placeholader，给customized options;

- content:
  - 左侧 datepicker panel - 这个是固定width的， 
  - 中部 so called *dateGridLayout*: 这个是dynamic的，瓜分剩下的所有面积
    > 
  - 最右侧 预留一小列: links to my apps, my site:  这个是固定width的

- footer (预留，暂时不做)
  > to be decided.

- reminderPanel, 

### 交互
  
  - 在*dateGridLayout月*里上下滚轮滑动来toggle month;
  - 在*dateGridLayout月* 拖拽选中日期范围来弹出reminderPanel
  - 在*dateGridLayout日*和*dateGridLayout周*里拖拽选中s时间范围来弹出reminderPanel;

### thoughts
- 是否可以把法国节日导入到我的日历


## todo
    配置eslint | tslint??
    调整formatter
    i18n
    线上怎么启动express，抑或说，在真正线上如何启动服务器，serve the index.html?