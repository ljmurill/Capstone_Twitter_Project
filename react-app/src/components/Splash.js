import React from 'react';
import { Link } from 'react-router-dom';

const twitterImage = 'https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png'


function Splash(){


    return(
        <>
        <div>
            <img src={twitterImage} alt=''/>
        </div>
        <div>
            <h1>Happening Now</h1>
            <h3>Join Jotter today.</h3>

            <Link to='/sign-up'>Sign Up</Link>

            <div>
                <p>Already Have am account?</p>
                <Link to='/login'>Sign In</Link>
            </div>
        </div>
        </>
    )
}

export default Splash
