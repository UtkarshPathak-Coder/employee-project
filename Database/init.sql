-- Create the 'admin' table
CREATE TABLE IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(140) NOT NULL
);

-- Insert data into the 'admin' table
INSERT INTO admin (email, password) VALUES
    ('admin@gmail.com', '12345');

-- Create the 'department' table
CREATE TABLE IF NOT EXISTS department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Insert data into the 'department' table  
INSERT INTO department (name) VALUES
    ('DEVOPS');

-- Create the 'employee' table
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(150) NOT NULL,
    salary INTEGER NOT NULL,
    address VARCHAR(30) NOT NULL,
    department_id INTEGER NOT NULL
);

-- Add the necessary indexes
CREATE INDEX IF NOT EXISTS idx_department_id ON employee (department_id);

-- Add the foreign key constraint
ALTER TABLE employee
    ADD CONSTRAINT fk_department
    FOREIGN KEY (department_id) REFERENCES department (id);

-- Add unique constraint on department name
ALTER TABLE department ADD CONSTRAINT unique_dept_name UNIQUE (name);

-- Add unique constraint on employee email
ALTER TABLE employee ADD CONSTRAINT unique_email UNIQUE (email);
