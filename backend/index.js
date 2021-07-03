import app from './server.js'; //possible to do it because we previously export the module
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from './dao/reviewsDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI, {
        poolSize: 50, //maximum 50 connect in the same time
        wtimeout: 2500, //request timeout after 2500 millisec
        useNewUrlParser: true //everytime, need to add it because of node and mondodb conflic writting
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})