import { Router } from "express";
import { getRestaurants, getResturant, getRestaurantsByName, createRestaurant, deleteRestaurant, updateRestaurant } from "../controllers/restaurantController.js";

const router = Router()

router.get("/", getRestaurants)
router.get("/:id", getResturant)
router.get("/restaurantgroup/:name", getRestaurantsByName)
router.post("/createRestaurant", createRestaurant)
router.delete("/deleteRestaurant/:id", deleteRestaurant)
router.put("/updateRestaurant/:id", updateRestaurant)

export default router