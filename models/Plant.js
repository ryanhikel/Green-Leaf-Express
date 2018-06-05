const db = require('../database/connection');

const Plant = {};

Plant.all = () => {
    return db.any('SELECT * FROM plants');
};

Plant.findById = id => {
    return db.any('SELECT * FROM plants WHERE plant_id = ${id}', {id: id});
};

Plant.create = newPlant => {
    return db.one('INSERT INTO plants (plant_name, species, tree_img_url, leaf_img_url) VALUES(${plant_name}, ${species}, ${tree_img_url}, ${leaf_img_url}) RETURNING *', newPlant);
};

Plant.delete = id => {
    return db.result('DELETE FROM plants WHERE plant_id = ${id}', {id: id});
};

Plant.update = newData => {
    return db.none('UPDATE plants SET plant_name = ${plant_name}, species = ${species}, tree_img_url = ${tree_img_url}, leaf_img_url = ${leaf_img_url} WHERE plant_id = ${plant_id}', newData);
};
// find plants by region
// SELECT name FROM plants NATURAL JOIN plant_region NATURAL JOIN regions
// WHERE region_name = 'Asia';
// find regions by plant
// SELECT region_name FROM regions NATURAL JOIN plant_region NATURAL JOIN plants
// WHERE plant_name = 'Apricot';
module.exports = Plant;