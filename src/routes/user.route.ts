import express from "express";
const Router = express.Router()
import controller from '../controllers/user.controller'
// const authMiddleWare = require('../middleware/auth.middleware')

Router.post("/login", controller.login)
Router.get("/:id", controller.getById)
// Router.post('/logout', authMiddleWare, controller.logout)

export default Router