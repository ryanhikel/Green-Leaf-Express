CREATE DATABASE dogstagram;

\c dogstagram

DROP TABLE IF EXISTS dogs;

CREATE TABLE dogs
(
    id SERIAL PRIMARY KEY,
    breed TEXT,
    name TEXT
);
