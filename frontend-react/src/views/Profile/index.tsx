import React, {Component} from "react";
import PageTemplate from "../../components/PageTemplate";
import {User, UserUpdate} from "../../client/generated";
import {UserState} from "../../stores/user/types";
import {connect} from "react-redux";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {RouteComponentProps} from "react-router";
import {ClientSingleton} from "../../client/ClientSingleton";
import {Dispatch} from "redux";
import {setUserAction} from "../../stores/user/actions";

interface ProfileState {
    showEdit: boolean
    editName: string
    editSurname: string
    editEmail: string
}

interface UserStoreProps {
    user: User | null
}

interface UserStoreDispatchProps {
    setUser: (user: User) => void
}

type CombinedProps = UserStoreProps & RouteComponentProps & UserStoreDispatchProps

class Profile extends Component<CombinedProps, ProfileState> {

    state = {
        showEdit: false,
        editName: "",
        editSurname: "",
        editEmail: ""
    }

    back = () => {
        this.props.history.push("/")
    }

    handleCloseEdit = () => {
        this.setState({showEdit: false})
    }

    handleOpenEdit = () => {
        this.setState({
            showEdit: true,
            editSurname: this.props.user!.surname || "",
            editName: this.props.user!.name || "",
            editEmail: this.props.user!.email,

        })
    }

    handleSave = () => {
        const update: UserUpdate = {
            email: this.state.editEmail,
            name: this.state.editName,
            surname: this.state.editSurname
        }
        console.log(this.props.user?.id)
        ClientSingleton.getInstance().apiUserIdPut(this.props.user!.id, update).then((response) => {
            this.props.setUser(response.data)
            this.setState({showEdit: false})
        }).catch((reason => {
            // TODO: Nice error handling, especially validation errors, with a pop message or something.
            console.error(reason)
        }))
    }

    onEmailChange(event: { target: { value: string } }) {
        this.setState({editEmail: event.target.value})
    }

    onNameChange(event: { target: { value: string } }) {
        this.setState({editName: event.target.value})
    }

    onSurnameChange(event: { target: { value: string } }) {
        this.setState({editSurname: event.target.value})
    }

    editModal = () => {
        return (
            <Modal show={this.state.showEdit} onHide={this.handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="edit-user-email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={this.state.editEmail}
                                onChange={this.onEmailChange.bind(this)}
                            />
                        </Form.Group>
                        <Form.Group controlId="edit-user-name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                placeholder="Enter Name"
                                value={this.state.editName}
                                onChange={this.onNameChange.bind(this)}
                            />
                        </Form.Group>
                        <Form.Group controlId="edit-user-surname">
                            <Form.Label>Surname:</Form.Label>
                            <Form.Control
                                placeholder="Enter Surname"
                                value={this.state.editSurname}
                                onChange={this.onSurnameChange.bind(this)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" id="save-button" onClick={this.handleSave.bind(this)}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={this.handleCloseEdit}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    content = () => {
        const user = this.props.user
        if (user != null) {
            return (
                <div>
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <Form>
                                <Form.Group controlId="email-value">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control disabled type="email" value={user.email}/>
                                </Form.Group>
                                <Form.Group controlId="name-value">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control disabled value={user.name}/>
                                </Form.Group>
                                <Form.Group controlId="surname-value">
                                    <Form.Label>Surname:</Form.Label>
                                    <Form.Control disabled value={user.surname}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={{span: 2, offset: 4}}>
                            <Button variant="primary" id="edit-button" onClick={this.handleOpenEdit}>Edit</Button>
                        </Col>
                        <Col md={{span: 2}}>
                            <Button variant="secondary" id="cancel-profile" onClick={this.back}>Cancel</Button>
                        </Col>
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
                {this.editModal()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)