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
let departmentsArray = []
let rolesArray = []
let employeesArray = []

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeStart',
            message: 'What would you like to do? ',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Role', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role', 'Exit']

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
            case 'View All Employees By Role':
                viewRoles();
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
            case 'Update Employee Role':
                updateEmployeeRole();
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
    connection.query(`SELECT * FROM department`, (err, results) => {
        if (err) throw err; 

        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentView',
                message: `What department would you like to view?`,
                choices:  results.map((result) => result.department)
            }
        ]).then(answers => {
            const { departmentView } = answers

                    connection.query(`SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department ="${departmentView}"`, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        init();
                    })

        })
    })
    
}

function viewRoles() {
    connection.query(`SELECT * FROM role`, (err, results) => {
        if (err) throw err; 

        inquirer.prompt([
            {
                type: 'list',
                name: 'roleView',
                message: `What department would you like to view?`,
                choices:  results.map((result) => result.title)
            }
        ]).then(answers => {
            const { roleView } = answers

                    connection.query(`SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE title ="${roleView}"`, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        init();
                    })

        })
    })
    
}

function updateEmployeeRole() {
    
    connection.query(`SELECT * FROM role`, (err, roles) => {
        connection.query(`SELECT * FROM employee`, (err, results) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: 'rawlist',
                    name: 'employee',
                    message: `Which employee do you want to update?`,
                    choices: results.map((employee) => `${employee.first_name} ${employee.last_name}`)
                },
                {
                    type: 'rawlist',
                    name: 'role',
                    message: `Which title do you want to give this employee?`,
                    choices: roles.map((role) => role.title)
                }
            ]).then((answer) => {
                const employeeFirst = answer.employee.split(" ")[0];
                const employeeLast = answer.employee.split(" ")[1];
                const role_id = roles.filter((role) => role.title === answer.role).map((role) => role.id)[0];

                connection.query(`UPDATE employee SET role_id=${role_id} WHERE first_name="${employeeFirst}" AND last_name="${employeeLast}"`)

                init();
            });
        })
    })
}

function addEmployee() {
    connection.query(`SELECT * FROM role`, (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: `What is the new employee's first name?`
            },
            {
                type: 'input',
                name: 'lastName',
                message: `What is the new employee's last name?`
            },
            {
                type: 'rawlist',
                name: 'role',
                message: `What is the new employee's role?`,
                choices: results.map((role) => role.title)
            }
           
        ]).then((answer) => {
            connection.query(`INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: results
                                .filter((result) => result.title === answer.role)
                                .map((result) => result.id)[0]
                }
            )

            init();
        })
    })
}

function addRole() {
    connection.query(`SELECT * FROM department`, (err, results) => {
        if (err) throw err;
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
                type: 'rawlist',
                name: 'departmentId',
                message: 'What is the name of the Department?',
                choices: results.map((result) => result.department)
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO role SET ?`, 
                {
                    title: answer.roleTitle,
                    salary: answer.salary,
                    department_id: results
                                    .filter((result) => result.department === answer.departmentId)
                                    .map((result) => result.id)[0]
                });
                init();
        })
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
        });
        init();
    });
}



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
