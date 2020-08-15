import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/profile" component={Profile}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
