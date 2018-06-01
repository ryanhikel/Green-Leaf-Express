const db = require("../database/connection");

const Region = {};

Region.all = () => {
    return db.any("SELECT * FROM regions");
};

module.exports = Region;