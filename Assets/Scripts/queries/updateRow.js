const inquirer = require('inquirer');
const {updateValue, searchExisting} = require('./databaseCRUD');
const formatResponse = require('./formatQuery');


//Update an employee
function updateEmployee(column){
    return new Promise((resolve, reject) =>{
        searchExisting("first_name, last_name, id", "employee")
            .then((response) => {
                let employees = formatResponse(response, "employee");

                //Update only role
                if(column == "role"){
                    updateRole(employees)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                }

                //Continue to update manager
                let question = [
                    {
                        message: "Select an Employee",
                        name: "employeeID",
                        type: "list",
                        choices: employees
                    },
                    {
                        message: "Select a Manager",
                        name: "managerID",
                        type: "list",
                        choices: employees
                    },
                ];

                inquirer
                .prompt(question)
                .then((response) => {
                    resolve(updateValue("employee", "manager_id", response.managerID, response.employeeID ))
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

//Update employee role
function updateRole(employees){
    return new Promise((resolve, reject) => {
        searchExisting("title, id", "role")
        .then((response) => {
            let roles = formatResponse(response, "role");

            let question = [
                {
                        message: "Select an employee",
                        name: "employeeID",
                        type: "list",
                        choices: employees
                },
                {
                    messag: "Select a role",
                    name: "roleID",
                    type: "list",
                    choices: roles
                }
            ]

            inquirer
                .prompt(question)
                .then((response) => {
                    resolve(updateValue("employee", "role_id", response.roleID, response.employeeID))
                })
                .catch((err) => {
                    reject(err)
                });
        })
    })
    
}


module.exports = {updateEmployee, updateRole}