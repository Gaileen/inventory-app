// Run once and done (just create/populate a DB).
require("dotenv").config();
const { Client } = require("pg");

//define local / pub DBs LATER************
//using args

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  author VARCHAR ( 255 ),
  genre VARCHAR ( 255 ),
  quantity INTEGER CHECK (quantity >= 0)
);

INSERT INTO books (title, author, genre, quantity)
VALUES
    ('The Fabric of Empire', 'Danielle C. Skeehan', 'history', 1),
    ('Suzuki Cello School Vol. 1', 'Schinichi Suzuki', 'music', 2),
    ('A New Histry of Asian America', 'Shelley Sang-Hee Lee', 'history', 2);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();