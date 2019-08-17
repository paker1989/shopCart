
## 启动mongo db命令
* 公司电脑环境下
```
  C:\Progra~1\MongoDB\Server\4.0\bin\mongod.exe --port 27019 -dbpath C:\Users\bxu1\Desktop\react_component_project\blog\db
```
* macbook
  ```
  mongod --port 27019 -dbpath /Users/binxu/Desktop/react/projects/shopCart/blog/db
  ```

  macbook下kill mongod命令:
  ```
    ps -ax | grep mongod 
    // then
    sudo -kill -9 ${pid}
  ```
  

## 命令行连接mongo db
```
  C:\Progra~1\MongoDB\Server\4.0\bin\mongo --port 27019
```

## 命令行命令
* 创建数据库
```
  use shopCart
```
* 插入数据
```
  db.shopCart.insert({"name": "教程"})
```
* 删除数据库 & 删除/创建集合

```
  db.dropDatabase()
  db.createCollection("runoob")
  db.createCollection("mycol", { capped : true, autoIndexId : true, size : 
  6142800, max : 10000 } )
  show tables
  db.runoob.drop()
```

* 插入文档
  + insertOnlyOne(), insertMany()
```
    db.COLLECTION_NAME.insert(document)
    db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
   })
```

* 更新文档
  + query : update的查询条件，类似sql update查询内where后面的。
  + update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
  + upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
  + multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
  + writeConcern :可选，抛出异常的级别。
```
  db.collection.update(
    <query>,
    <update>,
    {
      upsert: <boolean>,
      multi: <boolean>,
      writeConcern: <document>
    }
)

  db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})

  db.collection.save(
    <document>,
    {
      writeConcern: <document>
    }
)

```

* save() 方法
save() 方法通过传入的文档来替换已有文档。语法格式如下：

```
  db.collection.save(
     <document>,
     {
       writeConcern: <document>
     }
  )
```

*  删除文档 remove()
```
  db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

* 条件操作符
  + (>) 大于 - $gt
  + (<) 小于 - $lt
  + (>=) 大于等于 - $gte
  + (<= ) 小于等于 - $lte
```
  db.col.find({likes : {$gt : 100}})

  db.col.find({likes : {$lt :200, $gt : 100}})
```

* $type 操作符 (http://www.runoob.com/mongodb/mongodb-operators-type.html)

```
  db.col.find({"title" : {$type : 2}})
  // or
  db.col.find({"title" : {$type : 'string'}})
```

* 排序
```
  db.COLLECTION_NAME.find().sort({KEY:1})

  db.col.find({},{"title":1,_id:0}).sort({"likes":-1})
```

* 聚合
  + MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。
```
  db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)

    db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
```