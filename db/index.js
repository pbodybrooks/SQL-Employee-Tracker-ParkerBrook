// import dependencies
const inquirer = require("inquirer");
const run = require("../index");
const connection = require("../config/connection");
const consoleTable = require("console.table");

// TEST CONNECTION
// const connection = require('./config/connection.js');
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) { if (error) throw error; console.log('The solution is: ', results[0].solution); });


function dbOperations(operation) {
    switch (operation) {
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
        run.promptOps();
    });
}

function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        run.promptOps();
    });
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        run.promptOps();
    });
}





module.exports = dbOperations;