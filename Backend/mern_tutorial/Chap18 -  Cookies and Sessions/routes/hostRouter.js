// External Module
const express = require('express'); 
const hostRouter = express.Router();

// Local Module

const hostController = require("../controllers/hostController");  //variable me store kiya & homes.js me jo export hoga we can access 

hostRouter.get("/add-home", hostController.getAddHome);  //jo form page(Add home) pe leke jaega 
hostRouter.post("/add-home", hostController.postAddHome); //jo form data leke jaega & ye bas redirect hoga 

hostRouter.get("/host-home-list", hostController.getHostHomes); //jo (host home page) pe leke jaega 

//jo host home -> me edit karne k page pe leke jaega
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);  //:homeId jo hum url pe dalenge/edit pe click karte hi woh id chahiye
hostRouter.post("/edit-home", hostController.postEditHome); //jo form data leke jaega & ye bas redirect hoga 
// page toh ek hi hai routes kese badle ki jab add-home pe ho tab kese data bhejna hai and if edit-home pe ho tab kese so edit-home.ejs pe form post req pe action="/host/<%= editing ? "edit-home" : "add-home"%>" ye diya editing true kab hoga jab edit pe click karenge and submit karte time edit-home pe jaega post req
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);


module.exports = hostRouter;

// pages :->  Add Home -> edit-home.ejs  | post-redirect -> host-home-list.ejs
//           Host Home -> host-home-list.ejs     edit -> edit-home.ejs  | post-redirect -> host-home-list.ejs
//            delete -> post-redirect -> host-home-list.ejs






