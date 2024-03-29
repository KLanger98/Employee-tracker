const db = require('../database');


//CREATE new row inside table
function insertNew(tableName, columns, values){
    let placeholder = "(?)"
    if(values.length == 2){
        placeholder = "(?, ?)"
    } else if(values.length == 3){
        placeholder = "(?, ?, ?)"
    } else if (values.length == 4){
        placeholder = "(?, ?, ?, ?)"
    }

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${tableName} ${columns} VALUES ${placeholder}`, values, function(err, results) {
            if(err){
                reject(err);
            } else{
                console.log(`Successfuly inserted new row in ${tableName} table!`)
                resolve(results);
            } 
        });
    })
};

//READ database / Search existing database
function searchExisting(term, tableName){
    return new Promise((resolve, reject) => {
        db.query(`SELECT ${term} FROM ${tableName}`, function(err, results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            } 
    });
    })
};

//READ Table
function viewTable(sql){
    return new Promise((resolve, reject) => {
        db.query(sql, function (err, rows, results) {
            if(err){
                reject(err);
            } else{
                console.table(rows);
                resolve(results);
            }   
        });
    });
};

//UPDATE value from row in table
function updateValue(tableName, columnName, value, id){
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${tableName} SET ${columnName} = ${value} WHERE id = ?`, id, function(err, results){
            if(err){
                reject(err);
            } else{
                console.log(`Successfully updated row in ${tableName} table!`)
                resolve(results);
            } 
    });
    })
}

//DELETE selected row
function deleteRow(tableName, value){
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${tableName} WHERE id = ?`, [value], function(err, results){
            if(err){
                reject(err);
            } else{
                console.log(`Successfully deleted row in ${tableName} table!`);
                resolve(results);
            } 
    });
    })
}

module.exports = {searchExisting, insertNew, updateValue, deleteRow, viewTable}