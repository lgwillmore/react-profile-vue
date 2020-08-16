import React, {Component} from "react";
import PageTemplate from "../../components/PageTemplate";
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import {LoginRequest, User} from "../../client/generated";
import {ClientSingleton} from "../../client/ClientSingleton";
import {RouteComponentProps, withRouter} from "react-router";
import {setUserAction} from "../../stores/user/actions";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {UserState} from "../../stores/user/types";

interface LoginState {
    registerFormEmail: string,
    registerFormPassword: string
}

interface UserStoreProps {
    user: User | null
}

interface UserStoreDispatchProps {
    setUser: (user: User) => void
}

type CombinedProps = RouteComponentProps & UserStoreDispatchProps & UserStoreProps


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
            console.log("error")
        }))
    }

    get registeredUser() {
        const user = this.props.user
        if (user != null) {
            return (<div>{user.email}</div>)
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

const mapStateToProps = (state: UserState) => {
    const props: UserStoreProps = {
        user: state.user
    }
    return props
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setUser: (user: User) => {
            dispatch(setUserAction(user))
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Login)
)