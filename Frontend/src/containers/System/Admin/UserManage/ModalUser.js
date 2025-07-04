import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../../utils/emitter';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: '',
            phone: '',
            roleId: '',
            errors: {},
            roleArr: [],
        }

        this.listenToEmitter();
    }
    async componentDidMount() {
        const codeTypes = ["ROLE"];
        this.props.getAllCode(codeTypes);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }

    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.resetFormAddNewUser();
        });
    }

    resetFormAddNewUser() {
        this.setState({
            email: '',
            password: '',
            fullName: '',
            phone: '',
            roleId: '',
            errors: {}
        });
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        // Clear error of this field
        copyState.errors[id] = '';
        this.setState({ ...copyState });
    }

    checkValidateInput = () => {
        const { email, password, fullName, phone, roleId } = this.state;
        let errors = {};
        let isValid = true;

        if (!email) {
            isValid = false;
            errors.email = <FormattedMessage id="manageUser.error.email_required" />;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errors.email = <FormattedMessage id="manageUser.error.email_invalid" />;
        }

        if (!password) {
            isValid = false;
            errors.password = <FormattedMessage id="manageUser.error.password" />;
        }

        if (!fullName) {
            isValid = false;
            errors.fullName = <FormattedMessage id="manageUser.error.name" />;
        }

        if (!phone) {
            isValid = false;
            errors.phone = <FormattedMessage id="manageUser.error.phone" />;
        }

        if (!roleId) {
            isValid = false;
            errors.roleId = <FormattedMessage id="manageUser.error.role" />;
        }

        this.setState({ errors });
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    }

    render() {
        const { errors } = this.state;
        let roles = this.state.roleArr
        let language = this.props.language
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'container-sm'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id='manageUser.add' />
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        {this.props.resAddUser && this.props.resAddUser.errCode !== 0 && (
                            <div className='text-danger'>{this.props.resAddUser.message}</div>
                        )}

                        <div className='form-group col-6'>
                            <label>Email</label>
                            <input
                                type='email'
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <div className='form-group col-6'>
                            <label><FormattedMessage id='manageUser.password' /></label>
                            <input
                                type='password'
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                            />
                            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                        </div>

                        <div className='form-group col-12'>
                            <label><FormattedMessage id='manageUser.name' /></label>
                            <input
                                type='text'
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                value={this.state.fullName}
                                onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                            />
                            {errors.fullName && <div className='invalid-feedback'>{errors.fullName}</div>}
                        </div>

                        <div className='form-group col-12'>
                            <label><FormattedMessage id='manageUser.phone' /></label>
                            <input
                                type='text'
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                value={this.state.phone}
                                onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                            />
                            {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                        </div>

                        <div className='form-group col-12'>
                            <label><FormattedMessage id='manageUser.role' /></label>
                            <select
                                type='text'
                                className={`form-control ${errors.roleId ? 'is-invalid' : ''}`}
                                value={this.state.roleId}
                                onChange={(event) => this.handleOnChangeInput(event, 'roleId')}
                            >
                                <option value="">-- Chose --</option>
                                {roles && roles.length > 0 &&
                                    roles.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.roleId && <div className='invalid-feedback'>{errors.roleId}</div>}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleAddNewUser()}>
                        <FormattedMessage id='manageUser.save' />
                    </Button>
                    <Button color="danger" className='px-3' onClick={() => this.resetFormAddNewUser()}>
                        Reset
                    </Button>
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        <FormattedMessage id='manageUser.close' />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoadingSize: state.admin.isLoadingSize,
        sizes: state.admin.allCodes.sizes,
        roles: state.admin.allCodes.roles,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCode: (type) => dispatch(actions.fetchAllCodesStart(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
