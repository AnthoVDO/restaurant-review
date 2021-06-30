let restaurants // used to store a reference to the database

export default class RestaurantsDAO {
    static async injectDB(conn) { // this is how we initially connect to the database as soon as the server start
        if (restaurants) { return } // if already ok, it return
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`
            )
        }

    }

    static async getRestaurants({
        filters = null, //initial filter
        page = 0, //starting at page zero
        restaurantsPerPage = 20, //20 result per page
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) { query = { $text: { $search: filters["name"] } } } else if ("cuisine" in filters) { query = { "cuisine": { $eq: filters["cuisine"] } } } else if ("zipcode" in filters) { query = { "address.zipcode": { $eq: filters["zipcode"] } } }
        }

        // $text used in mongodb app less
        // $eq === equal 
        //for more info about query with mongodb https://docs.mongodb.com/manual/reference/operator/

        let cursor

        try {
            cursor = await restaurants.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents; ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

}