import User from "../models/user.model";
import express from "express";
// const auth = require("../middleware/auth.middleware")

export default {
  login: async (req: express.Request, res: express.Response) => {
    const reqData = {
      requestId: req.body.requestId,
      requestTime: req.body.requestTime,
    };
    try {
      const username = req.body.data.username;
      const password = req.body.data.password;
      const user = await User.findByCredentials(username, password);
      if (!user) {
        return res.status(401).json({
          code: "00009",
          message: "Login failed! Check authentication credentials",
          request: reqData,
        });
      }

      const token = await user.generateAuthToken();

      res.status(200).json({
        code: "00000",
        message: "success",
        request: reqData,
        data: { token },
      });
    } catch (error) {
      res.status(200).json({
        code: "00099",
        message: error.message,
        request: reqData,
      });
    }
  },
  getById: async (req: express.Request, res: express.Response) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.json(user);
    } catch (error) {
      res.send({ error: true });
    }
  },
};
