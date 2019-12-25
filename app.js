var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var jsonRead = require('./tblj_BI_Monthly_MG.json')
var netSales = require('./tblj_BI_NetSales.json')
const port = 3456
app.use(bodyParser.json());
app.listen(port);
app.use(cors());
app.get('/:category',(req,res)=>{
    let dropDownValue = []
    let categoryValue = req.params.category;
    let keyValue = ''
    if(categoryValue === 'Manager'){
        keyValue = 'AccountManager'
        netSales.map(obj=>{
            if(!dropDownValue.includes(obj[keyValue])){
                dropDownValue.push(obj[keyValue])
            }
        })
        res.send(dropDownValue);
    }
    else{
        if(categoryValue === 'Terminal'){
            keyValue = "TerminalName"
        }
        if(categoryValue === 'Category'){
            keyValue = 'CategoryName'
        }
        if(categoryValue === 'Brand'){
            keyValue = 'BrandName'
        }
        if(categoryValue === 'Code'){
            keyValue = 'ContractCode'
        }
        if(categoryValue === 'Company'){
            keyValue = 'CompanyName'
        }
        jsonRead.map(obj=>{
            if(!dropDownValue.includes(obj[keyValue])){
                dropDownValue.push(obj[keyValue])
            }
        })
        res.send(dropDownValue);
    }
})

app.post('/Table',(req,res)=>{
    let object = req.body;
    console.log(object);
    res.send(object);
})