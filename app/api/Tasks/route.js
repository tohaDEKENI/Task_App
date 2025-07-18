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

export async function POST(req) {
  try {
    const { title, description, due_date, heure_debut, heure_fin } = await req.json();
    const { userId } = await auth();

    if (!userId) {
      return new Response('Utilisateur non authentifié', { status: 401 });
    }

    const [result] = await pool.execute(
      `INSERT INTO tasks (user_id, title, description, is_done, due_date, heure_debut, heure_fin)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, title, description, false, due_date, heure_debut, heure_fin]
    );

    return new Response('Tâche ajoutée avec succès', { status: 201 });

  } catch (err) {
    console.error('Erreur POST /api/tasks:', err);
    return new Response('Erreur serveur', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const {userId} = await auth()
    const [rows] = await pool.execute("SELECT * FROM tasks WHERE user_id = ?",[userId]);
    return new Response(JSON.stringify(rows), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Erreur GET /api/tasks:', err);
    return new Response('Erreur serveur', { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
