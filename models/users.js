const { pool } = require('../utils/getPool');

const getEstudiantes = async () => {
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
}

const insertEstudiantes = async (rut, nombre, curso, nivel) => {
    const query = {
        text: 'INSERT INTO estudiante (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [rut, nombre, curso, nivel]
    }
    try {
        const res = await pool.query(query);
        //console.log(`Se ha agregado el estudiante ${nombre}`);
        //console.log('res.rows[0]:', res.rows[0]);
        return res.rows[0];
    } catch (error) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        return [];
    }
}

module.exports = {
    getEstudiantes, 
    insertEstudiantes
}