## 测试标题
### 这是副标题

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

``
if (window.code == 3) {
  console.log('happy')
}
``

this is a normal block

      Cache.prototype.get = function(name, key) {
        let instance = this.store[name]
    key = key || 1
    if (instance.data[key]) {
      return Promise.resolve(JSON.parse(instance.data[key]))
    } else {
      return instance.fn(key).then(data => {
        instance.data[key] = JSON.stringify(data) //deepClone
        return Promise.resolve(data)
      })
    }
  }