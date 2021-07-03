DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;


CREATE TABLE role (
	id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
    
);

CREATE TABLE department (
	id INT AUTO_INCREMENT,
	name VARCHAR(30),
    PRIMARY KEY (id) 
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
    
    SELECT * FROM employee





