const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Obtener todos los elementos
router.get('/', (req, res) => {
  db.query('SELECT * FROM elementos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Obtener un solo elemento por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM elementos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Elemento no encontrado' });
    }
    res.json(results[0]);
  });
});

// Agregar un nuevo elemento
router.post('/', (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }

    db.query('INSERT INTO elementos (nombre) VALUES (?)', [nombre], (err, result) => {
        if (err) {
            console.error('Error al agregar el elemento:', err);
            res.status(500).json({ error: 'Error al agregar el elemento', details: err });
        } else {
            res.json({ id: result.insertId, nombre });
        }
    });
});


// Actualizar un elemento
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  db.query('UPDATE elementos SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Elemento actualizado correctamente' });
  });
});

// Eliminar un elemento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM elementos WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Elemento eliminado correctamente' });
  });
});

module.exports = router;
