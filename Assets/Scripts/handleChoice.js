const mysql = require('mysql2');
const inquirer = require('inquirer');

const deleteFrom = require('./queries/delete')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'karl170798',
    database: 'employee_management_system_db'
  },
  console.log(`Connected to the employee_management_system_db database.`)
);

function handleChoice(option){
    switch(option){
        case "viewAllEmployees":
            return viewTable("employee");
        case "addEmployee":
            return addEmployee();
        case "updateEmployeeRole":
            return updateEmployeeRole();
        case "viewRoles":
            return viewTable("role")
        case "addRole":
            return addRole();
        case "viewDepartments":
            return viewTable("department");
        case "addDep":
            return addDepartment();
        case "updateEmployeeMan":
            return viewEmployeeManager();
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

function insertNew(tableName, columns, values){
    let placeholder = "(?)"
    if(values.length == 2){
        placeholder = "(?, ?)"
    } else if(values.length == 3){
        placeholder = "(?, ?, ?)"
    } else if (values.length == 4){
        placeholder = "(?, ?, ?, ?)"
    }

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${tableName} ${columns} VALUES ${placeholder}`, values, function(err, results) {
            if(err){
                reject(err);
            } else{
                resolve(results);
            } 
        });
    })
}

function searchExisting(term, tableName){
    return new Promise((resolve, reject) => {
        db.query(`SELECT ${term} FROM ${tableName}`, function(err, results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            } 
    });
    })
}

function employeeByManager(){
    return new Promise((resolve, reject) =>{
        searchExisting("first_name, last_name, id, manager_id")
            .then((response) => {
                let employees = formatEmployees(response);

                let question = [
                    {
                        message: "Select an employee",
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

function formatDepartments(response){
    return response.map(obj => {
        let newObj = {...obj};
        newObj.value = newObj.id;
        delete newObj.id;
        return newObj;
    })
}

function formatEmployees(response){
    return response.map(obj =>{
            let newObj = {
                name: obj.first_name + " " + obj.last_name,
                value: obj.id
            }
            return newObj;
        })
}

function formatRoles(response){
    return response.map(obj => {
        let newObj = {...obj};
        newObj.name = newObj.title;
        newObj.value = newObj.id;
        delete newObj.id;
        return newObj;
    })
}


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

function deleteRow(tableName, value){
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${tableName} WHERE id = ?`, [value], function(err, results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            } 
    });
    })
}


module.exports = handleChoice;