const db = require('../database/connection');

const Plant_region = {};

Plant_region.addRegion = plantRegion => {
    return db.one('INSERT INTO plant_region(plant_id, region_id) VALUES (${plant_id}, ${region_id}) RETURNING *', plantRegion);
};
Plant_region.delete = id => {
    return db.result("DELETE FROM plant_region WHERE plant_id = ${id}", id);
}
// find plants by region
// SELECT name FROM plants NATURAL JOIN plant_region NATURAL JOIN regions
// WHERE region_name = 'Asia';
// find regions by plant
// SELECT region_name FROM regions NATURAL JOIN plant_region NATURAL JOIN plants
// WHERE plant_name = 'Apricot';
module.exports = Plant_region;