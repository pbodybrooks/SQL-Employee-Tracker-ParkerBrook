const inquirer = require('inquirer');

const logo = require('asciiart-logo');


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