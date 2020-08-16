import React, {Component} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from "./views/Home";
import Profile from "./views/Profile";
import Login from "./views/Login";
import {Nav, Navbar} from "react-bootstrap";
import {User} from "./client/generated";
import {UserState} from "./stores/user/types";
import {connect} from "react-redux";

interface UserStoreProps {
    user: User | null
}

class App extends Component<UserStoreProps> {

    availableLinks() {
        const user = this.props.user
        if (user != null) {
            return (
                <Nav className="ml-auto mr-auto" activeKey={window.location.pathname}>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                </Nav>
            )
        } else {
            return (
                <Nav className="ml-auto mr-auto" activeKey={window.location.pathname}>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login/Register</Nav.Link>
                </Nav>
            )
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar bg="dark" variant="dark">
                    {this.availableLinks()}
                </Navbar>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: UserState) => {
    const props: UserStoreProps = {
        user: state.user
    }
    return props
}

export default connect(mapStateToProps)(App);
