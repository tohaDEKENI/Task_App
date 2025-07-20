import mysql from 'mysql2/promise';
import { auth } from '@clerk/nextjs/server';
import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
    host: process.env.HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export async function PUT(req, { params }) {
    const id = params.id;

    try {
        // 1. On récupère la valeur actuelle de is_done
        const [rows] = await pool.execute("SELECT is_done FROM tasks WHERE id = ?", [id]);

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: "Tâche non trouvée" }), { status: 404 });
        }

        const currentValue = rows[0].is_done;

        // 2. On inverse la valeur
        const newValue = !currentValue;

        // 3. On met à jour la base de données
        await pool.execute("UPDATE tasks SET is_done = ? WHERE id = ?", [newValue, id]);

        return new Response(JSON.stringify({ message: "Tâche mise à jour", is_done: newValue }), {
            status: 200,
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }
}
