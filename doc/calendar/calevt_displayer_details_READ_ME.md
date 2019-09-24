1. reminder (不显示)
2. activity 
   - `dayLayout`
   > all day evt: 显示在顶部; 
     > 按id大小依次排列 - 超过2个折叠，显示2 and more；
   > time evt: 显示在对应格子里;
     > 按id大小，zIndex增大

   - `weekLayout`
    > 一样的原则
  
   - `monthLayout`
     > 依次排列, 超过3个显示 6 and more
     > all day evts和no-all day evts显示方式不同
     > 点击`6 and more` 显示`dayEvtPresenter`, 

  事件选择原则
  - dayLayout, weekLayout, monthLayout, --> 每个date到mongodb里查找date. 查找到了以后缓存到cache里，数目不超过n个。(maxCachedNumber 在`cal.config`里设置);
  - year是直接点击每个date的时候再查找.

  查找rule
  - year, month, showDate都相等. 返回;