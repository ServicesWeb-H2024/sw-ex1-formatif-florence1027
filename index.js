const express = require ('express');
const http = require('node:http');
const url = require('url');
var fs = require('fs')
var path = require('path')
const dotenv = require('dotenv');

dotenv.config();
const hostname = process.env.MYSQL_HOST;
const port = process.env.PORT;
// Créer une application express
const app = express();
app.use(express.json());

app.use('/api/titres/', require('./src/routes/titre.route.js'));

const sql = require("./src/config/db.js");

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});