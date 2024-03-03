const inquirer = require('inquirer');
const {insertNew, searchExisting} = require('./databaseCRUD');
const {formatDepartments, formatEmployees, formatRoles} = require('./formatQuery');


function addDepartment(){
    return new Promise((resolve, reject) => {
        let questions = [
                {
                    message: "What is the Department name?",
                    name: "department",
                    type: "input"
                }
            ];
        inquirer
            .prompt(questions)
            .then((response) => {
                resolve(insertNew("department", "(name)", [response.department]))
            })
            .catch((error) => {
                    reject(error);
            });
    }); 
}



function addRole(){
    return new Promise ((resolve, reject) => {
        searchExisting("*", "department")
        .then((response) => {
            
            let departments = formatDepartments(response);

            let associatedQuestions = [
                {
                    message: "What is the title of the new Role?",
                    type: "input",
                    name:"role"
                },
                {
                    message: "What is the salary for this new Role?",
                    type: "number",
                    name: "salary"
                },
                {
                    message: "Select a department for this role",
                    type: "list",
                    name: "department",
                    choices: departments
                }
            ]
            inquirer
                .prompt(associatedQuestions)
                .then((response) => {
                    resolve(insertNew("role", "(title, salary, department_id)", [response.role, response.salary, response.department]))
                    
                    
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

function addEmployee(){
    return new Promise ((resolve, reject) => {
        searchExisting("title, id", "role")
        .then((response) => {
            let roles = formatRoles(response)
            searchExisting("first_name, last_name, id", "employee")
            .then((response) => {
                let employees = formatEmployees(response);
                let associatedQuestions = [
                {
                    message: "What is the employee's first name?",
                    type: "input",
                    name:"firstName"
                },
                {
                    message: "What is the employee's last name?",
                    type: "input",
                    name: "lastName"
                },
                {
                    message: "Select a role for this employee",
                    type: "list",
                    name: "role",
                    choices: roles
                },
                {
                    message: "Who is this Employee's manager",
                    type: "list",
                    name: "manager",
                    choices: employees
                }
            ]
            inquirer
                .prompt(associatedQuestions)
                .then((response) => {
                    resolve(insertNew("employee", "(first_name, last_name, role_id, manager_id)", [response.firstName, response.lastName, response.role, response.manager]))
                })
                .catch((err) => {
                    console.error(err)
                    reject(err)
                })
            })
        })
        .catch((err) =>{
            console.error(err)
            reject(err)
        })
    })
}

module.exports = {addDepartment, addEmployee, addRole}