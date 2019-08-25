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
    > 日，周是一种layout， 月是一种layout
    日和周的case需要支持: 点击知道具体是哪个区间: 15分钟为一档。2
    日和周应该是以column为单位，props -> 几个case (天).
    column_day  = default header | custo header + [reminder_case] + body;
    colmun_day's props: isHeader: 显示时间。

    event 的共性:
     - 一个起始点: 留一点padding;
     - 一个结束点: 
     起始点和结束点可以是同一个或者不同;
     trigger应该是从singleGrid里. 
     点击拖拽时的图形和最后停下显示的图形不是同一个。有些许不同，需要分别开发，但是可以use commun base component;

     Q: 如何确定位置？
     Q: trigger event? mousedown to trigger, mouseup to trigger popup;

     //
     (day & week) singledaygrid： mousedown事件，告诉哪个时间点开始，mouseup事件，triggerPopup(timerange)，singledaygrid doit etre capable de designer le pop par rapport a le timerange; --> 应该是layout的工作;
     具体： 
     <!-- > singleDayColumn绑定一个事件组件`timeRangerHandler`，给予onmousedownChange, onMousemoveChange,onmouseupChange, ref,  -->
     > `singleDayColumn`应该给`singledaygrid`一个onMousedownProps(timeStarter), 一个onMouseupProps(timeStarter),自己有一个onMousemoveChange： 实时designer.  onMousemove和onMouseup都需要designer。
     
     
     (month) monthDayGrid: 需要知道day range. 我觉得可以用redux管理，渲染monthDayGrid时获取dayrange, 如果在range内就渲染图形。如果是起始，结束，周日，周六四种情况则style略有不同，自然就渲染出来range了。

     <!-- 有一个组件作用: 提供一个对象: 从哪个case到哪个case， -->


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