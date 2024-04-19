const sql = require('mssql')

const { SQL_CONNECTION_STRING } = require("../config")

async function addCoordinates(array) {
    if (!array || !array.length) return;
    const mappedValues = mapValues(array);
    const sqlQuery = `INSERT INTO autok_gps([rendszam],[dir],[eng],[long],[lat],[speed],[angle]) VALUES ${mappedValues}`;

    const conn = await sql.connect(SQL_CONNECTION_STRING)
    await conn.query(sqlQuery)
    conn.close();
}

function mapValues(array) {
    return array.map(o => `('${o.rendszam}', ${o.dir ? 1 : 0}, ${o.eng ? 1 : 0}, ${o.long.toFixed(5)}, ${o.lat.toFixed(5)}, ${o.speed}, ${o.speed})`).join(',')
}

module.exports = { addCoordinates }