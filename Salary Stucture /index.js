var db = require("./db.json");
var moment = require('moment')
var fs = require('fs');
let filteredValue = db.map((d) => {
    let a = {}
    a = {...d}
    a['Date of Birth'] = moment.unix(d['Date of Birth']).format('YYYY-MM-DD')
    a['Date of Joining'] = moment.unix(d['Date of Joining']).format('YYYY-MM-DD')
    a['QID Expiry'] = moment.unix(d['QID Expiry']).format('YYYY-MM-DD')
    a['Passport Valid Upto'] = moment.unix(d['Passport Valid Upto']).format('YYYY-MM-DD')
    a['Work Card Expiry Date'] = moment.unix(d['Work Card Expiry Date']).format('YYYY-MM-DD')
    a['Visa Expiry Date'] = moment.unix(d['Visa Expiry Date']).format('YYYY-MM-DD')
    a['Secondment Expiry Date'] = moment.unix(d['Secondment Expiry Date']).format('YYYY-MM-DD')
    return a
})
fs.writeFile('myjsonfile.json', JSON.stringify(filteredValue), 'utf8', () => {
    console.log('sucess');
    console.log("handling employee info")
});