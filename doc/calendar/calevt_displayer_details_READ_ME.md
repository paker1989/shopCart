- `all day` evt & reminder 同一个format, 显示在顶部;
- `all day` evt 不重叠，按时间依次显示,
- `all day reminder` 重叠, 显示1个条目
- `timing reminder`同一时间重叠 as well，显示1个条目, 不同时间不重叠
- `timing evt`都不重叠;
-  优先显示`all day` evt, 其次`all day`reminder, 然后按timing显示evt或reminder（无优先级）;

## `simpleEvtList`显示逻辑:
- 先按`all day`与否分为2个list;
- `all day` evts 进行排序&合并;
- `timing` evts 进行排序&合并;
- counter 条目, 进行显示;

simpleEvtList里包含数据结构如下
  1. `Day activity` one by one by id;
  2. { nbReminder: 2, isAllDay: true, reminders: []},
  3. 按时间顺序: 
    > `timing activity`: {}
    > { nbReminder: 1, isAllDay: false, timing: ITimingFormat, reminders: [] }

   :
    {
      activity: {allDayEvt, type, }
      reminders, { allDayEvt, type, reminders, }
      activity,
      reminders, { allDayEvt, type, reminders, }
    }