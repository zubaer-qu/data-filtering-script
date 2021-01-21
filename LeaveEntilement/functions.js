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
        var date,dateHead, code, codeHead;
        text.forEach(function(value){
            let objectData = {}
            value = removeLastComma(value)
            row = value.split(",")
            for(var i = 0; i < headers.length; i++){
                let objectData = {}
                if(i==0)
                {
                    code = row[i]
                    dateHead = headers[i]
                    objectData[dateHead] = code;
                    i++
                    date = row[i]
                    codeHead = headers[i]
                    objectData[headers[i]] = date;
                    i++
                    objectData[headers[i]] = row[i];
                    i++
                    objectData[headers[i]] = row[i];
                    i++
                    objectData[headers[i]] = row[i];

                }
                else
                {
                    objectData[codeHead] = code;
                    objectData[dateHead] = date;
                    objectData[headers[i]] = row[i];
                    i++
                    objectData[headers[i]] = row[i];
                    i++
                    objectData[headers[i]] = row[i];

                }

                    

                
                // if(i==2)
                // {
                //     objectData["Component (Earnings)"] = headers[i];
                //     objectData["Amount (Earnings)"] = row[i];    
                //     objectData["Company"] = "Human Capital Group"; 
                //     objectData["Is Active"] = "Yes";
                //     objectData["ID (Earnings)"] = "Yes";
                    
                // }
                // else
                // {                    
                //     objectData["ID"] =""
                //     objectData["Component (Earnings)"] = headers[i];
                //     objectData["Amount (Earnings)"] = row[i];    
                //     objectData["Company"] = "";    
                //     objectData["Is Active"] = "";
                //     objectData["ID (Earnings)"] = "";
                // }
                if(row[i])
                    array.push(objectData);
            }
        });
        writeTextFile(f, JSON.stringify(array));
        writeCsvFile(c, array);
        return array;
}