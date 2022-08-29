const { Console } = require('console');
const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path')

val = fs.readFileSync(path.join(__dirname,`./../private/config.json`), {encoding:'utf8', flag:'r'});


module.exports.getVariables = ()=>{

    try{
        let value= JSON.parse(val)
        return value;
    }
    catch(e){
        Console.error('Setting could not be loaded.')
    }

}

module.exports.saveVariables = (val)=>{

    try{
        fs.writeFileSync(path.join(__dirname,`./../private/config.json`), val);
    }
    catch(e){
        console.error(`Something happened:::::::::: ${e}`)
    }
}