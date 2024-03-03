
const inquirer = require('inquirer');

const viewTable = require('./queries/viewTable')

const {searchExisting, insertNew, updateValue, deleteRow} = require('./queries/databaseCRUD')
const {addDepartment, addEmployee, addRole} = require('./queries/addRow');
const {updateEmployee} = require('./queries/updateRow');
const deleteFrom = require('./queries/deleteRow')

const db = require('./database');

function handleChoice(option){
    switch(option){
        case "viewAllEmployees":
            return viewTable("employee");
        case "addEmployee":
            return addEmployee();
        case "updateEmployeeRole":
            return updateEmployee("role");
        case "viewRoles":
            return viewTable("role")
        case "addRole":
            return addRole();
        case "viewDepartments":
            return viewTable("department");
        case "addDep":
            return addDepartment();
        case "updateEmployeeMan":
            return updateEmployee("manager_id");
        case "viewEmployeeByMan":
            return employeeByManager();
        case "viewEmployeeByDep":
            return viewDepartments();
        case "deleteDepartment":
            return deleteFrom("*", "department");
        case "deleteRoles":
            return deleteFrom("title, id", "role");
        case "deleteEmployee":
            return deleteFrom("first_name, last_name, id", "employee");
    }
}





function employeeByManager(){
    return new Promise((resolve, reject) =>{
        searchExisting("first_name, last_name, id", "employee")
            .then((response) => {
                let employees = formatEmployees(response);

                let question = [
                    {
                        message: "Select a manager",
                        name: "managerID",
                        type: "list",
                        choices: employees
                    }
                ];

                inquirer
                .prompt(question)
                .then((response) => {
                    db.query(`SELECT first_name, last_name FROM employee WHERE manager_id = ${response.managerID}`, function(err, results){
                        if(err){
                            reject(err);
                        } else{
                            resolve(results);
                        } 
                    })
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











module.exports = handleChoice;