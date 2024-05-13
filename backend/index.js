const pg = require("pg");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const port = 3000;

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: "db",
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
    connectionTimeoutMillis: 5000,
});

let whitelist = ["http://127.0.0.1:8080", "http://localhost:8080"];
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS."));
        }
    },
};

console.log("Connecting...:");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get(
    "/authenticate/:username/:password",
    cors(corsOptions),
    async (request, response) => {
        const username = request.params.username;
        const password = request.params.password;

        const query = {
            text: "SELECT * FROM users WHERE user_name = $1 and password = $2",
            values: [username, password],
        };

        console.log(query);
        pool.query(query, (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    }
);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
