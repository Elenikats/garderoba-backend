import express from "express";

const googleSigninRouter = express.Router();

googleSigninRouter.get("/", (req, res) => {
  const expoClientId = process.env.EXPO_CLIENT_ID;
  res.send(expoClientId);
});

export default googleSigninRouter;