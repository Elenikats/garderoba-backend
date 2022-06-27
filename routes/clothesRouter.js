import express from "express";
import Cloth from "../models/Cloth.js";
import weatherApiRouter from "./weatherApiRouter.js";

const clothesRouter = express.Router();


// search endpoint
clothesRouter.get("/closet", async (req, res, next) => {
  // this is supposed to find all the clothes of a user.
  try {
    if (Object.keys(req.query).length === 0) {
      const clothes = await Cloth.find(); //we are sending all clothes from this

      res.send(clothes);
    } else {
      const clothes = await Cloth.find(req.query);
      res.send(clothes);
    }
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
    const favorites = await Cloth.find({ favorite: true });

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
  console.log("req here:", req.body);
  try {
    const id = req.params.id;
    console.log("id", id);
    const cloth = await Cloth.findById(id);
    cloth.favorite = req.body.favorite;
    cloth.save();

    res.send(cloth);
    if (!cloth) {
      return next({ status: 404, message: "not found" });
    }
  } catch (error) {
    next({ status: 400, message: error.message });
  }
});



export default clothesRouter;
