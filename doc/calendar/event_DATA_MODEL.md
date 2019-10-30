1. 确定dataModel: 字段，demo json比对
2. fixer所有bug，确定编辑逻辑，确保输出目标formdata;
3. data validation, willUnMount (beforeclose, beforeUnmount);
4. mongoose设置，
5. backend API define&impl,
6. test;

## dataModel
### ReminderDataModel
```
{
    id: number,
    title: string,
    type: 'reminder' | 'activity',
    allDayEvt: boolean,
    opts: {
      time: {
          from: {
              year: string,
              month: string,
              dayAt: string,
              hourAt: string,
              minAt: string
          }
      },
      repeatOpt: string,
      color: string
    }
}
```

### ActivityDataModel
```
{
    id: number,
    title: string,
    type: 'reminder' | 'activity',
    allDayEvt: boolean,
    opts: {
      time: {
          from: {
              year: string,
              month: string,
              dayAt: string,
              hourAt: string,
              minAt: string
          },
          to?: {
              year: string,
              month: string,
              dayAt: string,
              hourAt: string,
              minAt: string              
          }
      },
      address?: string,
      description?: string,
      color: string
    }
}
```