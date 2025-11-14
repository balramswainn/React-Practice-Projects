// External Module
const express = require('express'); 
const hostRouter = express.Router();

// Local Module

// const {getAddhome} = require('../controllers/homes')
// hostRouter.get("/add-home",getAddhome)+
// or   

const hostController = require("../controllers/hostController");  //variable me store kiya & homes.js me jo export hoga we can access 

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome); //:homeId jo hum url pe dalenge
hostRouter.post("/edit-home", hostController.postEditHome);
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);


module.exports = hostRouter;









