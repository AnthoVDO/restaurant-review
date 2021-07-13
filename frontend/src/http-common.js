import axios from 'axios'
const url = "https://back-end-restaurant-review.herokuapp.com/api/v1/restaurants" || "http://localhost:8080/api/v1/restaurants"

export default axios.create({
    baseURL:url,
    Headers:{
        "Content-type": "application/json"
    }
})