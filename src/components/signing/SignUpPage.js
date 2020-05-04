import React from "react";
import fire from "../../firebase/Fire";
import {useDispatch} from "react-redux";
import {checkChange} from "../../redux/actions/setActions";

export default function SignUpPage(){
    const [value, setValues] = React.useState({
        email: "",
        password:"",
        passConf:"",
        name:""
    });
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = ()=>{
        if(value.password !== value.passConf){
            setError("Passwords do not match")
        } else {
            setError("");
            fire.auth().createUserWithEmailAndPassword(value.email, value.password).then(()=>{
                let user = fire.auth().currentUser;
                user.updateProfile({
                    displayName: value.name
                }).then(function() {
                    setValues({
                        email: "",
                        password:"",
                        name:""
                    });
                    dispatch(checkChange());
                }).catch(function(error) {
                    // An error happened.
                });
            }).catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // ...
            });
        }
    };

    return(
        <div>
            <h1>Create an Account</h1>
            <div className={"signup"}>
                <input onChange={handleChange("name")} placeholder={"Name..."}/>
                <input onChange={handleChange("email")} placeholder={"Email..."}/>
                <input onChange={handleChange("password")} placeholder={"Password..."} type={"password"}/>
                <input onChange={handleChange("passConf")} placeholder={"Confirm Password..."} type={"password"}/>
                <button onClick={onSubmit}>Submit</button>
                <p>{error}</p>
            </div>
        </div>
    )
}