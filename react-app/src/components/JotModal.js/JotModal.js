import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {createJot} from '../../store/post';

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
    return(
        <div>
        <img className='profilePic' src={user.profile_pic ? user.profile_pic: defaultProfilePic}/>
        <form onSubmit={handleSubmit}>
            <div className='postErrors'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
            </div>
            <div>
                <input
                name="tweet"
                placeholder="What's happening?"
                onChange={(e)=> setTweet(e.target.value)}
                value={tweet}
                ></input>
            </div>
            <div>
                <input
                name="tweet"
                placeholder="Image (optional)"
                onChange={(e)=> setImage(e.target.value)}
                value={image}
                ></input>
            </div>
            <button type="submit">Jot</button>
        </form>
    </div>
    )
}

export default JotModal;
