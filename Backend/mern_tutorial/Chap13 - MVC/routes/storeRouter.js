// External Module
const express = require("express");
const storeRouter = express.Router();
// Local Module

const homesController = require("../controllers/storeController");



storeRouter.get("/", homesController.getIndex);  //bas hum function ka reference pass kar rhe hai , jab req aaega tab hoga execute 
storeRouter.get("/homes", homesController.getHomes);
storeRouter.get("/bookings", homesController.getBookings);
storeRouter.get("/favourites", homesController.getFavouriteList);

module.exports = storeRouter;


