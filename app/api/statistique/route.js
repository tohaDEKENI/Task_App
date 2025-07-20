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

export async function GET(req) {
    const { userId } = await auth();
    const [allCount] = await pool.execute("SELECT COUNT(*) as allTasks FROM tasks WHERE user_id = ?", [userId])
    const [doneTasks] = await pool.execute("SELECT COUNT(*) as doneTasks FROM tasks WHERE is_done = ? AND  user_id = ?", [true, userId]);
    const [UnfinishTask] = await pool.execute("SELECT COUNT(*) as unfinish FROM tasks WHERE is_done = ? AND user_id = ?", [false, userId]);
    const total = allCount[0].allTasks;
    const done = doneTasks[0].doneTasks;
    const pourcentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return new Response(
        JSON.stringify({ allCount, doneTasks, UnfinishTask, pourcentage})
    )
}