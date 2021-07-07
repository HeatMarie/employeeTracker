DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;


CREATE TABLE department (
	id INT AUTO_INCREMENT,
	department VARCHAR(30),
    PRIMARY KEY (id) 
);

CREATE TABLE role (
	id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)    
    
);
    
    CREATE TABLE employee (
	id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)

);
INSERT INTO department (department)
	VALUE('Sales');
    
INSERT INTO department (department)
	VALUE ('Engineering');
INSERT INTO department (department)
	VALUE ('Finance');

INSERT INTO department (department)
	VALUE ('Legal');

INSERT INTO role (title, salary, department_id)
	VALUE('Sales Lead', 100000, 1);
    
INSERT INTO role (title, salary, department_id)
    VALUE('Salesperson', 80000, 1);

INSERT INTO role (title, salary, department_id) 
	VALUE ('Lead Engineer', 150000, 2);
    
INSERT INTO role (title, salary, department_id)
	VALUE ('Software Engineer', 120000, 2);
    
INSERT INTO role (title, salary, department_id) 
	VALUE ('Account Manager', 155000, 3);

INSERT INTO role (title, salary, department_id)
	VALUE ('Accountant', 125000, 3);
    
INSERT INTO role (title, salary, department_id)
	VALUE ('Legal Team Lead', 250000, 4);
    
INSERT INTO role (title, salary, department_id)
	VALUE ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
	VALUE ('George', 'Franklin', 1);
    
INSERT INTO employee (first_name, last_name, role_id)
	VALUE ('Haley', 'Volish', 3);

INSERT INTO employee (first_name, last_name, role_id)
	VALUE ('becky', 'French', 2);
    
INSERT INTO employee (first_name, last_name, role_id)
	VALUE ('Jack', 'Ligoon', 4);
    
    SELECT * FROM employee;
    
	Select * From role;
    
	Select * From department;
    
    SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;
    
SELECT first_name, last_name, title, salary, department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department = 'Sales';


