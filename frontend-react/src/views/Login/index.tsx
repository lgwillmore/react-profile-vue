import React, {Component} from "react";
import PageTemplate from "../../components/PageTemplate";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import {LoginRequest, UserLoginResponse} from "../../client/generated";
import {ClientSingleton} from "../../client/ClientSingleton";

interface LoginState {
    registerResponse: UserLoginResponse | null,
    registerFormEmail: string,
    registerFormPassword: string
}


export default class Login extends Component<{}, LoginState> {

    state: LoginState

    constructor(props: {}) {
        super(props);
        this.state = {
            registerResponse: null,
            registerFormEmail: "",
            registerFormPassword: ""
        }
    }

    onRegisterEmailChange(event: { target: { value: string } }) {
        this.setState({registerFormEmail: event.target.value})
    }

    onRegisterPasswordChange(event: { target: { value: string } }) {
        this.setState({registerFormPassword: event.target.value})
    }

    register = () => {
        const login: LoginRequest = {
            email: this.state.registerFormEmail,
            password: this.state.registerFormPassword
        }
        ClientSingleton.getInstance().apiUserRegisterPost(login).then((response) => {
            console.log("Got state")
            this.setState({registerResponse: response.data})
        }).catch((reason => {
            console.log("error")
        }))
    }

    get registeredUser() {
        const response = this.state.registerResponse
        if (response != null) {
            return (<div>{response.token}</div>)
        } else {
            return (<div>No Token</div>)
        }
    }

    render() {
        return (
            <PageTemplate
                title="Login"
            >
                <Tabs defaultActiveKey="login" id="login-register-tabs">
                    <Tab eventKey="login" title="Login">
                        Login
                    </Tab>
                    <Tab eventKey="register" title="Register">
                        <br/>
                        <Row><Col>
                            <label>
                                email:
                                <input
                                    id="register-email"
                                    type="text"
                                    value={this.state.registerFormEmail}
                                    onChange={this.onRegisterEmailChange.bind(this)}
                                />
                            </label>
                        </Col></Row>
                        <Row><Col>
                            <label>
                                password:
                                <input
                                    id="register-password"
                                    type="password"
                                    value={this.state.registerFormPassword}
                                    onChange={this.onRegisterPasswordChange.bind(this)}
                                />
                            </label>

                        </Col></Row>
                        <br/>
                        <Row><Col>
                            <button onClick={this.register}>Submit</button>
                        </Col></Row>
                        {this.registeredUser}
                    </Tab>
                </Tabs>
            </PageTemplate>
        );
    }

}