// import dependencies
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const { dbOperations, fillSelectionArrays } = require('./db/index');

// prompts for user to select a database action
// for a better user experience, database operations have been split up by their respective actions (view, add, update, delete)
const userPrompts = [
    {
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: [
            "View",
            "Add",
            "Update",
            "Delete",
            "Quit"
        ]
        // choices: [
        //     "View All Departments",
        //     "View All Roles",
        //     "View All Employees",
        //     "Add a Department",
        //     "Add a Role",
        //     "Add an Employee",
        //     "Update an Employee's Role",
        //     "Update an Employee's Manager",
        //     "View Employees by Manager",
        //     "View Employees by Department",
        //     "Delete a Department",
        //     "Delete a Role",
        //     "Delete an Employee",
        //     "Quit"
        // ]
        
    }
];

// updates selection arrays, initializes inquirer to prompt the user for a database action, and feeds response into dbOperations function
function promptOps() {
    fillSelectionArrays();

    inquirer.prompt(userPrompts).then(data => {
        dbOperations(data.userChoice);
    });
};

// utilizes the asciiart-logo package to render a splashscreen in the console
function renderWelcomeScreen() {
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

// calls both the splashscreen logo and prompts for user input
function init() {
    renderWelcomeScreen();
    fillSelectionArrays();
    promptOps();
};

// function call to initialize program
init();

// export function to be used in db/index.js
exports.promptOps = promptOps;