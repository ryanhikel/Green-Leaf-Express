const express = require("express");
const path = require("path");
const Plant = require("./models/Plant");
const Region = require("./models/Region");
const Plant_region = require("./models/Plant_region");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

// Allow override of HTTP methods based on the query string ?_method=DELETE
app.use(methodOverride("_method"));

// Add the HTTP body onto the request object in all route handlers.
app.use(bodyParser.urlencoded({ extended: false }));

// Allow the port to be set by an environment variable when run (PORT=4000 node server.js)
// and fallback to a default to 4567 if it's not supplied.
const PORT = process.env.PORT || 4567;

// Serve any files in the public folder at the "/public" route.
app.use("/public", express.static("public"));

// Set the folder for where our views are.
app.set("views", path.join(__dirname, "views"));

// Tell Express that we use EJS in our views.
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("landing");
});

app.get("/plants", (request, response) => {
    Region.all().then(regions => {
        Plant.all().then(plants => {
            response.render("plants/index", { plants: plants, regions: regions });
        });
    });
});
app.post("/plants", (request, response) => {
    const newItem = request.body;
    if (!newItem.region_id) {
        Region.create(newItem).then(
            response.redirect(302, "/plants")
        );
    }else{
    newItem.region_id = Number(newItem.region_id);
    Plant.create(newItem)
        .then(plant => {
            newItem.plant_id = plant.plant_id;
            Plant_region.addRegion(newItem)
                .then(
                    response.redirect(302, "/plants")
                );
        });
    }
});

app.get("/regions", (request, response) => {
    Region.all().then(regions => {
        response.render("regions/regions", { regions: regions });
    });
});
//find  a way to select the region name that is clicked
//then pass that into Region.allRegionPlants
app.get("/region/:name", (request, response) => {
    const name = request.params.name;
    Region.allRegionPlants(name).then(plants => {
        if (!plants[0]) {
            response.send('No plants in this region');
        }else{
        response.render("regions/plants", { plants: plants });
        }
    });
});

app.get("/plants/:id", (request, response) => {
    const id = Number(request.params.id);
    Region.all().then(regions => {
        Plant.findById(id).then(plant => {
            response.render("plants/show", { plant: plant[0], regions: regions });
        });
    });
    
});

app.delete("/plants/:id", (request, response) => {
    const id = Number(request.params.id);
    Plant_region.delete(id);
    Plant.delete(id).then(plant => {
        response.redirect(302, "/plants");
    });
});
app.put("/plants/:id", (request, response) => {
    const update = request.body;
    update.plant_id = Number(request.params.id);
    update.region_id = Number(update.region_id);
    Plant_region.update(update);
    Plant.update(update).then(plant => {
        response.redirect(302, "/plants");
    });
});



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
