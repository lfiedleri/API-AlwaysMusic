const express = require('express');
const app = express();
require('dotenv').config();

const { 
    getStudents, 
    insertEstudiantes,
    updateStudents,
    deleteStudents, 
    getStudentByRut,
    getStudentsArray
} = require('./models/users');

const PORT = process.env.PORT;

// localhost:3000/
app.get('/', async (req, res) => {
    try {
        const estudiantes = await getStudents();
        console.log('estudiantes:>>', estudiantes);
        res.json(estudiantes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// localhost:3000/array
app.get('/array', async (req, res) => {
    try {
        const estudiantes = await getStudentsArray();
        res.json(estudiantes);
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

//localhost:3000/update?rut=6.666.666-6&curso=ballet
app.get('/update', async (req, res) => {
    try {
        rut = req.query.rut;
        curso = req.query.curso;
        const user = await updateStudents(rut, curso);
        console.log(`Se ha modificado el estudiante rut ${rut} con nuevo curso ${curso}`);
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//localhost:3000/delete?rut=6.666.666-6
app.get('/delete', async (req, res) => {
    try {
        rut = req.query.rut;
        const user = await deleteStudents(rut);
        console.log(`Se ha eliminado el usuario rut ${rut}`);
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//localhost:3000/read?rut=22.222.222-2
app.get('/read', async (req, res) => {
    try {
        rut = req.query.rut;
        const user = await getStudentByRut(rut);
        console.log(`Estudiante encontrado rut ${rut}`);
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));