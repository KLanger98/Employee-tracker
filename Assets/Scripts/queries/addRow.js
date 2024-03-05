const inquirer = require('inquirer');
const {insertNew, searchExisting} = require('./databaseCRUD');
const formatQuery = require('./formatQuery');


//Add a department to department table
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


//Add a role to role table
function addRole(){
    return new Promise ((resolve, reject) => {
        searchExisting("*", "department")
        .then((response) => {
            
            let departments = formatQuery(response, "department");

            let associatedQuestions = [
                {
                    message: "What is the Title of the new Role?",
                    type: "input",
                    name:"role"
                },
                {
                    message: "What is the Salary for this new Role?",
                    type: "number",
                    name: "salary"
                },
                {
                    message: "Select a Department for this Role",
                    type: "list",
                    name: "department",
                    choices: departments
                }
            ]
            inquirer
                .prompt(associatedQuestions)
                .then((response) => {
                    resolve(insertNew("role", "(title, salary, department_id)", [response.role, response.salary, response.department]));
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

//Add Employee to employee
function addEmployee(){
    return new Promise ((resolve, reject) => {
        searchExisting("title, id", "role")
        .then((response) => {
            let roles = formatQuery(response, "role")
            searchExisting("first_name, last_name, id", "employee")
            .then((response) => {
                let employees = formatQuery(response, "employee");
                let associatedQuestions = [
                {
                    message: "What is the Employee's first name?",
                    type: "input",
                    name:"firstName"
                },
                {
                    message: "What is the Employee's last name?",
                    type: "input",
                    name: "lastName"
                },
                {
                    message: "Select a Role for this Employee",
                    type: "list",
                    name: "role",
                    choices: roles
                },
                {
                    message: "Who is this Employee's Manager",
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