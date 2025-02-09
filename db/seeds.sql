-- Pre-populate department table
INSERT INTO department (name) VALUES 
    ('Engineering'),
    ('Human Resources'),
    ('Marketing'),
    ('Finance');
-- Pre-populate role table
INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),  -- Engineering Department
    ('HR Manager', 75000, 2),         -- Human Resources Department
    ('Marketing Specialist', 60000, 3), -- Marketing Department
    ('Financial Analyst', 70000, 4),  -- Finance Department
    ('DevOps Engineer', 85000, 1),    -- Engineering Department
    ('Recruiter', 65000, 2);          -- Human Resources Department
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Lewis', 'Smith', 1, NULL),  -- Software Engineer, No Manager
    ('Blake', 'Johnson', 2, NULL),  -- HR Manager, Lewis is Manager
    ('Courtney', 'Brown', 3, NULL), -- Marketing Specialist, No Manager
    ('Royal', 'Kelly', 4, NULL), -- Financial Analyst, No Manager
    ('Sarah', 'Jones', 5, 1),       -- DevOps Engineer, Lewis is Manager
    ('Franny', 'Hopewell', 6, 2);     -- Recruiter, Blake is Manager