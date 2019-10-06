## task steps: (with complexity level 1 - 5)
1. create `calEventDisplayer` panel; (simple, normal + reminder, activity); (3)
2. create `calEventDisplayer_simple` panel (3)
   - use case: `dayEvtPresenter`, `singleDayGrid`, `SingleDayColumn`,  
3. create user authentication module;
4. 点击`timeRange`可以换时间: `calevtPop.ref.current` should be in redux stats; (3)
5. bug fix: (2)
   >  `monthLayout`
      > 点击title的时候不应该触发drag事件
   > 重组`modal`和`popover`的zIndex;
7. implement display weekend flag; (2)
8. Notify (3)
9. 动画 (4)
10. db模型的设计; implementation; (4)
11. 移动holdon的`calEventPop` (4)
12. 导入法国节日: (4)
   > a checkbox in `shelf`


urgent hold on point:
- getGlobalTimeRange() stuck on monthLayout case timRange display;