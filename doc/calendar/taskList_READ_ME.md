## task steps: (with complexity level 1 - 5)

15. `calViewEventDetailPanel`:
    - activity panel;
    - multiple reminders panel;
    - single reminder panel;
16. Notify -> 撤销删除和添加 (3)
17. 动画 (4)
18. 拖拽 holdon 的`calEventPop` (4)
19. 导入法国节日: (4)
    > a checkbox in `shelf`
20. create user authentication module;
21. 点击`timeRange`可以换时间: `calevtPop.ref.current` should be in redux stats; (3)
22. implement display weekend flag; (2)
23. `calEditEventDetailPanel`,
24. toggle shelf,
25. refine UI

## bug

## hold on point:

-   edit event 更改 type 的时候需要特殊处理: 删除 original type then insert into another;
-   cross day event handle;
-   EvtsActionType._SAVE_EVT_SUCCESS: 只支持新元素，不支持 update
-   `caldefinerpop`和`ctxMenu`都需要加上 clickOnOutSide 自我关闭的功能;

_done_

13. fix 所有关于 edit 的 bug，使之 ready to be saved;
14. db 模型的设计; implementation: create, delete (4)

-   (bug): 如果时间重叠的话 layout 不对劲，需要刷新才行 --> fix: setPosition useEffet not fired;
-   month layout initmodal 的时候时间段是 0, 所以显示不了。--> 换了一个 setDateRange 接口: e.g. now = 21: 11 -> allDayEvt = true, timeRange: 21:00 - 21: 30;
-   first layout picker position is not good

14. 右键点击更改 color + delete;
15. 禁止 scroll 和 resize;
