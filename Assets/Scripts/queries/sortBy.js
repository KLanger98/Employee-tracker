const inquirer = require('inquirer');
const formatResponse = require('./formatQuery');
const {searchExisting} = require('./databaseCRUD');
const db = require('../database');


function employeesBySelected(searchTerm, tableName, group){
    return new Promise((resolve, reject) =>{
        searchExisting(searchTerm, tableName)
            .then((response) => {
                let employees = formatResponse(response, tableName);

                if(group == "manager"){
                    
                }

                let question = [
                    {
                        message: `Select a ${group}`,
                        name: "sortID",
                        type: "list",
                        choices: employees
                    }
                ];

                inquirer
                .prompt(question)
                .then((response) => {
                    if(group == "manager"){
                        db.query(`SELECT first_name, last_name FROM employee WHERE manager_id = ?`, response.sortID, function(err, results){
                        if(err){
                            reject(err);
                        } else{
                            console.table(results)
                            resolve(results);
                        } 
                    })
                    } else if(group == "department"){
                        db.query(`SELECT first_name, last_name FROM employee JOIN role ON employee.role_id = role.id WHERE department_id = ?`, response.sortID, function(err, results){
                        if(err){
                            reject(err);
                        } else{
                            console.table(results)
                            resolve(results);
                        } 
                    })
                    }
                    
                })
                .catch((err) => {
                    console.error(err)
                });
            })
            .catch((err) => {
                console.error(err)
            })
    })
}

module.exports = employeesBySelected;