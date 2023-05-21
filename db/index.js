// import dependencies
const inquirer = require("inquirer");
const run = require("../index");
const logo = require('asciiart-logo');
const connection = require("../config/connection");
const consoleTable = require("console.table");

// initialize selection arrays to be used for inquirer prompts
let departmentSelection = [];
let roleSelection = [];
let employeeSelection = [];
let managerSelection = [];

// create a dynamic success message for each operation
function logSuccessfulOperation(operation, successMsg) {
    if (operation !== "Quit" || "View All Departments" || "View All Roles" || "View All Employees" || "View Employees by Manager" || "View Employees by Department") {
        console.log('\x1b[32;1m%s\x1b[0m', `\n//////////////////////////////// Operation "${operation}" was completed successfully. ////////////////////////////////\n\n${successMsg}\n\n//////////////////////////////// Operation "${operation}" was completed successfully. ////////////////////////////////\n`);
    }
}

// create a dynamic view for each operation that is easier to read
function organizeView(view, res) {
    console.log('\x1b[32;1m%s\x1b[0m', `\n//////////////////////////////// Viewing ${view} ////////////////////////////////\n`);
    console.table(res);
    console.log('\x1b[32;1m%s\x1b[0m', `//////////////////////////////// Viewing ${view} ////////////////////////////////\n\n`);
}

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
}

// allow the user to exit the program by entering 'quit'
function quitPrompt(input) {
    if (input.toLowerCase() === 'quit') {
        // exit the program if 'quit' is entered
        process.exit();
    }
    return true;
}

// for a cleaner, better user experience, database operations have been split up by their respective actions (view, add, update, delete)
function dbOperations(operation) {
    switch (operation) {
        case "View":
            viewOperations();
            break;
        case "Add":
            addOperations(operation);
            break;
        case "Update":
            updateOperations(operation);
            break;
        case "Delete":
            deleteOperations(operation);
            break;
        case "Quit":
            quit();
            break;
    }

    // below is the switch case for the original prompt choices
    // switch (operation) {
    //     case "View All Departments":
    //         viewAllDepartments();
    //         break;
    //     case "View All Roles":
    //         viewAllRoles();
    //         break;
    //     case "View All Employees":
    //         viewAllEmployees();
    //         break;
    //     case "Add a Department":
    //         addDepartment(operation);
    //         break;
    //     case "Add a Role":
    //         addRole(operation);
    //         break;
    //     case "Add an Employee":
    //         addEmployee(operation);
    //         break;
    //     case "Update an Employee's Role":
    //         updateEmployeeRole(operation);
    //         break;
    //     case "Update an Employee's Manager":
    //         updateEmployeeManager(operation);
    //         break;
    //     case "View Employees by Manager":
    //         viewEmployeesByManager();
    //         break;
    //     case "View Employees by Department":
    //         viewEmployeesByDepartment();
    //         break;
    //     case "Delete a Department":
    //         deleteDepartment(operation);
    //         break;
    //     case "Delete a Role":
    //         deleteRole(operation);
    //         break;
    //     case "Delete an Employee":
    //         deleteEmployee(operation);
    //         break;
    //     case "Quit":
    //         quit();
    //         break;
    // }
}

// secondary switch function for all view operations
function viewOperations() {
    inquirer.prompt({
        name: "view",
        type: "list",
        message: "What would you like to view?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "View Employees by Manager", "View Employees by Department", "← Back"]
    }).then(function (answer) {
        switch (answer.view) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View Employees by Manager":
                viewEmployeesByManager();
                break;
            case "View Employees by Department":
                viewEmployeesByDepartment();
                break;
            case "← Back":
                run.promptOps();
                break;
        }
    });
}

// secondary switch function for all add operations
function addOperations() {
    inquirer.prompt({
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: ["Add a Department", "Add a Role", "Add an Employee", "← Back"]
    }).then(function (answer) {
        switch (answer.add) {
            case "Add a Department":
                addDepartment(answer.add);
                break;
            case "Add a Role":
                addRole(answer.add);
                break;
            case "Add an Employee":
                addEmployee(answer.add);
                break;
            case "← Back":
                run.promptOps();
                break;
        }
    });
}

