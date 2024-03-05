const inquirer = require('inquirer');
const {deleteRow, searchExisting} = require('./databaseCRUD');
const formatResponse = require('./formatQuery');

//Delete selected row from selected table
function deleteFrom(searchTerm, tableName){
    return new Promise ((resolve, reject) => {
        searchExisting(searchTerm, tableName)
        .then((response) => {
            let formattedObj = formatResponse(response, tableName)

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

