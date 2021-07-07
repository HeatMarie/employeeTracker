require('dotenv').config();


const inquirer = require('inquirer');


const mysql = require('mysql');



const cTable = require('console.table');
const { resourceLimits } = require('worker_threads');
const { listenerCount } = require('events');
const { royalblue } = require('color-name');
const { allowedNodeEnvironmentFlags } = require('process');

// ? Maybe use easy table? 


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


//TODO: Add deparments
//TODO: Add roles
//TODO: Add employees

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeStart',
            message: 'What would you like to do? ',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Add Department', 'Add Role', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Exit']

        }
    ]).then(answers => {
        const { employeeStart } = answers
        switch (employeeStart) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'View All Employees By Department':
                viewByDepartment();
                break;
            case 'View All Employees By Manager':
                viewManagers();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break
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
    });
};


const viewEmployees = () => {
    connection.query('SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}


function viewByDepartment() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'departmentView',
            message: `What department would you like to view?`,
            choices: [`Sales`, `Engineering`, `Financial`, `Legal`]
        }
    ]).then(answers => {
        const { departmentView } = answers
        switch (departmentView) {
            case `Sales`:
                connection.query(`SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department = 'Sales'`, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                })
                break;
            case `Engineering`:
                connection.query(`SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department = 'Engineering'`, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                })
                break;
            case `Financial`:
                connection.query(`SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department = 'Finance'`, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                })
                break;
            case `Legal`:
                connection.query(`SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department = 'Legal'`, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                })
                break;
        }

    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: `What is the new employee's first name?`
        },
        {
            type: 'input',
            name: 'lastName',
            message: `What is the new employee's lasts name?`
        },
        {
            type: 'list',
            name: 'role',
            message: `What is the new employee's role?`,
            choices: ['Salesperson', 'Sales Lead', 'Software Engineer', 'Lead Engineer', 'Accountant', 'Account Manager', 'Lawyer', 'Legal Team Lead']
        }
    ]).then((answer) => {
        switch(answer.role){
            case 'Salesperson':
                role = 2;
                break;
            case 'Sales Lead':
                role = 1;
                break;
            case 'Software Engineer':
                role = 4;
                break;
            case 'Lead Engineer':
                role = 3;
                break;
            case 'Accountant':
                role = 6;
                break;
            case 'Account Manager':
                role = 5;
                break;
            case 'Lawyer':
                role = 8;
                break;
            case 'Legal Team Lead':
                role = 7;
                break;
        }
        console.log(role)
        connection.query(`INSERT INTO employee SET ?`,
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: role

            },
        )
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the name of the new role you would like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the name of the Department?'
        },
    ]).then((answer) => {
        switch(answer.departmentId){
            case 'Sales':
                departmentId = 1;
                break;
            case 'Engineering':
                departmentId = 2;
                break;
            case 'Finance':
                departmentId = 3;
                break;
            case 'Legal':
                departmentId = 4;
                break;
        }
    console.log(departmentId)
    connection.query(`INSERT INTO role SET ?`, 
    {
        title: answer.roleTitle,
        salary: answer.salary,
        department_id: departmentId
    },
    )
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ]).then((answer) => {
        connection.query(`INSERT INTO department SET ?`,
        {
            department: answer.department
        }
        )
    })
}

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
    if (err) {
        throw Error(err);
    }
    init();
})
