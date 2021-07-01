import express from "express";
import RestaurantsController from "./restaurants.controller.js"

const router = express.Router(); //because this is a route file. it will redirect people.

// router.route('/').get((req, res) => {
//     res.send("hello world")
// })

router.route("/").get(RestaurantsController.apiGetRestaurants);

export default router;