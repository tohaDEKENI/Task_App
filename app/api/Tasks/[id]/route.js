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