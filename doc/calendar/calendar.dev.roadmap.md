# 2019/08/21

-   initalize the layout, responsive design

# 2019/08/26

> todo list:

-   `caleventDefinerPanel`
    > *close option* -->  还是需要有一个moyen告诉*component who holds the dragg status to cancel the drag*; 
    > 出现动画;
    > 点击`timeRange`可以换时间: `calevtPop.ref.current` should be in redux stats;
    > 換時間以後pop隨著時間換位置
-   layout dropdown list;
      > bloquer all events when popover displayed;
      > the animation of toggle popover;
-   db model design (导入法国节日);
      > 显示 defined events;
      > 显示日历等；
-   右键点击`CalEventPop`弹出`contextMenu`, - need same `popup` 组件 here as same as `eventEditor`;
-   general tooltip （好像已经有`tooltip`组件了）
-   `monthLayout`
      > 点击title的时候不应该触发drag事件
-   提醒的真正后台服务.
-   手机模式下的显示问题。同样一个px显示不一样。
-   Notify
-   améliorer `monthLayout`下的绑定事件模式  --> 代理模式: mousedown, mouseup, mousemove;
-   `dayEvtPresenter`
    > 动画
    > `reminder`和`activity`条目
-   `popover` (e.g. `dayEvtPresenter`)  displayd的时候需要静止别的滚轮事件，否则popover的位置相对trigger就不对了。
     > toggle event的控制还不对: isVisible: focus on evt || clickNotOutSide;
-   zIndex要系统安排.
-   4jours的navLink
-   判断第一周的问题。不能取最大的date。先确定怎么判断这天在第几周。 --> 采取欧制: 第一个有4天以上的周是第一周
-  `yearLayout` 初始状态下点开`calDayEvtSimplePresenter`没有调整位置 --> 数据传输的问题

> webpack
  - seprate `Intl` api | Intl.js polyfill in webpack;
  
> todo *optimization*
  - 移动holdon的`calEventPop`
  - 移动defined好的提醒到别的jour。drag & drop

> to optimize:
- 区分`click`和`mousedown`和`mouseup`事件. (throtte `mousedown`， 半秒不 up 就发`mousedown`,否则发`click`事件)；
- `calEventPop`在初始时文字在不在第一行的问题

*done*:
 - cursion of the popover;
 - 点击toggle popover，
 - `monthLayout`
      > monthGrid 
      > `CalEventPop - dragging`在`monthLayout`下的实现;
-   `caleventDefinerPanel`
    > `timeRange` option
    - reminderRange根据if `isDayEvt`来决定`timeRangeDisplayer`显示。如果初始是all day, 切换成not all dayd的话，那么时间就是当前时间.
    > `reminder` sub-panel
-   拖拽`CalEventPop`以后 hold on，弹出`eventEditor` (根据`referencer`位置弹出`popup`);
-   `yearLayout`
      > *add `week of datePicker` for `DatePicker`*
-   `calEventDefinerPop`和`dayEvtPresenter`共同方法需要提取到一个parent class里;
-   `react-intl`国际化
    > 日期国际化
    > string template with value
    > google map API for `calEventDefiner`;
    > `activityDefiner`
       - 根据选择的时间显示repeat选项;
-   redux design (解决一系列 date toggle 问题);
    > toggle month, select date, 点击*今天*回到今天, 点击`layoutDropdown list`，etc;
    -   禁止弹出modal时候的鼠标滚轮事件
-   `yearLayout`
      > zoomer的时候尾部space betweend导致不aligné
-    各种layout的跳转: (1)
      > click on `weekLayout`的case跳转到`dayLayout`;
      > click on `yearLayout`的case跳转到`dayLayout`;
-    `popup` for `yearlayout`;
-   `timeline`显示的方式根本不对，需要放到同一行里;
-   init calEventPop options需要加入`onClose`, 因为从create init的popup关闭的时候需要`turn off` `signal`;
      > 'create' button should be disabled when `calEvtDefinerPop` is presented --> 两种情况: 1. 如果是created的pop，点击则hide，如果是无关的pop，点击则noop (通过signal value判断);
      > `calEvtDefinerPop`一旦生成后，他的timerange就需要和全局绑定，meaning: update time range --> trigger `toTargetDate` then `clickOnGrid evt` --> return `updated_calEvtPop.current` 给`calEvtDefinerPop`从而adjusterPosition;
      -- 我深深的认为: 这个calEvtDefinerPop应该是app下的一个组件。这样完美和redux绑定。
-    18. 当前时间线.
-    5. bug fix: (2)
      >  `monthLayout`
            > 点击title的时候不应该触发drag事件
      > 重组`modal`和`popover`的zIndex;
1. (done) create `calEventDisplayer` panel; (simple, normal + reminder, activity); (3)
2. (done) create `calEventDisplayer_simple` panel (3)
          - use case: `dayEvtPresenter`, `singleDayGrid`, `SingleDayColumn`,  
                
## global variable:
-  initWeek: week of today,  然后independant;
- 