
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',

            fullName: '',
            phone: '',
            roleId: '',
        }


    }

    componentDidMount() {
        let { currentUser } = this.props
        if (currentUser && !_.isEmpty(currentUser)) {
            this.setState({
                id: currentUser.id,
                email: currentUser.email,
                fullName: currentUser.fullName,
                phone: currentUser.phone,
                roleId: currentUser.roleId,
            })
        }

    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'fullName', 'phone', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {

        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Edit new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                disabled
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                        </div>

                        <div className='input-container'>
                            <label>FullName</label>
                            <input type='text'
                                value={this.state.fullName}
                                onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                        </div>
                        <div className='input-container'>
                            <label>Phone</label>
                            <input type='text'
                                value={this.state.phone}
                                onChange={(event) => this.handleOnChangeInput(event, 'phone')} />
                        </div>
                        <div className='input-container '>
                            <label>Role</label>
                            <input type='text'
                                value={this.state.roleId}
                                onChange={(event) => this.handleOnChangeInput(event, 'roleId')} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        className='px-3'
                        onClick={() => this.handleSaveUser()}>
                        Save changes
                    </Button>
                    <Button color="secondary" className='px-3' onClick={() => { this.resetFormAddNewUser() }}>
                        Reset
                    </Button>
                    {/* <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        Close
                    </Button> */}
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
