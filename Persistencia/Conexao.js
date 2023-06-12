import mysql from 'mysql2/promise';
export default async function Conexao() {
    if (global.conectar && global.conectar.status != "disconnected") {
        return global.conectar;
    }
    const conectar = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "backend"
    });
    global.conectar = conectar;
    return conectar;
}