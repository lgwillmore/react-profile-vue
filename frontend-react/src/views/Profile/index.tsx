import React, {Component} from "react";
import PageTemplate from "../../components/PageTemplate";
import {User} from "../../client/generated";
import {UserState} from "../../stores/user/types";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";

interface UserStoreProps {
    user: User | null
}

class Profile extends Component<UserStoreProps> {

    content = () => {
        const user = this.props.user
        if (user != null) {
            return (
                <div>
                    <Row>
                        <Col>Name:</Col><Col id="name-value">{user.name || ""}</Col>
                    </Row>
                    <Row>
                        <Col>Surname:</Col><Col id="surname-value">{user.surname || ""}</Col>
                    </Row>
                    <Row>
                        <Col>Email:</Col><Col id="email-value">{user.email}</Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <div>Not Logged In</div>
            )
        }
    }

    render() {
        return (
            <PageTemplate
                title="Profile"
            >
                {this.content()}
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

export default connect(mapStateToProps)(Profile)