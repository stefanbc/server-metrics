const ServerStats = require('./index.js');

let basic = new ServerStats('basic');

console.dir(basic.get());

let advanced = new ServerStats('advanced');

console.dir(advanced.get());