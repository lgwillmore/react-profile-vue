import React, {Component} from "react";
import PageTemplate from "../../components/PageTemplate";
import {Button, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import {LoginRequest, User} from "../../client/generated";
import {ClientSingleton} from "../../client/ClientSingleton";
import {RouteComponentProps, withRouter} from "react-router";
import {setUserAction} from "../../stores/user/actions";
import {connect} from "react-redux";
import {Dispatch} from "redux";

interface LoginState {
    registerFormEmail: string,
    registerFormPassword: string
}


interface UserStoreDispatchProps {
    setUser: (user: User) => void
}

type CombinedProps = RouteComponentProps & UserStoreDispatchProps


class Login extends Component<CombinedProps, LoginState> {

    state: LoginState

    constructor(props: CombinedProps) {
        super(props);
        this.state = {
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
            this.props.setUser(response.data.user)
            this.props.history.push("/")
        }).catch((reason => {
            // TODO: Nice error handling, especially validation errors, with a pop message or something.
            console.log("error")
        }))
    }

    render() {
        return (
            <PageTemplate
                title="Login"
            >
                <Tabs defaultActiveKey="login" id="login-register-tabs">
                    <Tab eventKey="login" title="Login">
                        <br/>
                        <div>Not implemented yet. Register.</div>
                    </Tab>
                    <Tab eventKey="register" title="Register">
                        <br/>
                        <Row><Col>
                            <Form>
                                <Form.Group controlId="register-email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={this.state.registerFormEmail}
                                        onChange={this.onRegisterEmailChange.bind(this)}
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="register-password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.registerFormPassword}
                                        onChange={this.onRegisterPasswordChange.bind(this)}
                                    />
                                </Form.Group>
                            </Form>
                        </Col></Row>
                        <br/>
                        <Row><Col>
                            <Button variant="success" onClick={this.register}>Submit</Button>
                        </Col></Row>
                    </Tab>
                </Tabs>
            </PageTemplate>
        );
    }

}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setUser: (user: User) => {
            dispatch(setUserAction(user))
        }
    }
}

export default withRouter(
    connect(null, mapDispatchToProps)(Login)
)