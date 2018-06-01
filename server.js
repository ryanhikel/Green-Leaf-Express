const express = require("express");
const path = require("path");
const Plant = require("./models/Plant");
const Region = require("./models/Region");
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
app.get("/regions", (request, response) => {
    Region.all().then(regions => {
        console.log(regions[0].region_name);
        response.render("regions/regions", { regions: regions });
    });
});
//find  a way to select the region name that is clicked
//then pass that into Region.allRegionPlants
app.get("/region/:name", (request, response) => {
    const name = request.params.name;
    console.log(name);

    Region.allRegionPlants(name).then(plants => {
        response.render("regions/plants", { plants: plants });
    });
});
app.get("/categories/:id", (request, response) => {
    const category_id = request.params.id;
    Promise.all([
        Quote.allInCategory(category_id),
        Category.find(category_id)
    ]).then(([quotes, category]) => {
        response.render("categories/show", { quotes: quotes, category: category });
    });
});


app.get("/plants/:id", (request, response) => {
    const id = Number(request.params.id);
    Plant.findById(id).then(plant => {
        response.render("plants/show", { plant: plant[0] });
    });
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
