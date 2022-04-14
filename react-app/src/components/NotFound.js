import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
function NotFound() {
    return(
        <div className="ErrorPage">
        <NavBar/>
        <div className="border middlePage">
            <h1>Sorry Page Not Found...</h1>
            <img className='image404' src={`https://media.istockphoto.com/photos/one-white-broken-egg-shell-on-blue-background-picture-id1187289016?k=20&m=1187289016&s=612x612&w=0&h=7j-H_o_ubFXkUA7h-vqVX0jprTahjdl2QFtrpcINYPA=`}/>
        </div>
        <SearchBar/>
        </div>
    )
}

export default NotFound;
