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
    const {userId} = await auth()
    const [data] = await pool.execute("SELECT * FROM tasks WHERE is_done = ? AND user_id = ?",[true,userId])
    console.log(data)
    return new Response(
        JSON.stringify(data)
    )
    
}