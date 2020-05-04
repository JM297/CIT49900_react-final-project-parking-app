import React from 'react';
import Map from './components/map/Map';
import Nav from './components/nav/Nav';
import fire from './firebase/Fire';
import SignUpPage from './components/signing/SignUpPage';
import SignIn from './components/signing/SignIn';
import {useDispatch, useSelector} from "react-redux";
import {checkSignIn, currentUser, initCollection} from "./redux/actions/setActions";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

export default function App() {
  const change = useSelector(state => state.change);
  const signedIn = useSelector(state => state.signedIn);
  const dispatch = useDispatch();
  const db = fire.firestore();

  React.useEffect(()=> {
    let someStuff = [];
    db.collection("garages").get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
            const object = doc.data();
            let garage = {
                id: doc.id,
                name: object.name,
                latitude: object.latitude,
                longitude: object.longitude,
                hitbox: object.hitbox,
                isNearETOrIT: object.isNearETOrIT
            };
            someStuff.push(garage);
        });
        dispatch(initCollection(someStuff));
    });
    fire.auth().onAuthStateChanged(function(user) {
        if (user) {
            dispatch(checkSignIn(true));
            dispatch(currentUser(user));
        } else {
            dispatch(checkSignIn(false));
            dispatch(currentUser({name:""}));
        }
    });
  }, [db,dispatch,change]);

  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path={"/"}>{signedIn?<Redirect to={"/map"}/>:<Redirect to={"/signin"}/>}</Route>
          <Route path={"/map"} component={Map}>{!signedIn?<Redirect to={"/signin"}/>:""}</Route>
          <Route path={"/signup"}>{signedIn?<Redirect to={"/"}/>:<SignUpPage/>}</Route>
          <Route path={"/signin"} >{signedIn?<Redirect to={"/"}/>:<SignIn/>}</Route>
        </Switch>
      </div>
    </Router>
  );
}