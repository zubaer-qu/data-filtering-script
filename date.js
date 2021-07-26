var db = require("./db.json");
var moment = require('moment')
var fs = require('fs');
let filteredValue = db.map((d) => {
    let a = {}
    a = {...d}
    
    // a['joinDate'] = moment.unix(d['joinDate']).format('YYYY-MM-DD')
    var newDate = a['groupDate'].split("-");
    newDate[0] = moment.unix(newDate[0]).format('YYYY-MM-DD')
    newDate[1] = moment.unix(newDate[1]).format('YYYY-MM-DD')
    a['groupDate'] = newDate[0]+'-'+newDate[1];
    a['starting_date'] = newDate[0];
    a['ending_date'] = newDate[1];
    a['attachment'] = {};
    a['leaveDays'] = [];
    return a
})
fs.writeFile('myjsonfile.json', JSON.stringify(filteredValue), 'utf8', () => {
    console.log('sucess');
    console.log("handling employee info")
});
//node date.js