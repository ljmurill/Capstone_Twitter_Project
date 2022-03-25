import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {createJot} from '../../store/post';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function JotModal({user, setShowModal}){
    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(null);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tweet', tweet)
        formData.append('image', image)
        formData.append('user_id', user.id)
        formData.append('username', user.username)

        setImageLoading(true);
        // const newPost = {
        //     tweet,
        //     image,
        //     user_id: user.id,
        //     username: user.username,
        //     profile_pic: user.profile_pic
        // }

        const result = await dispatch(createJot(formData))

        if (result){
            setErrors(result)
            setImageLoading(false)
        }else{
            setImageLoading(false)
            setImagePreview(null)
            setTweet('')
            setImage(null)
            setErrors([])
            setShowModal(false)
        }

    }

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
      }

    const updateImage = (e) => {
        if (e.target.files && e.target.files.length > 0){
            const reader = new FileReader();
            const file = e.target.files[0];
            setImage(file);
            reader.readAsDataURL(file)
            reader.addEventListener('load', () => {
                setImagePreview(reader.result)
            })
            reader.close()
        }
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
                                id='modalChooseFileInput'
                                type="file"
                                accept="image/*"
                                name="tweet"
                                // className="inputHomePage"
                                // placeholder="Image Url (optional)"
                                onChange={updateImage}
                                hidden='hidden'
                                ></input>
                                {imagePreview &&
                                <>
                                    <div className="xOnImagePreview" onClick={() => {
                                        setImage(null)
                                        setImagePreview(null)
                                    }}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                    </div>
                                    <img className='imagePreview' src={imagePreview}/>
                                </>}

                            </div>
                        </form>
                        <div className="buttonHomePageDiv">
                            <label htmlFor='modalChooseFileInput'><FontAwesomeIcon className="colorOfImageIcon" icon="fa-solid fa-image"/></label>
                            <button type="submit" className="jotButtonOnHomePage" onClick={handleSubmit}>Jot</button>
                        </div>
                </div>
            </div>
        </>

    )
}

export default JotModal;
