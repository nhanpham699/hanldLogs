import { Router } from "express";
const router = Router()
import controller from '../controllers/product.controller'
// const authMiddleWare = require('../middleware/auth.middleware')

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/create", controller.create)
router.delete("/delete", controller.delete)
router.post("/update", controller.update)

// Router.post('/logout', authMiddleWare, controller.logout)

export default router