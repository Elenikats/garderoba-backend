import Cloth from "../models/Cloth.js";
import express from "express";
import User from "../models/User.js";
import createError from "http-errors";

const uploadRouter = express.Router();
// POST: Add an Item/Cloth from FE
uploadRouter.post("/", async (req, res, next) => {

  try {

    // console.log("req payload during upload", req.body);
    // console.log("current user is---",req.body.user);

    const user = await User.findById(req.body.user)
    if(!user){
      return next(createError(404, "User not found"))
    }
    const cloth = await Cloth.create({...req.body, category: req.body.season, type: req.body.type});
    
    user.clothes.push(cloth)
    await user.save()
    res.send(cloth);


  } catch (error) {
    next({
      status: 400,
      message: error.message,
      originalError: error,
    });
  }
});

// GET: Fetch each cloth object with Image Id as a filter
uploadRouter.get("/", async (req, res, next) => {
  try {
    const cloth = await Cloth.findById("62ac68d5f321765b93ec8c02");
    res.send(cloth);
  } catch (error) {
    next({
      status: 401,
      message: error.message,
      originalError: error,
    });
  }
});

export default uploadRouter;
