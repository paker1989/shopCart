
## 启动mongo db命令
* 公司电脑环境下
```
  C:\Progra~1\MongoDB\Server\4.0\bin\mongod.exe --port 27019 -dbpath C:\Users\bxu1\Desktop\react_component_project\db
```
* macbook
  ```
  mongod --port 27019 -dbpath /Users/binxu/Desktop/react/projects/binWorkspace/db
  ```

  macbook下kill mongod命令:
  ```
    ps -ax | grep mongod 
    // then
    sudo -kill -9 ${pid}
  ```