import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../../utils/emitter';


class ModelEditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            categoryNameEn: '',
            categoryNameVi: '',
            description: '',
            errors: {}
        }

        this.listenToEmitter();
    }
    componentDidMount() {
        let currentCategory = this.props.currentCategory
        this.setState({
            id: currentCategory.id,
            categoryNameEn: currentCategory.categoryNameEn,
            categoryNameVi: currentCategory.categoryNameVi,
            description: currentCategory.description,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.resetFormTrigger && this.props.resetFormTrigger !== prevProps.resetFormTrigger) {
            this.resetForm();
            if (this.props.onResetComplete) {
                this.props.onResetComplete();
            }
        }
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.resetFormAddNewUser();
        });
    }

    resetForm() {
        this.setState({
            categoryNameEn: '',
            categoryNameVi: '',
            description: '',
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
        const { categoryNameEn, categoryNameVi } = this.state;
        let errors = {};
        let isValid = true;

        if (!categoryNameEn) {
            isValid = false;
            errors.categoryNameEn = 'Không được để trống';
        }

        if (!categoryNameVi) {
            isValid = false;
            errors.categoryNameVi = 'Không được để trống';
        }

        this.setState({ errors });
        return isValid;
    }


    handleSaveOnChanges = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            let { id, categoryNameEn, categoryNameVi, description } = this.state;
            let data = {
                id,
                categoryNameEn,
                categoryNameVi,
                description
            };
            this.props.editCategory(data);
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'container-sm'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Add New Category
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        {this.props.errorEdit && (
                            <div className='text-danger col-12'>
                                {this.props.errorEdit}
                            </div>
                        )}
                        <div className='form-group col-12'>
                            <label>Category Name En</label>
                            <input
                                type='text'
                                className={`form-control ${errors.categoryNameEn ? 'is-invalid' : ''}`}
                                value={this.state.categoryNameEn}
                                onChange={(event) => this.handleOnChangeInput(event, 'categoryNameEn')}
                            />
                            {errors.categoryNameEn && <div className='invalid-feedback'>{errors.categoryNameEn}</div>}
                        </div>

                        <div className='form-group col-12'>
                            <label>Category Name Vi</label>
                            <input
                                type='text'
                                className={`form-control ${errors.categoryNameVi ? 'is-invalid' : ''}`}
                                value={this.state.categoryNameVi}
                                onChange={(event) => this.handleOnChangeInput(event, 'categoryNameVi')}
                            />
                            {errors.categoryNameVi && <div className='invalid-feedback'>{errors.categoryNameVi}</div>}
                        </div>

                        <div className='form-group col-12'>
                            <label>Description</label>
                            <input
                                type='text'
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                value={this.state.description}
                                onChange={(event) => this.handleOnChangeInput(event, 'description')}
                            />
                            {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                        </div>


                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleSaveOnChanges()}>
                        Save on changes
                    </Button>
                    {/* <Button color="danger" className='px-3' onClick={() => this.resetForm()}>
                        Reset
                    </Button> */}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditCategory);
