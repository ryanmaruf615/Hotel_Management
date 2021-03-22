import React from 'react';
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TopNav from "./Components/topNav";

function App() {
  return (
    <div >
        <BrowserRouter>
            <TopNav/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