// secondary switch function for all update operations
function updateOperations() {
    inquirer.prompt({
        name: "update",
        type: "list",
        message: "What would you like to update?",
        choices: ["Update an Employee's Role", "Update an Employee's Manager", "← Back"]
    }).then(function (answer) {
        switch (answer.update) {
            case "Update an Employee's Role":
                updateEmployeeRole(answer.update);
                break;
            case "Update an Employee's Manager":
                updateEmployeeManager(answer.update);
                break;
            case "← Back":
                run.promptOps();
                break;
        }
    });
}

// secondary switch function for all delete operations
function deleteOperations() {
    inquirer.prompt({
        name: "delete",
        type: "list",
        message: "What would you like to delete?",
        choices: ["Delete a Department", "Delete a Role", "Delete an Employee", "← Back"]
    }).then(function (answer) {
        switch (answer.delete) {
            case "Delete a Department":
                deleteDepartment(answer.delete);
                break;
            case "Delete a Role":
                deleteRole(answer.delete);
                break;
            case "Delete an Employee":
                deleteEmployee(answer.delete);
                break;
            case "← Back":
                run.promptOps();
                break;
        }
    });
}

function viewAllDepartments() {
    const view = "all departments";

    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        organizeView(view, res);
        run.promptOps();
    });
}

function viewAllRoles() {
    const view = "all roles";

    connection.query(`SELECT 
    role.id AS role_id, 
    role.role_title, 
    role.salary, 
    department.department_name 
    FROM role 
    JOIN department 
    ON role.department_id = department.id`, 
    function (err, res) {
        if (err) throw err;
        organizeView(view, res);
        run.promptOps();
    });
}

function viewAllEmployees() {
    const view = "all employees";

    connection.query(`SELECT 
    a.id AS employee_id,
    a.first_name,
    a.last_name, 
    c.role_title,
    d.department_name,
    c.salary,
    b.first_name AS manager_first_name,
    b.last_name AS manager_last_name
    FROM employee a
    LEFT JOIN employee b ON a.manager_id = b.id
    INNER JOIN role c ON a.role_id = c.id
    INNER JOIN department d ON d.id = c.department_id;`,
    function (err, res) {
        if (err) throw err;
        organizeView(view, res);
        run.promptOps();
    });
}


