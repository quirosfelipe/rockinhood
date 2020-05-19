const express = require("express");
const path = require("path");

//Create Express app
const app = express();

//Set the pug view engine
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//Define routes
app.get("/", (req, res) => {
    res.render("index", { title: "It's Time to Do Money" });
})





//Define port and start listening for connections
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
