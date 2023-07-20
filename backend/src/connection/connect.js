const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
    database: "users",
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "Amonov2004",
});

async function fetch(query, ...params) {
    try {
        console.log(query, params);
        const client = await pool.connect();
        const {
            rows: [data],
        } = await client.query(query, params);
        return data;
    } catch (error) {
        return error.message;
    }
}

async function fetchAll(query, ...params) {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(query, params);
        return rows;
    } catch (error) {
        return error.message;
    }
}

module.exports = { fetch, fetchAll };
