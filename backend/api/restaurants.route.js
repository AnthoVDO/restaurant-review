import express from "express";
import RestaurantsController from "./restaurants.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router(); //because this is a route file. it will redirect people.

// router.route('/').get((req, res) => {
//     res.send("hello world")
// })

router.route("/").get(RestaurantsController.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantCuisines);

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)


export default router;