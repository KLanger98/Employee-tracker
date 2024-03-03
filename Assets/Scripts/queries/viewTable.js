const db = require('../database')

function viewTable(tableName){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName}`, function (err, rows, results) {
            if(err){
                reject(err);
            } else{
                console.table(rows);
                resolve(results);
            }   
        });
    });
};

module.exports = viewTable;