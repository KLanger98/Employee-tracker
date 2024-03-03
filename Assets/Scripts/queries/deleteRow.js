const inquirer = require('inquirer');
const {deleteRow, searchExisting} = require('./databaseCRUD');
const {formatDepartments, formatEmployees, formatRoles} = require('./formatQuery');


function deleteFrom(searchTerm, tableName){
    return new Promise ((resolve, reject) => {
        searchExisting(searchTerm, tableName)
        .then((response) => {
            let formattedObj
            
            if(tableName == "department"){
                formattedObj = formatDepartments(response);
            } else if(tableName == "role"){
                formattedObj = formatRoles(response);
            } else if(tableName == "employee"){
                formattedObj = formatEmployees(response);
            };

            let associatedQuestions = [
                {
                    message: `Select ${tableName} to delete`,
                    type: "list",
                    name: "toDeleteID",
                    choices: formattedObj
                }
            ]
            inquirer
                .prompt(associatedQuestions)
                .then((response) => {
                    resolve(deleteRow(tableName, response.toDeleteID))
                })
                .catch((err) => {
                    console.error(err)
                    reject(err)
                })
        })
        .catch((err) =>{
            console.error(err)
            reject(err)
        })
    })
    
}


module.exports = deleteFrom;

