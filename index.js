const express = require('express');
const app = express();
require('dotenv').config();

const { 
    getEstudiantes, 
    insertEstudiantes
} = require('./models/users');

const PORT = process.env.PORT;

// localhost:3000/
app.get('/', async (req, res) => {
    try {
        const usuarios = await getEstudiantes();
        console.log('estudiantes:>>', usuarios);
        res.json(usuarios);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// localhost:3000/create?rut=6.666.666-6&nombre=Diego+Pérez&curso=trompeta&nivel=3
app.get('/create', async (req, res) => {
    try {
        rut = req.query.rut;
        nombre = req.query.nombre;
        curso = req.query.curso;
        nivel = req.query.nivel;
        const user = await insertEstudiantes(rut, nombre, curso, nivel);
        console.log(`Estudiante ${nombre} agregado con éxito.`);
        console.log(user);
        res.json({
            rut: user.rut,
            nombre: user.nombre,
            curso: user.curso,
            nivel: user.nivel
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//localhost:3000/updateRet?rut=7.777.777-7&nombre=Francisco+Vergara&curso=ballet&nivel5
app.get('/updateRet', async (req, res) => {
    try {
        rut = req.query.rut;
        nombre = req.query.nombre;
        curso = req.query.curso;
        nivel = req.query.nivel;
        const user = await modifyStudentReturning(rut, nombre, curso, nivel);
        console.log(`Se ha modificado el usuario rut ${rut}, 
        ${nombre}, para el curso ${ballet} en el nivel ${nivel}`);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// localhost:3000/deleteRet?id=6
// app.get('/deleteRet', async (req, res) => {
//     try {
//         id = req.query.id;
//         const user = await deleteUserReturning(id);
//         console.log(`Se ha eliminado el usuario id ${id}`);
//         res.json(user);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// localhost:3000/read?id=2
// app.get('/read', async (req, res) => {
//     try {
//         id = req.query.id;
//         const user = await getUserById(id);
//         res.json(user);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));