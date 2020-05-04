import React from "react";
import fire from "../../firebase/Fire";

export default function SignIn(){
    const [value, setValues] = React.useState({
        email: "",
        password:""
    });
    const [error, setError] = React.useState("");

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = ()=>{
        fire.auth().signInWithEmailAndPassword(value.email, value.password).then(()=>{
            setValues({
                email: "",
                password:""
            });
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
        });
    };

    return(
        <div>
            <h1>Sign in</h1>
            <div className="signin">
                <input onChange={handleChange("email")} placeholder={"Email..."}/>
                <input onChange={handleChange("password")} placeholder={"Password..."} type={"password"}/>
                <button onClick={onSubmit}>Submit</button>
                <p>{error}</p>
            </div>
        </div>
    )
}