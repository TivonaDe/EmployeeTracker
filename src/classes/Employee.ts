import { pool } from '../connection.js';
import { QueryResult } from 'pg';

class Employee {

    static async getAllEmployees(): Promise<any[]> {
        const sql = `SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department, 
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            JOIN role 
                ON employee.role_id = role.id
            JOIN department
                ON role.department_id = department.id
            LEFT JOIN employee AS manager
                ON employee.manager_id = manager.id`;
        
        return new Promise((resolve, reject) => {
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching employees:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }

    static async getEmployeesByManager(manager_id: number): Promise<any[]> {
        const sql = `SELECT
                        employee.id,
                        employee.first_name,
                        employee.last_name,
                        role.title,
                        department.name AS department,
                        role.salary,
                        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                    FROM employee
                    JOIN role
                        ON employee.role_id = role.id
                    JOIN department
                        ON role.department_id = department.id
                    LEFT JOIN employee AS manager
                        ON employee.manager_id = manager.id
                    WHERE employee.manager_id = $1
                    ORDER BY employee.last_name`
        const params = [manager_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching employees by manager:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }

    static async getUniqueManagers(): Promise<any[]> {
        const sql=`SELECT DISTINCT
                        manager.id,
                        manager.first_name,
                        manager.last_name
                    FROM employee
                    JOIN employee AS manager
                        ON employee.manager_id = manager.id
                    ORDER BY manager.last_name`
        
        return new Promise((resolve, reject) => {
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching unique managers:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }

    static async getEmployeesByDepartment(department_id: number): Promise<any[]> {
        const sql = `SELECT
                        employee.id,
                        employee.first_name,
                        employee.last_name,
                        role.title,
                        department.name AS department,
                        role.salary,
                        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                    FROM employee
                    JOIN role
                        ON employee.role_id = role.id
                    JOIN department
                        ON role.department_id = department.id
                    LEFT JOIN employee AS manager
                        ON employee.manager_id = manager.id
                    WHERE role.department_id = $1
                    ORDER BY employee.last_name`
        const params = [department_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching employees by department:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }

    static async getEmployeesByRoleId(role_id: number): Promise<any[]> {
        const sql = `SELECT * FROM employee WHERE role_id = $1`;
        const params = [role_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching employees by role id:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }

    static async addEmployee(first_name: string, last_name: string, role_id: number, manager_id?: number | null): Promise<void> {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ($1, $2, $3, $4);`
        const params = [first_name, last_name, role_id, manager_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, _result: QueryResult) => {
                if (err) {
                    console.error('Failed to add employee:', err.message);
                    return reject(err);
                }
                console.log('Employee succesfully added');
                resolve();
            });
        });
    }

    static async deleteEmployee(employee_id: number): Promise<void> {
        const sql = `DELETE FROM employee WHERE id = $1`;
        const params = [employee_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, _result: QueryResult) => {
                if (err) {
                    console.error('Failed to delete employee', err.message);
                    return reject(err);
                }
                console.log('Employee successfully deleted');
                resolve();
            });
        });
    }

    static async updateEmployeeRole(employee_id: number, role_id: number): Promise<void> {
        const sql = `UPDATE employee SET role_id = $2 WHERE id = $1`;
        const params = [employee_id, role_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, _result: QueryResult) => {
                if (err) {
                    console.error('Failed to update employee role:', err.message);
                    return reject(err);
                }
                console.log('Employee role successfully updated');
                resolve();
            });
        });
    }

    static async updateEmployeeManager(employee_id: number, manager_id: number): Promise<void> {
        const sql = `UPDATE employee SET manager_id = $2 WHERE id = $1`;
        const params = [employee_id, manager_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, _result: QueryResult) => {
                if (err) {
                    console.error('Failed to update employee manager:', err.message);
                    return reject(err);
                }
                console.log('Employee manager successfully updated')
                resolve();
            });
        });
    }

}

export default Employee;0