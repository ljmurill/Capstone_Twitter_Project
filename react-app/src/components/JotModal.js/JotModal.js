import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {createJot} from '../../store/post';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function JotModal({user, setShowModal}){
    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            tweet,
            image,
            user_id: user.id,
            username: user.username,
            profile_pic: user.profile_pic
        }

        const result = await dispatch(createJot(newPost))

        if (result){
            setErrors(result)
        }else{
            setTweet('')
            setImage('')
            setErrors([])
            setShowModal(false)
        }

    }

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
      }

    return(
        <>
            <FontAwesomeIcon icon="fa-solid fa-xmark" className='xmarkOnJotModal' onClick={() => setShowModal(false)}/>
            <div className="formProfilePicHomePage">
                <img className='profilePicTopHome' src={user.profile_pic ? user.profile_pic: defaultProfilePic} onError={handleError}/>
                <div className="formAndButtonDiv">
                        <form className="formhomeWithInputsAndErrors">
                            <div className='postErrors'>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                    ))}
                            </div>
                            <div>
                                <input
                                className="inputHomePage"
                                name="tweet"
                                placeholder="What's happening?"
                                onChange={(e)=> setTweet(e.target.value)}
                                value={tweet}
                                ></input>
                            </div>
                            <div>
                                <input
                                name="tweet"
                                className="inputHomePage"
                                placeholder="Image (optional)"
                                onChange={(e)=> setImage(e.target.value)}
                                value={image}
                                ></input>
                            </div>
                        </form>
                        <div className="buttonHomePageDiv">
                            <button type="submit" className="jotButtonOnHomePage" onClick={handleSubmit}>Jot</button>
                        </div>
                </div>
            </div>
        </>

    )
}

export default JotModal;
