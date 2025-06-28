
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: '',
            phone: '',
            roleId: '',
        }

        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.resetFormAddNewUser();

        })
    }

    resetFormAddNewUser() {
        this.setState({
            email: '',
            password: '',
            fullName: '',
            phone: '',
            roleId: '',
        })

    }
    componentDidMount() {

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
        let arrInput = ['email', 'password', 'fullName', 'phone', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='Password'
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')} />
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
                        <div className='input-container max-width-input'>
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
                        onClick={() => this.handleAddNewUser()}>
                        Add new
                    </Button>
                    <Button color="secondary" className='px-3' onClick={() => { this.resetFormAddNewUser() }}>
                        Reset
                    </Button>
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        Close
                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
