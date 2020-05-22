const express = require("express");
const path = require("path");

// const { name, symbol, description, ceo, employees, headquarters, founded, marketCap, priceEarningRatio, dividendYield, averageVolume } = require("/public/js/company.js");

//Create Express app
const app = express();

//Set the pug view engine
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//Define routes
app.get("/", (req, res) => {
    res.render("index", { title: "It's Time to Do Money" });
})

//Implement this to the root path with authentication
app.get("/login", (req, res) => {
    res.render("login", { title: "Log In" });
})

app.get("/signup", (req, res) => {
    res.render("signup", { title: "Signup" });
})

app.get("/portfolio", (req, res) => {
    res.render("portfolio", { title: "Portfolio" });
})

app.get("/stocks/:id", (req, res) => {
    // const companyInfo = [name, symbol, description, ceo, employees, headquarters, founded, marketCap, priceEarningRatio, dividendYield, averageVolume];
    res.render("company", { title: "company name" });
})





//Define port and start listening for connections
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
