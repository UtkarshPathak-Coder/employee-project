import express from 'express';
import pool from '../utils/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * FROM admin WHERE email=$1 AND password=$2";
    pool.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "query error" });
        if (result.rows.length > 0) {
            const email = result.rows[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token',token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Incorrect email or password" });
        }
    });
});
router.get('/Category', (req, res) => {
    const sql = "SELECT * FROM department";
    pool.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error : "Query Error"});
        return res.json({Status: true, Result: result.rows});
    });
});

router.post('/Addcategory', (req, res) => {
    const sql = "INSERT INTO department (name) VALUES ($1)";
    pool.query(sql, [req.body.category], (err, result) => {
        if (err) {
            if (err.code === '23505') { 
                return res.json({ Status: false, Error: "Duplicate entry. Department already exists." });
            } else {
                console.error(err);
                return res.json({ Status: false, Error: "Query Error" });
            }
        }
        return res.json({ Status: true });
    });
});

router.post('/addemployee', (req, res) => {
    const sqlCheckEmail = `SELECT * FROM employee WHERE LOWER(email) = $1`;
    pool.query(sqlCheckEmail, [req.body.email.toLowerCase()], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }

        if (result.rows.length > 0) {
            return res.json({ Status: false, Error: "Duplicate email entry" });
        }

        const sqlInsertEmployee = `INSERT INTO employee (name, email, password, salary, address, department_id) VALUES ($1, $2, $3, $4, $5, $6)`;
       
            const values = [
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.salary,
                req.body.address,
                req.body.category_id
            ];
            pool.query(sqlInsertEmployee, values, (err, result) => {
                if (err) return res.json({ Status: false, Error: err });
                return res.json({ Status: true });
            });
        
    });
});


router.get('/employee', (req, res) => {
    const sql = "SELECT e.*, d.name AS department_name FROM employee e JOIN department d ON e.department_id = d.id order by e.id ASC";
    pool.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error : "Query Error"});
        return res.json({Status: true, Result: result.rows});
    });
});
router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id=$1";
    pool.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error : "Query Error"});
        return res.json({Status: true, Result: result.rows});
    });
});

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE EMPLOYEE SET name=$1, email=$2, salary=$3, address=$4, department_id=$5 WHERE id=$6';
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ];
    pool.query(sql, [...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error : "Query Error"});
        return res.json({Status: true});
    });
});

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM employee WHERE id=$1';
    pool.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error : "Query Error"});
        return res.json({Status: true});
    });
});
router.get('/admin_count', (req, res) => {
    const sql = 'SELECT COUNT(id) AS admin FROM admin';
    pool.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, admin: result.rows[0].admin }); 
    });
});
router.get('/employee_count', (req, res) => {
    const sql = 'SELECT COUNT(id) AS employee FROM employee';
    pool.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, employee: result.rows[0].employee }); 
    });
});
router.get('/salary_count', (req, res) => {
    const sql = 'SELECT sum(salary) AS salary FROM employee';
    pool.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, salary: result.rows[0].salary }); 
    });
});


router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})
router.get('/admin_record', (req, res) => {
    const sql = "SElect * from admin";
    pool.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error : "Query Error"});
        return res.json({Status: true, Result: result.rows});
    });
});
router.put('/edit_adminpass/:id', (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const sql = 'UPDATE admin SET password = $1 WHERE id = $2';
    pool.query(sql, [password, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
    });
});


export { router as adminRouter }