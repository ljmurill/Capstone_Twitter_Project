import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from "../SearchBar";
import NavBar from "../NavBar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Following(){
    const [user, setUser] = useState({});
    const history = useHistory()
    const {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            return;
          }
        (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);

        })();
    },[userId])

    if (!user) {
        return null;
    }


    return(
        <div className="homeFeedLayout">
            <NavBar />
            <div className="border">
            <div className='arrowAndHeader'>
            <div className='arrowHoverAffect'><FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={() => history.goBack()}/></div>
            <div>
                <h2 className='userNameProfilePage'>{user.username}</h2>
                <div className='numberOfJotsProfilePage'>@{user.username}</div>
            </div>
            </div>
            </div>
            <SearchBar/>
        </div>
    )
}

export default Following;
