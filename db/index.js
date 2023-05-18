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

// fill the selection arrays from the database
function fillSelectionArrays() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const uniqueDepartments = new Set(res.map(item => item.department_name));
        departmentSelection = [...uniqueDepartments];
    });

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        const uniqueRoles = new Set(res.map(item => item.role_title));
        roleSelection = [...uniqueRoles];
    });

    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const uniqueEmployees = new Set(res.map(item => item.first_name + " " + item.last_name));
        employeeSelection = [...uniqueEmployees];
    });

    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err;
        const uniqueManagers = new Set(res.map(item => item.first_name + " " + item.last_name));
        managerSelection = [...uniqueManagers];
    });
    // console.log(departmentSelection);
    // console.log(roleSelection);
    // console.log(employeeSelection);
    // console.log(managerSelection);

       // connection.query("SELECT * FROM department", function (err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         departmentSelection.push(res[i].department_name);
    //     }
    // });
    // connection.query("SELECT * FROM role", function (err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         roleSelection.push(res[i].role_title);
    //     }
    // });
    // connection.query("SELECT * FROM employee", function (err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         employeeSelection.push(res[i].first_name + " " + res[i].last_name);
    //     }
    // });
    // connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         managerSelection.push(res[i].first_name + " " + res[i].last_name);
    //     }
    // });
}

function dbOperations(operation) {
    fillSelectionArrays();
    // console.log(departmentSelection);
    // console.log(roleSelection);
    // console.log(employeeSelection);
    // console.log(managerSelection);

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

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter the employee's first name:"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the employee's last name:"
        },
        {
            type: "list",
            name: "role",
            // circle back to this once decided if I want to use role name or role id
            message: "Please select the role for this employee:",
            choices: roleSelection
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the name of the manager this employee will report to:",
            choices: managerSelection
        }
    ]).then(function (answer) {
        roleID = roleSelection.indexOf(answer.role) + 1;
        managerID = managerSelection.indexOf(answer.manager) + 1;

        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, roleID, managerID], function (err, res) {
            if (err) throw err;
            console.log(`Added ${answer.firstName} ${answer.lastName} to the database with the role of ${answer.role}.\n${answer.firstName} will report to ${answer.manager}.`);
            fillSelectionArrays();
            run.promptOps();
        });
    });
}




// case "Add a Role":
//     addRole();
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

module.exports = {dbOperations, fillSelectionArrays};
// module.exports = dbOperations;