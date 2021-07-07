import React, {useState, useEffect} from 'react';
import RestaurantDataServices from "../services/restaurant"
import {Link} from "react-router-dom"

const RestaurantsList = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZio] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);

    useEffect(()=>{
        retrieveRestaurants();
        retrieveCuisines();
    }, []);

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const onChangeSearchZip = (e) => {
        const searchZip = e.target.value;
        setSearchZip(searchZip);
    }

    const onChangeSearchCuisine = (e) => {
        const searchCuisine = e.target.value;
        setSearchCuisine(searchCuisine);
    }

    const retrieveRestaurants = () =>{
        RestaurantDataServices.getAll()
        .then(response => {
            console.log(response.data);
            setRestaurants(response.data.restaurants);
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const retrieveCuisines = () => {
        RestaurantDataServices.getCuisines()
        .then((response)=>{
            console.log(response);
            setCuisines(["All Cuisines"].concat(response.data))
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const refreshList = () => {
        retrieveRestaurants
    }

    const find = (query, by) => {
        RestaurantDataServices.find(query, by)
        .then(response=>{
            console.log(response.data);
            setRestaurants(response.data.restaurants);
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const findByName = () => {
        find(searchName, "name")
    };

    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={onChangeSearchName} />
                </div>
                <div className="input-group-append">
                    <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByName}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="input-group col-lg-4">
                <input
                 type="text"
                 className="form-control"
                 placeholder="Search by zip"
                 value={searchZip}
                 onChange={onChangeSearchZip}
                  />
                <div className="input-group-append">
                    <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByZip}
                    >
                    Search
                    </button>
                </div>
            </div>
            <div className="input-group col-lg-4">
                <select
                onChange={onChangeSearchCuisine} 
                >
                    {cuisines.map(cuisine => {
                        return (
                            <option value={cuisine}>{cuisine.substr(0,20)}</option> //substr present to be sure that the searchbox isn't too long
                        )
                    })}
                </select>
                <div className="input-group-append">
                    <button 
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByCuisine}
                    >Search</button>
                </div>
            </div>
            <div className="row">
            //need to finish
        </div>
        </div>

        

    );

};

export default RestaurantsList;