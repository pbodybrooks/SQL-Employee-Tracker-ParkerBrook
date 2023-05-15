// import dependencies
const inquirer = require("inquirer");
const run = require("../index");
const logo = require('asciiart-logo');
const connection = require("../config/connection");
const consoleTable = require("console.table");

// TEST CONNECTION
// const connection = require('./config/connection.js');
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) { if (error) throw error; console.log('The solution is: ', results[0].solution); });

let departmentSelection = [];
let roleSelection = [];
let employeeSelection = [];
let managerSelection = [];

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

function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Please enter the name of the department you wish to add:"
    }).then(function (answer) {
        connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.department], function (err, res) {
            if (err) throw err;
            console.log("Department added successfully!");
            run.promptOps();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",            
            message: "Please enter the name of the role you wish to add:"
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the salary for this role:"
        },
        {
            type: "list",
            name: "department",
            message: "Please enter the department ID for this role:",
            choices: departmentSelection
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.role, answer.salary, answer.department], function (err, res) {
            if (err) throw err;
            console.log("Role added successfully!");
            run.promptOps();
        });
    });
}

// case "Add a Role":
//     addRole();
//     break;
// case "Add an Employee":
//     addEmployee();
//     break;
// case "Update an Employee's Role":
//     updateEmployeeRole();
//     break;
// case "Update an Employee's Manager":
//     updateEmployeeManager();
//     break;
// case "View Employees by Manager":
//     viewEmployeesByManager();
//     break;
// case "View Employees by Department":
//     viewEmployeesByDepartment();
//     break;
// case "Delete a Department":
//     deleteDepartment();
//     break;
// case "Delete a Role":
//     deleteRole();
//     break;
// case "Delete an Employee":
//     deleteEmployee();
//     break;
// case "Quit":
//     quit();
//     break;

function quit() {
    renderExitScreen();
    connection.end();
    process.exit();
}


function renderExitScreen() {
    const goodbyeMessage = "Thank you for using the Employee Management System! To begin a new session, please run 'npm start' in your terminal."

    console.log(logo({ 
        name: "auf Wiedersehen!",
        font: "DOS Rebel",
        lineChars: 8,
        padding: 2,
        margin: 2,
        borderColor: 'bold-blue',
        logoColor: 'blue',
        textColor: 'bold-white',
    })
    .emptyLine()
    .right('Built with ♥ by Park')
    .emptyLine()
    .emptyLine()
    .center(goodbyeMessage)
    .render());
};

module.exports = dbOperations;