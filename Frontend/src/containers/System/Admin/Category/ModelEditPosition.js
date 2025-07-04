import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../../utils/emitter';
import { LANGUAGES } from '../../../../utils';
import { getAllCategoryService } from '../../../../services/categoryService'


class ModelEditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            PositionNameEn: '',
            PositionNameVi: '',
            categoryId: '',
            description: '',

            errors: {},
        }

        this.listenToEmitter();
    }
    async componentDidMount() {
        let categories = await getAllCategoryService("ALL")
        this.setState({
            categoryArr: categories.data
        })
        let currentPosition = this.props.currentPosition
        this.setState({
            id: currentPosition.id,
            PositionNameEn: currentPosition.PositionNameEn,
            PositionNameVi: currentPosition.PositionNameVi,
            description: currentPosition.description,
            categoryId: currentPosition.categoryId
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
        const { PositionNameEn, PositionNameVi, categoryId } = this.state;
        let errors = {};
        let isValid = true;

        if (!PositionNameEn) {
            isValid = false;
            errors.PositionNameEn = 'Không được để trống';
        }

        if (!PositionNameVi) {
            isValid = false;
            errors.PositionNameVi = 'Không được để trống';
        }

        if (!categoryId) {
            isValid = false;
            errors.categoryId = 'Vui lòng chọn';
        }

        this.setState({ errors });
        return isValid;
    };

    handleSaveOnChanges = () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        const data = {
            id: this.state.id,
            PositionNameEn: this.state.PositionNameEn,
            PositionNameVi: this.state.PositionNameVi,
            categoryId: this.state.categoryId,
            description: this.state.description
        };

        if (this.props.editPosition) {
            this.props.editPosition(data);
        }
    }

    render() {
        const { errors, categoryArr } = this.state;
        const language = this.props.language
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'container-sm'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Update professional position
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        {this.props.errorAddNew && (
                            <div className='text-danger col-12'>
                                {this.props.errorAddNew}
                            </div>
                        )}
                        <div className='form-group col-12'>
                            <label>Position Name En</label>
                            <input
                                type='text'
                                className={`form-control ${errors.PositionNameEn ? 'is-invalid' : ''}`}
                                value={this.state.PositionNameEn}
                                onChange={(event) => this.handleOnChangeInput(event, 'PositionNameEn')}
                            />
                            {errors.PositionNameEn && <div className='invalid-feedback'>{errors.PositionNameEn}</div>}
                        </div>

                        <div className='form-group col-12'>
                            <label>Position Name Vi</label>
                            <input
                                type='text'
                                className={`form-control ${errors.PositionNameVi ? 'is-invalid' : ''}`}
                                value={this.state.PositionNameVi}
                                onChange={(event) => this.handleOnChangeInput(event, 'PositionNameVi')}
                            />
                            {errors.PositionNameVi && <div className='invalid-feedback'>{errors.PositionNameVi}</div>}
                        </div>
                        <div className='form-group col-12'>
                            <label>Category</label>
                            <select
                                type='text'
                                className={`form-control ${errors.categoryId ? 'is-invalid' : ''}`}
                                value={this.state.categoryId}
                                onChange={(event) => this.handleOnChangeInput(event, 'categoryId')}
                            >
                                <option value="">-- Chose --</option>
                                {categoryArr && categoryArr.length > 0 &&
                                    categoryArr.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {language === LANGUAGES.VI ? item.categoryNameVi : item.categoryNameEn}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.categoryId && <div className='invalid-feedback'>{errors.categoryId}</div>}
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
