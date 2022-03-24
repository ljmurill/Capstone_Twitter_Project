import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './splashHomeNav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const twitterImage = 'https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png'


function Splash(){

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
    }

    useEffect(() => {
        document.querySelector('body').classList.remove('login')
    },[])
    
    return(
        <div>
            <div className='splashPage'>
            <div className='splashPageImage'>
                <img className='splashPageImage' src={twitterImage} alt='' onError={handleError}/>
            </div>
            <div className='splashRightSide'>
                <h1 className='splashTitle'>Happening Now</h1>
                <h3 className='splashSubTitle'>Join Jotter today.</h3>
                <h3 className='splashSubTitleSecond'>Start Jotting down your thoughts!</h3>


                <Link to='/sign-up' onClick={() => document.querySelector('body').classList.add('login')}><button className='splashSignUpButton'>Sign Up</button></Link>

                <div>
                    <p>Already Have am account?</p>
                    <Link to='/login' onClick={() => document.querySelector('body').classList.add('login')}><button className='splashSignInButton'>Sign In</button></Link>
                </div>
            </div>
            </div>
            <div className='footerAtSplash'>
                <h3>Created By: Leonel Murillo</h3>
                <a href='https://www.linkedin.com/in/leonel-murillo/' className='colorSplashFooter'><FontAwesomeIcon icon="fa-brands fa-linkedin colorSplashFooter" size='2x' /></a>
                <a href='https://github.com/ljmurill/Jotter' className='colorSplashFooter'><FontAwesomeIcon icon="fa-brands fa-github colorSplashFooter" size='2x'/></a>
            </div>
        </div>
    )
}

export default Splash
