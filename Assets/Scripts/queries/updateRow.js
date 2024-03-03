const inquirer = require('inquirer');
const {updateValue, searchExisting} = require('./databaseCRUD');
const {formatDepartments, formatEmployees, formatRoles} = require('./formatQuery');

function updateEmployee(column){
    return new Promise((resolve, reject) =>{
        searchExisting("first_name, last_name, id", "employee")
            .then((response) => {
                let employees = formatEmployees(response);

                if(column == "role"){
                    updateRole(employees)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                    return;
                }

                let question = [
                    {
                        message: "Select an employee",
                        name: "employeeID",
                        type: "list",
                        choices: employees
                    },
                    {
                        message: "Select a manager",
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

function updateRole(employees){
    return new Promise((resolve, reject) => {
        searchExisting("title, id", "role")
        .then((response) => {
            let roles = formatRoles(response);

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