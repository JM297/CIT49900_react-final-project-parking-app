import React from 'react';
import {Link} from "react-router-dom";
import fire from "../../firebase/Fire";
import {useSelector} from 'react-redux'

export default function Nav(){
    const signedIn=useSelector(state=>state.signedIn);
    const signOut = () =>{
        fire.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    };
    return(
        <div className="nav">
            {!signedIn?<Link style={{marginRight: 10}} to={"/signup"}>Register</Link>:""}
            {!signedIn?<Link style={{marginRight: 10}} to={"/signin"}>Sign In</Link>:""}
            {signedIn?<Link to={"/signin"} onClick={signOut}>Sign Out</Link>:""}
        </div>
    )
}