--psql -U postgres
--CREATE DATABASE db_music OWNER node_user;
--\q
--psql -d db_music -U node_user

CREATE TABLE estudiante (
    rut VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    curso VARCHAR(255),
    nivel INTEGER
);

INSERT INTO estudiante (rut, nombre, curso, nivel)
VALUES ('1.111.111-1', 'Kevin Villarroel', 'piano', 7),
('22.222.222-2', 'Anakarina Mora', 'piano', 4),
('3.333.333-3', 'Angeles Cahil', 'guitarra', 8),
('4.444.444-4', 'Linda Fiedler', 'violin', 6),
('5.555.555-5', 'María Díaz', 'saxofón', 9);