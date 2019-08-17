
## configuration roadmap
  - 分离组件库和项目


## dev. roadmap

### date picker component

  - (done) DatePicker.tsx: onChange(): void -> define onChange type, update input value, and call onChange props; 

  - (done) handles the selectedDate-change actions:
    > selected simpleDateGrid style;
    > if other-month's date is selected, then trigger monthChange;

  - （done）input date icon. 

  - (later) differenciate click && dbclick events 

 - (later) date picker -- date dragger


### BxuCalendar app

  - initialize Calendar project
    > page layout
    > component split design
    > db model design
    > redux model design

- 调整项目结构，重写入口文件:
  > 分别写shopcart和site的webpack.config.js， 确保结构调整没有问题;
  > integrate the two above;

  