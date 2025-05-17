import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // Serves static files from the public directory
    app.set("view engine", "ejs"); // Sets EJS as the templating engine
    app.set("views", "./src/views"); // Defines the directory for view templates
}

module.exports = configViewEngine;