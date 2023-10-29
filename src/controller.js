import { pool } from './database.js';

class LibrosController {
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ "Error": "Ha ocurrido un error al consultar los libros" });
        }
    }

    async getOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('SELECT * FROM libros WHERE isbn = ?', [libro.isbn]);
            if (result.length > 0) {
                // Devuelve el libro encontrado
                res.json(result[0]);
            } else {
                // Devuelve un error
                res.status(404).json({ "Error": `No se encontró el libro con el ISBN  ${libro.isbn}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al consultar el libro" });
        }
    }


    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('INSERT INTO libros(nombre, autor, categoria, añopublicacion, isbn) VALUES (?,?,?,?,?)', [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn]);
            res.json({ "ID insertado": result.insertId, "message": "Libro insertado exitosamente" });
        } catch (error) {
            res.status(500).json({ "Error": "Ha ocurrido un error al agregar el libro" });
        }
    }

    async deleteisbn(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('DELETE FROM libros WHERE isbn = ?', [libro.isbn]);
            if (result.affectedRows > 0) {
                res.json({ "message": `Libro con isbn ${libro.isbn} eliminado exitosamente` });
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con isbn ${libro.isbn}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al intentar eliminar el libro" });
        }
    }

    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('UPDATE libros SET nombre = ?, autor = ?, categoria = ?, añopublicacion = ? WHERE isbn = ?', [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn]);
            if (result.affectedRows > 0) {
                res.json({ "message": `libro con isbn ${libro.isbn} actualizado exitosamente` });
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con el isbn ${libro.isbn}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al actualizar el libro" });
        }
    }
}

export const libro = new LibrosController();
