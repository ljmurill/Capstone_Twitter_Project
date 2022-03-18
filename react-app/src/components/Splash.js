import React from 'react';
import { Link } from 'react-router-dom';
import './splashHomeNav.css'

const twitterImage = 'https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png'


function Splash(){


    return(
        <div>
            <div className='splashPage'>
            <div className='splashPageImage'>
                <img className='splashPageImage' src={twitterImage} alt=''/>
            </div>
            <div className='splashRightSide'>
                <h1 className='splashTitle'>Happening Now</h1>
                <h3 className='splashSubTitle'>Join Jotter today.</h3>

                <Link to='/sign-up' onClick={() => document.querySelector('body').classList.add('login')}><button className='splashSignUpButton'>Sign Up</button></Link>

                <div>
                    <p>Already Have am account?</p>
                    <Link to='/login' onClick={() => document.querySelector('body').classList.add('login')}><button className='splashSignInButton'>Sign In</button></Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Splash
