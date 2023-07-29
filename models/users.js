const { pool } = require('../utils/getPool');

const getStudents = async () => {
    const query = {
        text: 'SELECT rut, nombre, curso, nivel FROM estudiante ORDER BY rut ASC'
    }
    try {
        const users = await pool.query(query);
        return users.rows;
    } catch (err) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        return [];
    }
};

const insertStudents = async (rut, nombre, curso, nivel) => {
    const query = {
        text: 'INSERT INTO estudiante (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [rut, nombre, curso, nivel]
    }
    try {
        const res = await pool.query(query);
        return res.rows[0];
    } catch (error) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        return [];
    }
};

const updateStudents = async (rut, curso) => {
    const query = {
        text: 'UPDATE estudiante SET curso = $2 WHERE rut = $1 RETURNING *',
        values: [rut, curso]
    }
    try {
        const res = await pool.query(query);
        return res.rows[0];
    } catch (error) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        return [];
    }
};

const deleteStudents = async (rut) => {
    const query = {
        text: 'DELETE FROM estudiante WHERE rut = $1 RETURNING *',
        values: [rut]
    }
    try {
        const res = await pool.query(query);
        return res.rows[0] || [];
    } catch (error) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        return [];
    }
};

const getStudentByRut = async (rut) => {
    const query = {
        text: 'SELECT rut, nombre, curso, nivel FROM estudiante WHERE rut = $1',
        values: [rut]
    }
    try {
        const res = await pool.query(query);
        return res.rows[0] || {};
    } catch (err) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        return {};
    }
};

const getStudentsArray = async () => {
    const query = {
        text: "SELECT rut, nombre, curso, nivel FROM estudiante ORDER BY rut ASC",
        rowMode: "array",
    };
    try {
        const client = await pool.connect();
        const result = await client.query(query);
        if (result.rows.length) {
            console.log("Estudiantes encontrados:", result.rowCount);
            for (let row of result.rows) {
                console.log(row);
            }
            client.release();
            return result.rows;
        }
    } catch (err) {
        console.log("err.message:", err.message);
        console.log("err.stack:", err.stack);
        return [];
    }
};

module.exports = {
    getStudents,
    insertStudents,
    updateStudents,
    deleteStudents,
    getStudentByRut,
    getStudentsArray
}