const promptOps = require("../index");
const connection = require("../config/connection");
const consoleTable = require("console.table");

function dbOperations(data) {
    switch (data.userChoice) {
        case "View All Departments":
            viewAllDepartments();
            break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add a Department":
            addDepartment();
            break;
        case "Add a Role":
            addRole();
            break;
        case "Add an Employee":
            addEmployee();
            break;
        case "Update an Employee's Role":
            updateEmployeeRole();
            break;
        case "Update an Employee's Manager":
            updateEmployeeManager();
            break;
        case "View Employees by Manager":
            viewEmployeesByManager();
            break;
        case "View Employees by Department":
            viewEmployeesByDepartment();
            break;
        case "Delete a Department":
            deleteDepartment();
            break;
        case "Delete a Role":
            deleteRole();
            break;
        case "Delete an Employee":
            deleteEmployee();
            break;
        case "Quit":
            quit();
            break;
    }
}


function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptOps.init();
    });
};