function addDepartment(operation) {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Please enter the name of the department you wish to add. [Enter 'quit' to exit]",
        validate: (input) => quitPrompt(input)
    }).then(function (answer) {
        connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.department], function (err, res) {
            if (err) throw err;
            const successMsg = `${answer.department} has been added to department database.`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

function addRole(operation) {
    inquirer.prompt([
        {
            type: "input",
            name: "role",            
            message: "Please enter the name of the role you wish to add. [Enter 'quit' to exit]",
            validate: (input) => quitPrompt(input)
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the salary for this role. [Enter 'quit' to exit]",
            validate: (input) => quitPrompt(input)
        },
        {
            type: "list",
            name: "department",
            message: "Please enter the department for this role.",
            choices: departmentSelection
        }
    ]).then(function (answer) {        
        connection.query("INSERT INTO role (role_title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?))", [answer.role, answer.salary, answer.department], function (err, res) {
            if (err) throw err;
            const successMsg = `${answer.role} has been added to role database.`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

function addEmployee(operation) {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter the employee's first name. [Enter 'quit' to exit]",
            validate: (input) => quitPrompt(input)
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the employee's last name. [Enter 'quit' to exit]",
            validate: (input) => quitPrompt(input)
        },
        {
            type: "list",
            name: "role",
            message: "Please select the role for this employee.",
            choices: roleSelection
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the manager this employee will report to:",
            choices: managerSelection
        }
    ]).then(function (answer) {
        const managerName = answer.manager.split(" ");

        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT r.id FROM role r WHERE r.role_title = ?), (SELECT e.id FROM employee e WHERE e.first_name = ? AND e.last_name = ?))`, [answer.firstName, answer.lastName, answer.role, managerName[0], managerName[1]], function (err, res) {
            if (err) throw err;
            const successMsg = `${answer.firstName} ${answer.lastName} has been added to the database with the role of ${answer.role}.\n${answer.firstName} will report to ${answer.manager}.`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

function updateEmployeeRole(operation) {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please select the name of the employee whose role you wish to update:",
            choices: employeeSelection
        },
        {
            type: "list",
            name: "role",
            message: "Please select the new role for this employee:",
            choices: roleSelection
        }
    ]).then(function (answer) {
        const employeeName = answer.employee.split(" ");

        connection.query("UPDATE employee SET role_id = (SELECT r.id FROM role r WHERE r.role_title = ?) WHERE employee.first_name = ? AND employee.last_name = ?;", [answer.role, employeeName[0], employeeName[1]], function (err, res) {
            if (err) throw err;
            const successMsg = `${answer.employee}'s role has been updated to ${answer.role}.`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

function updateEmployeeManager(operation) {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Please select the name of the employee whose manager you wish to update:",
            choices: employeeSelection
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the new manager for this employee:",
            choices: managerSelection
        }
    ]).then(function (answer) {
        const managerName = answer.manager.split(" ");
        const employeeName = answer.employee.split(" ");

        connection.query("UPDATE employee SET manager_id = (SELECT a.id FROM (SELECT b.id FROM employee b WHERE b.first_name = ? AND b.last_name = ?) a) WHERE first_name = ? AND last_name = ?;", [managerName[0], managerName[1], employeeName[0], employeeName[1]], function (err, res) {
            if (err) throw err;
            const successMsg = `${answer.employee}'s manager has been updated to ${answer.manager}.`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

function viewEmployeesByManager() {
    
    inquirer.prompt({
        name: "manager",
        type: "list",
        message: "Please select the manager whose direct reports you wish to view:",
        choices: managerSelection
    }).then(function (answer) {
        const view = `${answer.manager}'s direct reports`;
        const managerName = answer.manager.split(" ");

        connection.query("SELECT a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN role c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name = ? AND b.last_name = ?;", [managerName[0], managerName[1]], function (err, res) {
            if (err) throw err;
            organizeView(view, res);
            run.promptOps();
        });
    });
}

function viewEmployeesByDepartment() {
    inquirer.prompt({
        name: "department",
        type: "list",
        message: "Please select the department in which you wish to view employees:",
        choices: departmentSelection
    }).then(function (answer) {
        const view = `employees in ${answer.department} department`;

        connection.query("SELECT a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary, b.first_name AS manager_firstname, b.last_name AS manager_lastname FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN role c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE d.department_name = ?;", answer.department, function (err, res) {
            if (err) throw err;
            organizeView(view, res);
            run.promptOps();
        });
    });
}

function deleteDepartment(operation) {
    inquirer.prompt({
        name: "department",
        type: "list",
        message: "Please select the name of the department you wish to delete:",
        choices: departmentSelection
    }).then(function (answer) {
        connection.query("DELETE FROM department WHERE department_name = ?;", answer.department, function (err, res) {
            if (err) throw err;
            const successMsg = `"${answer.department}" has been removed from the department database.\n`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

function deleteRole(operation) {
    inquirer.prompt({
        name: "role",
        type: "list",
        message: "Please select the name of the role you wish to delete:",
        choices: roleSelection
    }).then(function (answer) {
        connection.query("DELETE FROM role WHERE role_title = ?;", answer.role, function (err, res) {
            if (err) throw err;
            const successMsg = `"${answer.role}" has been removed from the role database.\n`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

function deleteEmployee(operation) {
    inquirer.prompt({
        name: "employee",
        type: "list",
        message: "Please select the name of the employee you wish to delete:",
        choices: employeeSelection
    }).then(function (answer) {
        const employeeName = answer.employee.split(" ");

        connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?;", [employeeName[0], employeeName[1]], function (err, res) {
            if (err) throw err;
            const successMsg = `${answer.employee} has been removed from the department database.\n`;
            logSuccessfulOperation(operation, successMsg);
            run.promptOps();
        });
    });
}

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