const db = require('../database/connection');

const Plant = {};

Plant.all = () => {
    return db.any('SELECT * FROM plants');
};
Plant.findById = id => {
    return db.any('SELECT * FROM plants WHERE plant_id = ${id}', {id: id});
};
// find plants by region
// SELECT name FROM plants NATURAL JOIN plant_region NATURAL JOIN regions
// WHERE region_name = 'Asia';
// find regions by plant
// SELECT region_name FROM regions NATURAL JOIN plant_region NATURAL JOIN plants
// WHERE plant_name = 'Apricot';
module.exports = Plant;