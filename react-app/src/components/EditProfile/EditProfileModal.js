import React, {useState} from "react";
import './editProfile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/session";


const defaultBackground = 'https://camo.mybb.com/f47a68f9fd1d3f39f1aa9790fe74520f256d2142/687474703a2f2f692e696d6775722e636f6d2f64485850582e706e67'
const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function EditProfileModal({user, setShowModal, setUser}){
    const [background_image, setBackgroundImage] = useState(user.background_image ? user.background_image : defaultBackground);
    const [profile_pic, setProfilePic] = useState(user.profile_pic ? user.profile_pic : defaultProfilePic)
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleUpdate = async(e) => {
        e.preventDefault()
        const formData = new FormData;

        formData.append('background_image', background_image);
        formData.append('profile_pic', profile_pic);

        const result = await dispatch(updateProfile(user.id, formData))

        if (result){
            setErrors(result)
        }else{
            setProfilePicPreview(null)
            setBackgroundPreview(null)
            setErrors([])
            setProfilePic(null)
            setBackgroundImage(null)

            const response = await fetch(`/api/users/${user.id}`);
            const person = await response.json();
            setUser(person)


            setShowModal(false)
        }

    }

    const updateBackground = (e) => {
        if (e.target.files && e.target.files.length > 0){
            const reader = new FileReader();
            const file = e.target.files[0];
            setBackgroundImage(file);
            reader.readAsDataURL(file)
            reader.addEventListener('load', () => {
                setBackgroundPreview(reader.result)
            })
            setDisabled(false)
        }
    }
    const updateProfilePic = (e) => {
        if (e.target.files && e.target.files.length > 0){
            const reader = new FileReader();
            const file = e.target.files[0];
            setProfilePic(file);
            reader.readAsDataURL(file)
            reader.addEventListener('load', () => {
                setProfilePicPreview(reader.result)
            })
            setDisabled(false)
        }
    }


    return(
        <div>
            <div className="headerForEditProfile">
                <h3>Edit Profile</h3>
                <button className='StyleFollowButtonOnProfilePage' onClick={handleUpdate} disabled={disabled}>Save</button>
            </div>
            <form>
                <div className='postErrors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <input
                    id='ProfilePicInput'
                    type="file"
                    accept="image/*"
                    name="profile_pic"
                    onChange={updateProfilePic}
                    hidden='hidden'>
                </input>
                <input
                    id='BackgroundImageInput'
                    type="file"
                    accept="image/*"
                    name="background_image"
                    onChange={updateBackground}
                    hidden='hidden'>
                </input>
            </form>
            <div className="parentEditProfile">
                <img className='backgroundImageEditProfile' src={backgroundPreview ? backgroundPreview : background_image}/>
                <img className='profilePicEditProfile' src={profilePicPreview ? profilePicPreview : profile_pic}/>
                <div className="XBackgroundImagePreview" onClick={() => {
                    setBackgroundPreview(null)
                    setBackgroundImage(defaultBackground)
                    setDisabled(false)
                }}> <FontAwesomeIcon icon="fa-solid fa-xmark" /></div>
                <label htmlFor='BackgroundImageInput' className="BackgroundImagePreview"><FontAwesomeIcon className="colorOfImageIconEditProfile" icon="fa-solid fa-camera"/></label>
                <div className="XProfilePicturePreview" onClick={() => {
                    setProfilePicPreview(null)
                    setProfilePic(defaultProfilePic)
                    setDisabled(false)
                }}> <FontAwesomeIcon icon="fa-solid fa-xmark" /></div>
                <label htmlFor='ProfilePicInput' className="ProfilePicturePreview"><FontAwesomeIcon className="colorOfImageIconEditProfile" icon="fa-solid fa-camera"/></label>
            </div>
        </div>
    )
}

export default EditProfileModal;
