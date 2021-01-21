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
        text = text.split("\n");
        var headerLine = text.shift();
        headerLine = removeLastComma(headerLine)
        headers = headerLine.split(",");
        
        var array = [];
        
        text.forEach(function(value){
            let objectData = {}
            value = removeLastComma(value)
            row = value.split(",")
            for(var i = 0; i < headers.length; i++){
                let objectData = {}
                console.log()
                if (i==0)
                {
                    console.log("/n");
                    console.log(row);
                    objectData[headers[i]] = row[i];
                    objectData[headers[i]] = row[i];
                    i++
                }
                console.log("/n")
                console.log(i)
                if(i==1)
                {
                    objectData["Component (Earnings)"] = headers[i];
                    objectData["Amount (Earnings)"] = row[i];    
                    objectData["Company"] = "Human Capital Group"; 
                    objectData["Is Active"] = "Yes";
                    objectData["ID (Earnings)"] = "Yes";
                    
                }
                else
                {                    
                    objectData["ID"] =""
                    objectData["Component (Earnings)"] = headers[i];
                    objectData["Amount (Earnings)"] = row[i];    
                    objectData["Company"] = "";    
                    objectData["Is Active"] = "";
                    objectData["ID (Earnings)"] = "";
                }
                array.push(objectData);
            }
        });
        writeTextFile(f, JSON.stringify(array));
        writeCsvFile(c, array);
        return array;
}