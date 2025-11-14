import React,{useContext} from 'react'
import UserContext from '../context/UserContext';

function Profile(){

    const {user} =useContext(UserContext);
    if(!user) return <div>put proper info</div>
    return(
        <div>
        welcome : {user.username}
        </div>
    )
}

export default Profile;