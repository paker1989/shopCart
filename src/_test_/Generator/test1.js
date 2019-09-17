var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

const g = gen();
const res = g.next();
res.value.then((data) => {
    return data.json();
}).then((data) => {
    g.next(data);
})