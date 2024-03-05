const inquirer = require('inquirer')

//List of options
const options = [
    {name: "View All Employees", value: "viewAllEmployees"},
    {name: "Add Employees", value: "addEmployee"},
    {name: "View All Roles", value: "viewRoles"},
    {name: "Add Role", value: "addRole"},
    {name: "View All Departments", value: "viewDepartments"},
    {name: "Add Department", value: "addDep"},
    {name: "Update Employee Role", value: "updateEmployeeRole"},
    {name: "Update Employee Manager", value: "updateEmployeeMan"},
    {name: "View Employees by Manager", value: "viewEmployeesByMan"},
    {name: "View Employees by Department", value: "viewEmployeesByDep"},
    {name: "Delete Department", value: "deleteDepartment"},
    {name: "Delete Roles", value: "deleteRoles"},
    {name: "Delete Employees", value: "deleteEmployee"},
    {name: "Quit", value: "quit"},
]


let optionsQuesiton = [
    {
        type: 'list',
        name: 'command',
        message: "What Would You Like To Do?",
        choices: options
    }
];

//Promise to handle initial prompt
function promptUser(){
    return new Promise((resolve, reject) => {
        inquirer
        .prompt(optionsQuesiton)
        .then((response) =>{
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}


module.exports = promptUser;