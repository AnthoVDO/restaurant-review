import express from "express";

const router = express.Router(); //because this is a route file. it will redirect people.

router.route('/').get((req, res) => {
    res.send("hello world")
})

export default router;