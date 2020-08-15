import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from "./views/Home";
import Profile from "./views/Profile";
import Login from "./views/Login";
import {Nav, Navbar} from "react-bootstrap";

function App() {
    return (
        <BrowserRouter>
            <Navbar bg="dark" variant="dark">
                <Nav className="ml-auto mr-auto" activeKey={window.location.pathname}>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/login">Login/Register</Nav.Link>
                </Nav>
            </Navbar>
            <Route path="/" exact component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/login" component={Login}/>
        </BrowserRouter>
    );
}

export default App;
