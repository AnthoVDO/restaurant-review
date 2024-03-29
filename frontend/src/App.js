import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Login from "./components/login";
import RestaurantsList from "./components/restaurants-list";
import Restaurant from "./components/restaurants";

function App() {

  const [user, setUser] = React.useState(null);

  const login = async (user=null)=>{
    setUser(user);
  }

  const logout = async ()=>{
    setUser(null)
  }


  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar_brand">Restaurant Reviews</a>
        <div className="navbar mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">Restaurants</Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a onClick={logout} className="nav-link" style={{cursor:"pointer"}}>
                Logout {user.name}
              </a>
            ):(
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList}/>
          <Route
          path="/restaurants/:id/review"
          render={(props)=>{ //render allow us to use the props instead of component
            return <AddReview {...props} user={user} />
          }}
          />
          <Route
          path="/restaurants/:id" 
            render={(props)=>{
              return <Restaurant {...props} user={user}/>
            }}
          />
          <Route 
            path="/login"
            render={(props)=>{
            return  <Login {...props} login={login} />
            }}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
