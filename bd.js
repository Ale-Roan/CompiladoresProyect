const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json()); 


const dbPath = 'C:/SQLITE/Basededatos/bd_Clinica.db';
console.log('Ruta del archivo de base de datos:', dbPath);


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos SQLite establecida');


        
        app.get('/datos', (req, res) => {
            const sql = `SELECT * FROM Pacientes`;
            db.all(sql, (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos del paciente fueron extraídos con éxito`);
                res.json(rows);
            });
        });

        
        app.get('/datos/:id', (req, res) => {
            const { id } = req.params;
            const sql = `SELECT * FROM Pacientes WHERE ID_Paciente = ${id}`;
            db.all(sql, (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos del paciente fueron extraídos con éxito`);
                res.json(rows);
            });
        });

        
        app.post('/nuevo', (req, res) => {
            const { Nombre, Fecha_nacimiento, Genero, Telefono, Correo_electronico } = req.body;

            
            const sql = 'INSERT INTO Pacientes (Nombre, Fecha_nacimiento, Genero, Telefono, Correo_electronico) VALUES (?, ?, ?, ?, ?)';

            
            db.run(sql, [Nombre, Fecha_nacimiento, Genero, Telefono, Correo_electronico], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                console.log(`Nuevo paciente registrado con ID: ${this.lastID}`);
                res.json({ message: 'Paciente registrado exitosamente', id: this.lastID });
            });
        });


        
        app.get('/citas', (req, res) => {
            const sql = `SELECT * FROM Citas WHERE estado = 'pendiente' ORDER BY fecha_cita ASC, hora_cita ASC`;
            db.all(sql, (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos citas fueron extraídos con éxito`);
                res.json(rows);
            });
        });


        
         app.get('/historial', (req, res) => {
            const sql = `SELECT * FROM Citas WHERE estado = 'terminado' ORDER BY fecha_cita ASC, hora_cita ASC`;
            db.all(sql, (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos citas fueron extraídos con éxito`);
                res.json(rows);
            });
        });


        
        app.get('/cita/:id', (req, res) => {
            const { id } = req.params
            const sql = `SELECT * FROM Citas WHERE ID_Cita = ${id}`;
            db.get(sql, (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos citas fueron extraídos con éxito`);
                res.json(rows);
            });
        });


       
        app.get('/terminar/:id', (req, res) => {
            const { id } = req.params
            const sql = `UPDATE Citas SET estado = ? WHERE ID_Cita = ?`;
            db.run(sql, [ 'terminado', id ], (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos citas fueron extraídos con éxito`);
                res.json(rows);
            });
        });

        
        app.post('/citanuevo', (req, res) => {
            const { ID_Paciente, Tipo_procedimiento, Notas_adicionales, fecha_cita, hora_cita} = req.body;

            
            const sql = 'INSERT INTO Citas (ID_Paciente, Tipo_procedimiento, Notas_adicionales, fecha_cita, hora_cita, estado) VALUES (?, ?, ?, ?, ?, ?)';

            
            db.run(sql, [ID_Paciente, Tipo_procedimiento, Notas_adicionales, fecha_cita, hora_cita, 'pendiente'], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                console.log(`Nueva cita registrada con ID: ${this.lastID}`);
                res.json({ message: 'Cita registrada exitosamente', id: this.lastID });
            });
        });


        app.put('/citas', (req, res) => {
            const { ID_Cita, ID_Paciente, Tipo_procedimiento, Notas_adicionales, fecha_cita, hora_cita} = req.body;

            
            const sql = `UPDATE Citas SET ID_Paciente = ?, Tipo_procedimiento = ?, Notas_adicionales = ?, fecha_cita = ?, hora_cita = ?  WHERE ID_Cita = ?`;

            
            db.run(sql, [ID_Paciente, Tipo_procedimiento, Notas_adicionales, fecha_cita, hora_cita, ID_Cita], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                console.log(`Nueva cita registrada con ID: ${this.lastID}`);
                res.json({ message: 'Cita registrada exitosamente', id: this.lastID });
            });
        });


        app.get('/ListaTratamientos/:id', (req, res) => {
            const { id } = req.params;
            const sql = `SELECT * FROM Tratamientos WHERE ID_Paciente = ${id}`;

            db.all(sql, (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos de la lista de tratamientos fueron extraídos con éxito`);
                res.json(rows);
            });
        });


        app.get('/ListaTratamientos', (req, res) => {
            const sql = 'SELECT * FROM Tratamientos';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos de la lista de tratamientos fueron extraídos con éxito`);
                res.json(rows);
            });
        });

        app.get('/users', (req, res) => {
            const sql = 'SELECT * FROM Usuarios';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                console.log(`Los datos de los usuarios fueron extraídos con éxito`);
                res.json(rows);
            });
        });

        app.post('/login', (req, res) => {
            const { usuario, password } = req.body;

            if (!usuario || !password) {
                return res.status(400).json({ error: 'Por favor, complete todos los campos.' });
            }

            const sql = 'SELECT * FROM Usuarios WHERE correo = ? AND contraseña = ?';
            db.get(sql, [usuario, password], (err, row) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (row) {
                    console.log(`Inicio de sesión exitoso para ${usuario}`);
                    res.json({ message: 'Inicio de sesión exitoso' });
                } else {
                    console.log(`Inicio de sesión fallido para ${usuario}`);
                    res.status(401).json({ error: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.' });
                }
            });
        });

        
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
        });
    }
});
