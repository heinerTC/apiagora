// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Simulación de base de datos en memoria
let users = []; // Almacena usuarios registrados

// Ruta para el registro de usuarios
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Validar que el usuario y la contraseña estén presentes
    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
    }

    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: 'El usuario ya está registrado.' });
    }

    // Registrar el nuevo usuario
    users.push({ username, password });
    res.status(201).json({ message: 'Registro exitoso.' });
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validar que el usuario y la contraseña estén presentes
    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
    }

    // Verificar credenciales
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return res.status(200).json({ message: 'Autenticación satisfactoria.' });
    } else {
        return res.status(401).json({ error: 'Error en la autenticación.' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servicio web escuchando en http://localhost:${port}`);
});
