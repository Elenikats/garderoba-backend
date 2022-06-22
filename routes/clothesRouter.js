import express from "express";
import Cloth from "../models/Cloth.js";
import weatherApiRouter from "./weatherApiRouter.js";

const clothesRouter = express.Router();


  clothesRouter.get("/closet", async (req, res, next) => {
    // example endpoint to connect to this from the front end looks like this
    // http://localhost:9000/cloth/closet?color[]=%231C86EE
    

    try {
    
    let query = Cloth.find(req.query)
    // query.populate("type", )

    if(req.query.color ){
       query =  Cloth.find({color: req.query.color})

    }
    const cloths = await query.exec()
    res.send(cloths)

  } catch (error) {
    next({
      status: 401,
      message: error.message,
      originalError: error,
    });
  }
});

clothesRouter.get("/favorite", async (req, res, next) => {
  // this is supposed to find all the favorite clothes of a user.
  try {
    const clothes = await Cloth.find({ type: "favorite" }); //we are sending all clothes from this
    res.send(clothes);
  } catch (error) {
    next({
      status: 401,
      message: error.message,
      originalError: error,
    });
  }
});
clothesRouter.get("/home", async (req, res, next) => {
  // this is supposed to find all the top-clothes and bottom-clothes as per the weather.
  // TBC note: weather details to be added in payload. 

  try {
    const clothesTopBox = await Cloth.find({ type: "top" }); //we are sending all clothes from this
    const clothesBottomBox = await Cloth.find({ type: "bottom" }); //we are sending all clothes from this
    const favorites = await Cloth.find({favorite:true})
    
    clothesTopBox.reverse();
    clothesBottomBox.reverse();
    res.send({ clothesTopBox, clothesBottomBox, favorites });
  } catch (error) {
    next({
      status: 401,
      message: error.message,
      originalError: error,
    });
  }
});

clothesRouter.put("/:id", async (req, res, next) => {
// the put request to change the cloth from favorite to !favorite
  console.log("req here:", req.body);
  try {
    const id = req.params.id;
    console.log("id", id);
    const cloth = await Cloth.findById(id);
    cloth.favorite = req.body.favorite
    cloth.save();
    
    res.send(cloth);
    if (!cloth) {
      return next({ status: 404, message: "not found"});
    }
  
  } catch (error) {
    next({ status: 400, message: error.message});
  }
});



export default clothesRouter;
