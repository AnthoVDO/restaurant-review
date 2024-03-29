import http from "../http-common";

class RestaurantDataServices {
    getAll(page = 0){
        return http.get(`?page=${page}`)
    }

    get(id){
        return http.get(`/id/${id}`)
    }

    find(query, by="name", page=0){
        return http.get(`?${by}=${query}&page=${page}`)
    }

    createReview(data){
        return http.post('/review', data);
    }

    updateReview(data){
        return http.put('/review', data);
    }

    deleteReview(id, userId){
        console.log("id: "+id);
        console.log("user_id :"+userId);
        console.log(`/review?id=${id}`, {data:{user_id: userId}})
        return http.delete(`/review?id=${id}`, {data:{user_id: userId}})
    }

    getCuisines(id){
        return http.get(`/cuisines`);
    }


}

export default new RestaurantDataServices();