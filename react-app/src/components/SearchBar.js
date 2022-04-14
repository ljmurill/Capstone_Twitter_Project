import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";


const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';
function SearchBar(){
    const [users, setUsers] = useState([])
    const [results, setResults] = useState(false)
    const [noResults, setNoResults] = useState(false)
    const [initialDisplay, setInitial] = useState(false)
    const [word, setWord] = useState('')
    let count = 0;
    useEffect(() => {
        if (count > 0){
            setInitial(false)
        }
    }, [count])

    const handleChange = async(searchWord) => {
        count += 1
        setWord(searchWord)
        if(searchWord.length > 0){
            setInitial(false)
            setResults(true)
            const response = await fetch(`/api/users/${searchWord}`);
            const responseData = await response.json();
            if (responseData.users.length === 0){
                setInitial(false)
                setNoResults(true)
            }
            setUsers(responseData.users);

        }else {
            setNoResults(false)
            setResults(false)
            setUsers([])

        }

    }

    const handleClick = (e) => {

        if (e.detail % 2 === 0){
            setInitial(false)
        }else {
            setInitial(true)
        }
    }

    // const changeColor =(e) => {
    //     document.querySelector('.searchBarDiv').classList.add('colorChange')
    // }


    return (
        <div className="searchBar">
        <form>
            <label className="searchBarDiv" onClick={handleClick} >
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" color="gray"/>
            <input
            className="searchBarInput"
            type="text"
            placeholder={"Search for Users..."}
            onChange={(e) => {
                handleChange(e.target.value)}}
            value = {word}
            ></input>
            {word && <FontAwesomeIcon icon="fa-solid fa-circle-xmark" color="gray" onClick={() => {
                setResults(false)
                setNoResults(false)
                setWord('')}}/>}
            </label>

        </form>
        {results && users.length > 0 &&
                <div className="searchResults">
                {users && users.map((user, i) => (
                    <Link className='linkSearchBar' key={i} to={`/users/${user.id}`}>
                     <div className='usersOnSearchBar'>
                         <img className='searchbarImage' src={user.profile_pic ? user.profile_pic : defaultProfilePic} alt=''/>
                         <div className="usernamesTogether">
                            <p className="usernameSearchBar">{user.username}</p>
                            <p className="atUsernameSearchBar">@{user.username}</p>

                         </div>
                    </div>
                    </Link>
                )
                )}
                </div>
        }
        {noResults && users.length === 0 && <div className="searchResults">
            <p className="searchBarText">No users found with this username. Please try another name!</p>
            </div>}

        {initialDisplay && !results && !noResults && <div className="searchResults">
            <p className="searchBarText">Search user by username!</p>
            </div>}

        </div>

    )
}


export default SearchBar;
