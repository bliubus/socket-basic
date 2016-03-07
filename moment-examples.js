var moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x'));
// console.log(now.valueOf());

var timestamp = 1457318520758;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mm a'))