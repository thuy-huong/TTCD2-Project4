
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
// import { emitter } from '../../../../utils/emitter';
import _ from 'lodash'
import * as actions from '../../../../store/actions'
import { CommonUtils, LANGUAGES } from '../../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'


class ModalEditCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeArr: [],

            id: '',
            companyName: '',
            industry: '',
            companySize: "",
            address: "",
            description: "",
            logoUpdate: {},

            isOpenEditUser: false,
            isOpen: false,
            previewImgUrl: '',
        }
    }

    async componentDidMount() {
        let codeTypes = ["SIZE"];
        await this.props.getAllCode(codeTypes);
        this.setState({
            sizeArr: this.props.sizes
        })

        let { currentCompany } = this.props
        if (currentCompany && !_.isEmpty(currentCompany)) {
            if (currentCompany.logo) {

                let imageBase64 = new Buffer(currentCompany.logo, 'base64').toString('binary')
                this.setState({
                    id: currentCompany.id,
                    companyName: currentCompany.companyName,
                    industry: currentCompany.industry,
                    companySize: currentCompany.companySize,
                    address: currentCompany.address,
                    description: currentCompany.description,
                    previewImgUrl: imageBase64
                })
                console.log('check dismonut', this.state.previewImgUrl)
            }
            this.setState({
                id: currentCompany.id,
                companyName: currentCompany.companyName,
                industry: currentCompany.industry,
                companySize: currentCompany.companySize,
                address: currentCompany.address,
                description: currentCompany.description,
            })
        }

    }

    toggle = () => {
        this.props.toggle()
    }

    handleOnChangeInput = (event, field) => {
        this.setState({
            [field]: event.target.value
        });
    };
    handleSaveCompany = () => {
        let { companyName, industry, companySize, address, description, logoUpdate } = this.state;
        let updatedCompany = {
            id: this.props.currentCompany.id,
            companyName,
            industry,
            companySize,
            address,
            description,
            logoUpdate,
        };
        this.props.editCompany(updatedCompany);
    };
    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            let base64 = await CommonUtils.getBase64(file)
            console.log(base64)
            this.setState({
                previewImgUrl: objectUrl,
                logoUpdate: base64
            });


        }
    };
    openPreviewImg = () => {
        this.setState({
            isOpen: true
        })
    }
    render() {

        let language = this.props.language;
        let sizes = this.state.sizeArr
        let { companyName, industry, companySize, address, description, } = this.state;
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Edit Company </ModalHeader>
                <ModalBody>

                    <div className='row'>
                        <div className='form-group'>
                            <label><FormattedMessage id='manageCompany.name' /> </label>
                            <input type='text'
                                className='form-control'
                                value={companyName}
                                onChange={(event) => this.handleOnChangeInput(event, 'companyName')} />
                        </div>
                        <div className='form-group'>
                            <label><FormattedMessage id='manageCompany.industry' /></label>
                            <input type='text'
                                className='form-control'
                                value={industry}
                                onChange={(event) => this.handleOnChangeInput(event, 'industry')} />
                        </div>
                        <div className='form-group'>
                            <label><FormattedMessage id='manageCompany.size' /></label>
                            <select
                                className='form-control'
                                value={companySize}
                                onChange={(event) => this.handleOnChangeInput(event, 'companySize')}
                            >
                                {sizes && sizes.length > 0 &&
                                    sizes.map((item, index) => (

                                        <option value={item.id} key={index} >

                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='form-group'>
                            <label><FormattedMessage id='manageCompany.address' /></label>
                            <input type='text'
                                className='form-control'
                                value={address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"><FormattedMessage id="manageCompany.description" /></label>
                            <textarea
                                className='form-control'
                                rows="3"
                                value={description}
                                onChange={(event) => this.handleOnChangeInput(event, 'description')}
                            />


                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Logo</label>
                            <div className='preview-img-container'>
                                <label htmlFor='preview-img' className='label-upload-img ' ><FormattedMessage id='manageCompany.upload' /> <i className="fas fa-upload mx-2"></i></label>
                                <input id='preview-img' type='file' hidden
                                    onChange={(event) => this.handleOnChangeImg(event)}

                                />

                                <div className={this.state.previewImgUrl ? 'preview-img mx-2' : 'preview-img-hide'}
                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    onClick={() => this.openPreviewImg()}
                                ></div>
                            </div>
                            {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImgUrl}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={this.handleSaveCompany}>
                        Save changes
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
        language: state.app.language,
        sizes: state.admin.allCodes.sizes,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCode: (type) => dispatch(actions.fetchAllCodesStart(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCompany);
