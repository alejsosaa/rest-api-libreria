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
        const id= req.body.id;
        const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (result.length > 0) {
            //devuelve el libro encontrado
            res.json(result[0]);
        } else {
            //devuelve error
            res.status(404).json({"Error": `No se encontró el libro con id ${id}`});
        }
    }
}

export const libro = new LibrosController();
