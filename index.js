// import dependencies
const inquirer = require('inquirer');
const logo = require('asciiart-logo');


// prompts for user to select a database action
const userPrompts = [
    {
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee's Role",
            "Update an Employee's Manager",
            "View Employees by Manager",
            "View Employees by Department",
            "Delete a Department",
            "Delete a Role",
            "Delete an Employee",
            "Quit"
        ]
    }
];

// renders splashscreen logo and initializes inquirer to prompt the user for a database action
function promptOps() {
    inquirer.prompt(userPrompts).then(data => {
        dbOperations(data.userChoice);
    });
};

// utilizes the asciiart-logo package to render a splashscreen in the console
function renderASCIILogo() {
    const welcomeMessage = "Welcome to the Employee Management System! This application features an interface that allows you to view and manage the departments, roles, and employees in your company. To begin, simply select an action below and follow the prompts. Enjoy!"

    console.log(logo({ 
        name: "Employee Management System!",
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
    .center(welcomeMessage)
    .render());
};

function init() {
    renderASCIILogo();
    promptOps();
};

// function call to initialize program
init();

// export function to be used in db/index.js
exports.promptOps = promptOps;