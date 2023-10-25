import { pool } from './database.js';

class LibrosController {
    async getAll(req, res) {
        try {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    } catch (error){
        res.status(500).json({"Error": "Ha ocurrido un error al consultar los libros"});
    }
}

    async getOne(req, res){
        try {
        const libro = req.body;
        const [result] = await pool.query('SELECT * FROM libros WHERE isbn = ?', [libro.isbn]);
        if (result.length > 0) {
            //devuelve el libro encontrado
            res.json(result[0]);
        } else {
            //devuelve error
            res.status(404).json({"Error": `No se encontró el libro con el ISBN  ${libro.isbn}`});
        }
    } catch (error){
        res.status(500).json({"Error": "Ocurrio un error al consultar el libro"});
    }
}

    async add(req, res){
        try {
            const libro= req.body;
            const [result]= await pool.query(`INSERT INTO Libros(nombre, autor, categoria, añopublicacion, isbn) VALUES (?,?,?,?,?)`, [libro.nombre, libro.autor, libro.categoria, libro.añopublicacion, libro.isbn]);
            res.json ({"ID insertado": resul.insertId, "message": "Libro insertado exitosamente"});
            } catch (error){
                res.status(500).json({ "Error": "Ha ocurrido un error al agregar el libro"});
            }
    }

    async deleteisbn(req, res){
        try {
            const libro= req.body;
            const [result]= await pool.query(`DELETE FROM Libros WHERE isbn= (?)`, [libro.isbn]);
            if (result.affectedRows > 0){
                res.json ({"message": "Libro con isbn ${libro.isbn} eliminado exitosamente"});
                } else {
                    res.status(404).json({"Error": "No se encontró ningun libron con isbn ${libro.isbn}"});
                }
        } catch (error) {
            res.status(500).json({"Error": "Ocurrió un error al querer eliminar el libro"});
        }
    }


export const libro = new LibrosController();
