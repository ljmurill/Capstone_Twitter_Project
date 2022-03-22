import React, {useState, useEffect} from "react";
import EditModalSetUp from "../EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "../EditDeleteModal/DeleteModalSetup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Ellipsis({ post }){
    const [menu, setMenu] = useState('');

    const handleMenu = () => {
        setMenu(true)
    }


    useEffect(() => {
        if (!menu) return;

        const closeMenu = () => {

          setMenu(false);
        };



        // document.querySelector('.borderTopPost').addEventListener('click', closeMenu);

        // return () => document.querySelector('.borderTopPost').removeEventListener("click", closeMenu);
    }, [menu]);


    // const openMenu =() => {
    //     if(menu) return;
    //     ellipsis.classList.add('ellipsisHide')
    //     setMenu(true);
    // };


    return (
        <>
            <div className="zIndexDropDownMenu">

                {menu ? (
                        <div className="editDeleteDropDown">
                            <EditModalSetUp post={post}/>
                            <DeleteModalSetUp post={post}/>
                        </div>
                ): <FontAwesomeIcon icon="fa-solid fa-ellipsis" className="ellipsisColor" onClick={handleMenu}/>}

            </div>
        </>
    )
}

export default Ellipsis;
