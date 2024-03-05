const {viewTable} = require('./queries/databaseCRUD')
const {addDepartment, addEmployee, addRole} = require('./queries/addRow');
const {updateEmployee} = require('./queries/updateRow');
const deleteFrom = require('./queries/deleteRow');
const employeesBySelected = require('./queries/sortBy');

const db = require('./database');

function handleChoice(option){

    switch(option){
        case "viewAllEmployees":
            return viewTable("SELECT e.id AS Employee_ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee_Name , role.title AS Role_Title, role.salary, department.name AS Department_Name, CONCAT(m.first_name, ' ', m.last_name) AS Manager_Name FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id");
        case "addEmployee":
            return addEmployee();
        case "updateEmployeeRole":
            return updateEmployee("role");
        case "viewRoles":
            return viewTable("SELECT role.id, role.title, role.salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id")
        case "addRole":
            return addRole();
        case "viewDepartments":
            return viewTable("SELECT * FROM department");
        case "addDep":
            return addDepartment();
        case "updateEmployeeMan":
            return updateEmployee("manager_id");
        case "viewEmployeesByMan":
            return employeesBySelected("first_name, last_name, id", "employee", "manager");
        case "viewEmployeesByDep":
            return employeesBySelected("name, id", "department", "department");
        case "deleteDepartment":
            return deleteFrom("*", "department");
        case "deleteRoles":
            return deleteFrom("title, id", "role");
        case "deleteEmployee":
            return deleteFrom("first_name, last_name, id", "employee");
        case "quit":
            console.log("Quitting Employee Management System..")
            return process.exit();
    }
}





module.exports = handleChoice;