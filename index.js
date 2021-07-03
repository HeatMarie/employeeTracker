// -------- Make sure you install all your packages -------
require('dotenv').config();
// gets inquirer from npm package

    const inquirer = require('inquirer');

// gets mysql from npm package
    const mysql = require('mysql');

// TODO: require console.table 

    const cTable = require('console.table');

   // ? Maybe use easy table? 


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD
})

// TODO: inquirer.prompt
    //TODO: Add deparments
    //TODO: Add roles
    //TODO: Add employees

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeStart',
            message: 'What would you like to do? ',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Exit']
            
        }
    ]).then(answers => {
        doLogic();
    });
};

const doLogic = (initAnswer) => {
    switch(initAnswer){
        case 'View All Employees':
            viewEmployees();
            break;
        case 'View All Employees By Department':
            viewDepartment();
            break;
        case 'View All Employees By Manager':
            viewManagers();
            break;
        case 'Add Employee':
            addEmployees();
            break;
        case 'Remove Employee':
            removeEmployee();
            break;
        case 'Update Employee Role':
            updateRole();
            break;
        case 'Update Employee Manager':
            updateManager();
            break;
        case 'Exit':
            default:
                connection.end()
    }
}

// TODO: View Departments
    //TODO: View roles
    //TODO: view employees

// TODO: Update employee roles

/*------------- BONUS ------------  */ 

// TODO: Update employee managers

// TODO: view employees by manager

// TODO: delete departments
    //TODO: delete roles
    //TODO: delete employees

// TODO: Use console.table to print MySQL rows to the console 
    //TODO: 

connection.connect((err) => {
    if (err){
        throw Error(err);
    }
    init();
})
