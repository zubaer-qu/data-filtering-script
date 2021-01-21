var db = require("./db.json");
var moment = require('moment')
var fs = require('fs');
let filteredValue = db.map((d) => {
    let a = {}
    a = {...d}
    a['joinDate'] = moment.unix(d['joinDate']).format('YYYY-MM-DD')
    return a
})
fs.writeFile('myjsonfile.json', JSON.stringify(filteredValue), 'utf8', () => {
    console.log('sucess');
    console.log("handling employee info")
});