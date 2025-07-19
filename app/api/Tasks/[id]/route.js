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

export async function DELETE(req,{params}) {
    try{
        const id = params.id;
        await pool.execute("DELETE FROM tasks WHERE id = ?",[id])

        return new Response(
            JSON.stringify({message:"Tache supprimer avec succes"})
        )

    }catch(err){
        JSON.stringify({message:"Erreur cote serveur"})
    }
}

export async function GET(req,{params}) {
    const id = params.id

    const [data] = await pool.execute("SELECT * FROM tasks WHERE id = ?",[id]);

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
}


export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const body = await req.json(); // on récupère les données du formulaire

    const { title, description, due_date, heure_debut, heure_fin } = body;

    await pool.execute(
      `UPDATE tasks 
       SET title = ?, description = ?, due_date = ?, heure_debut = ?, heure_fin = ? 
       WHERE id = ?`,
      [title, description, due_date, heure_debut, heure_fin, id]
    );

    return new Response(JSON.stringify({ message: "Tâche mise à jour avec succès" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}