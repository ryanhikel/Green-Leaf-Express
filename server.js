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
    Plant.all().then(plants => {
        response.render("plants/index", { plants: plants });
    });
});
app.post("/plants", (request, response) => {
    const newPlant = request.body;
    newPlant.region_id = Number(newPlant.region_id);
    Plant.create(newPlant)
        .then(plant => {
            newPlant.plant_id = plant.plant_id;
            Plant_region.addRegion(newPlant)
                .then(
                    response.redirect(302, "/plants")
                );
        });
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
        response.render("regions/plants", { plants: plants });
    });
});
app.get("/plants/:id", (request, response) => {
    const id = Number(request.params.id);
    Plant.findById(id).then(plant => {
        response.render("plants/show", { plant: plant[0] });
    });
});
//fix delete in show.ejs
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
    console.log(update);
    

    
    Plant_region.update(update);
    Plant.update(update).then(plant => {
        response.redirect(302, "/plants");
    });
});



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
