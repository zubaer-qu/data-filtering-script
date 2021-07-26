const fs = require('fs') 
var f = "sometextfile.txt";
var c = "datacsv.csv";
function writeTextFile(afilename, output)
{
    fs.writeFile(afilename, output, (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
//   var txtFile =new File(afilename);
//   txtFile.writeln(output);
//   txtFile.close();
}
function writeCsvFile(afilename, output)
{
    fs.writeFile(afilename, arrayToCSV(output), (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
//   var txtFile =new File(afilename);
//   txtFile.writeln(output);
//   txtFile.close();
}
function arrayToCSV (data) {
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
  }
function removeLastComma(text) {
    var lastChar=text.substring(text.length - 2, text.length - 1);
    if(lastChar == ",")
    {
        return text.substring(0, text.length - 2).trim();
    }
    return text.trim();
}

module.exports = function convertToJson(text) {
        var array = [];

        for(var x of text)
        {
            for(var d of x.payslipIds)
            {
                // let outRow = x;
                let outRow = {
                    ...x
                };
                var name=outRow.company.name
                outRow.company=outRow.company.code
                outRow.payslipIds = d;
                outRow.companyName = name;
                console.log(outRow)
                array.push(outRow);
            }
        
        }
        writeTextFile(f, JSON.stringify(array));
        writeCsvFile(c, array);
        return array;
}