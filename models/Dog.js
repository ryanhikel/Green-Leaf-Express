const db = require("../database/connection");

const Dog = {};

Dog.all = () => {
    return db.any("SELECT * FROM dogs");
};

module.exports = Dog;