console.log('SOY server');
const server = require("./src/app.js");
const express = require("express");
const { conn } = require("./src/db.js");
const morgan = require("morgan");
const { DB_PORT } = process.env;

const { preload_players } = require("./src/utils/utilsPlayers.js");
const { preload_teams } = require("./src/utils/utilsTeams.js");
const { preload_tournaments } = require("./src/utils/utilsTournaments.js");

const app = express();

app.use(morgan("dev"));

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(DB_PORT, () => {
    console.log("entrando al index pero bien adentro culia");
    preload_tournaments();
    preload_players();
    preload_teams();
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
