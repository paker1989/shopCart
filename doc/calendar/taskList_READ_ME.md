## task steps: (with complexity level 1 - 5)
15. `calViewEventDetailPanel`,
14. 右键点击更改color + delete;
8. Notify -> 撤销删除和添加 (3)
9. 动画 (4)
11. 拖拽holdon的`calEventPop` (4)
12. 导入法国节日: (4)
   > a checkbox in `shelf`
3. create user authentication module;
4. 点击`timeRange`可以换时间: `calevtPop.ref.current` should be in redux stats; (3)
7. implement display weekend flag; (2)
16. `calEditEventDetailPanel`,
17. toggle shelf,
18. refine UI

## bug

## hold on point:
- edit event更改type的时候需要特殊处理: 删除original type then insert into another;
- cross day event handle;
- EvtsActionType._SAVE_EVT_SUCCESS: 只支持新元素，不支持update

*done*
13. fix所有关于edit的bug，使之ready to be saved;
10. db模型的设计; implementation: create, delete (4)
- (bug): 如果时间重叠的话layout不对劲，需要刷新才行 --> fix: setPosition useEffet not fired;
- month layout initmodal的时候时间段是0, 所以显示不了。--> 换了一个setDateRange接口: e.g. now = 21: 11 -> allDayEvt = true, timeRange: 21:00 - 21: 30;