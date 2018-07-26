const moment = require('moment');

const createdAt = 123;
const date = moment(createdAt);


console.log(date.format('h:mm a'));