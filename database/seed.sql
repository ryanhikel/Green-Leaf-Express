-- \c plants_db;
DELETE FROM plants;
DELETE FROM regions;
DELETE FROM plant_region;
INSERT INTO regions
    (region_name)
VALUES
    ('North America'),
    ('Central America'),
    ('Europe'),
    ('Mexico'),
    ('Asia');
INSERT INTO plants
    (plant_name, species, tree_img_url, leaf_img_url)
VALUES
    ('Apricot', 'Prunus armeniaca', 'https://c8.alamy.com/comp/EBT1BK/apricot-tree-prunus-armeniaca-goldrich-prunus-armeniaca-goldrich-cultivar-EBT1BK.jpg', 'https://www.pfaf.org/Admin/PlantImages/PrunusArmeniaca2.jpg'),
    ( 'Black Cherry', 'Prunus serotina', 'https://cdn.shopify.com/s/files/1/1008/4432/products/Black_Cherry_2.jpg?v=1525019082', 'https://plants.ces.ncsu.edu/media/images/Prunus-serotina--Leigh-Anne-McConnaughey--CC-BY-SA.jpg'),
    ( 'Common Fig', 'Ficus carica', 'https://flora-toskana.com/6117-tm_large_default/ficus-carica-gruene-feigen-feigenbaeume.jpg', 'https://upload.wikimedia.org/wikipedia/commons/3/34/Ficus_carica_007.JPG'),
    ( 'River Maple', 'Acer saccharinum', 'https://www.vdberk.co.uk/site/assets/files/2369/medium_acer_saccharinum_pyramidalis.jpg', 'https://newfs.s3.amazonaws.com/taxon-images-1000s1000/Sapindaceae/acer-saccharinum-fr-atal.jpg'),
    ( 'European Beech', 'Fagus sylvatica', 'https://selectree.calpoly.edu/images/0500/90/original/fagus-sylvatica-tree-2.jpg' , 'https://eatweeds2-0q5s3hnrbpjqfztuf.netdna-ssl.com/wp-content/uploads/Beech.png')
;
INSERT INTO plant_region
    (plant_id, region_id)
VALUES
    (1, 5),
    (2, 1),
    (2, 2),
    (2, 4),
    (3, 5),
    (4, 1),
    (4, 2),
    (5, 3)
;