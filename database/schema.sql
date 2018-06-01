DROP DATABASE plants_db;
CREATE DATABASE plants_db;
\c plants_db
DROP TABLE IF EXISTS plant_region;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS regions;
CREATE TABLE regions
(
    region_id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL
);
CREATE TABLE plants
(
    plant_id SERIAL PRIMARY KEY,
    plant_name TEXT NOT NULL,
    species TEXT NOT NULL,
    tree_img_url TEXT NOT NULL,
    leaf_img_url TEXT NOT NULL
);
CREATE TABLE plant_region
(
    id SERIAL PRIMARY KEY,
    plant_id INTEGER REFERENCES plants (plant_id),
    region_id INTEGER REFERENCES regions (region_id)
);