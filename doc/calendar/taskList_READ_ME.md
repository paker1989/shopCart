## task steps: (with complexity level 1 - 5)

15. `calViewEventDetailPanel`:
    - no more event panel;
    - timing display;
    - actions such as `delete`, `close` support for `calViewEventDetailPanel` & `ctxMenuPop`;
28. - `timingPicker` (come from user feedback);
26. support photo add;
16. Notify -> 撤销删除和添加 (3)
23. `calEditEventDetailPanel`,
17. 动画 (4)
18. 拖拽 holdon 的`calEventPop` (4)
19. 导入法国节日: (4)
    > a checkbox in `shelf`
20. create user authentication module;
22. implement display weekend flag; (2)
24. toggle shelf,
25. refine UI
29. support mark as done;

## bug
- `dayPresenter`选择事件的时候没有style了; （style of being selected）


## hold on point:
-   *implement `anchorId` mechanism for pops, reason: 如果来自`dayPresenterPop`的pop，那么不能关闭该  `dayPresenterPop`;*
-   support `clickOutSider`&`windowFrozener` for `dayPresenterPop`;
-   ctxMenu on select single item;
-   edit event 更改 type 的时候需要特殊处理: 删除 original type then insert into another;
-   cross day event handle;
-   add `isDone` mark on `reminder`, 目前`viewReminderPop`只有`_test_is_done`
-   `calEventDefinerPop`里`input`的`width`问题。

## user feedback


_done_
13. fix 所有关于 edit 的 bug，使之 ready to be saved;
14. db 模型的设计; implementation: create, delete (4)

-   (bug): 如果时间重叠的话 layout 不对劲，需要刷新才行 --> fix: setPosition useEffet not fired;
-   month layout initmodal 的时候时间段是 0, 所以显示不了。--> 换了一个 setDateRange 接口: e.g. now = 21: 11 -> allDayEvt = true, timeRange: 21:00 - 21: 30;
-   first layout picker position is not good

14. 右键点击更改 color + delete;
15. 禁止 scroll 和 resize;
-   EvtsActionType._SAVE_EVT_SUCCESS: 只支持新元素，不支持 update
-   `caldefinerpop`和`ctxMenu`都需要加上 clickOnOutSide 自我关闭的功能;
-   `yearlayout`底部的event显示为什么有问题
- `2 rappels`在`weeklayout`不显示;
- activity panel; --> done;
- multiple reminders panel; --> done;
- 目前day reminder自动隐藏，其实还是需要显示的;
- single reminder panel;
27. - 定义事件的时候不能cross defined event; (come from user feedback);