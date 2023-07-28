const { pool } = require('../utils/getPool');

const getEstudiantes = async () => {
    try {
        const users = await pool.query('SELECT rut, nombre, curso, nivel FROM estudiante ORDER BY rut ASC');
        console.log('users:', users);
        return users.rows;
    } catch (err) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
        return [];
    }
}

const insertEstudiantes = async (email, firstname, lastname, age) => {
    const query = {
        text: 'INSERT INTO users (email, firstname, lastname, age) VALUES ($1, $2, $3, $4)',
        values: [email, firstname, lastname, age]
    }
    try {
        const res = await pool.query(query);
        console.log(`Se ha agregado el usuario ${firstname}`);
        console.log('res:', res);
    } catch (error) {
        console.log('err.message:', err.message);
        console.log('err.stack:', err.stack);
    }
}

module.exports = {
    getEstudiantes,
    insertEstudiantes
}