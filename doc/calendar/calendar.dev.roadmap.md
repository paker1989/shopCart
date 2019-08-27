# 2019/08/21

-   initalize the layout, responsive design

# 2019/08/26

> todo list:
-   layout dropdown list;
-   拖拽`CalEventPop`以后 hold on，弹出`eventEditor` (根据`referencer`位置弹出`popup`);
-   db model design (导入农历 | 法国节日);
    > 显示 defined events;
    > 显示日历等；
-   redux design (解决一系列 date toggle 问题);
    > toggle month, select date, 点击*今天*回到今天, 点击`layoutDropdown list`， etc;
-   `react-intl`国际化
-   `monthLayout`
    > monthGrid
    > `CalEventPop - dragging`在`monthLayout`下的实现;
    > `monthLayout`;
-   右键点击`CalEventPop`弹出`contextMenu`, - need same `popup` 组件 here as same as `eventEditor`;
-   general tooltip （好像已经有`tooltip`组件了）
-   `yearLayout`.
-   提醒的真正后台服务.


> to optimize:
- 区分`click`和`mousedown`和`mouseup`事件. (throtte `mousedown`， 半秒不 up 就发`mousedown`,否则发`click`事件)；
- `calEventPop`在初始时文字在不在第一行的问题