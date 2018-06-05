const db = require("../database/connection");

const Region = {};

Region.all = () => {
    return db.any("SELECT * FROM regions");
};
Region.allRegionPlants = region => {
    return db.any("SELECT * FROM plants NATURAL JOIN plant_region NATURAL JOIN regions WHERE region_name = ${region};", {region: region});
};
Region.create = region => {
    return db.one('INSERT INTO regions (region_name) VALUES(${region_name}) RETURNING *', region);
};
module.exports = Region;