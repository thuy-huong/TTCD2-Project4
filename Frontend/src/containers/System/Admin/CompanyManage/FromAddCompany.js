import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './FromAddCompany.scss'

import { LANGUAGES, CommonUtils } from '../../../../utils';
import * as actions from '../../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import { createNewCompanyService } from '../../../../services/companyService';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class FromAddCompany extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sizeArr: [],
            previewImgUrl: '',
            isOpen: false,

            newCompany: {
                companyName: '',
                industry: '',
                companySize: '',
                address: '',
                description: '',
                logo: '',
            },

            errors: {},
            res: {},
        }
    }

    async componentDidMount() {
        const codeTypes = ["SIZE"];
        this.props.getAllCode(codeTypes);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.sizes !== this.props.sizes) {
            this.setState({
                sizeArr: this.props.sizes
            })
        }

    }


    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
            this.setState(prevState => ({
                previewImgUrl: objectUrl,
                newCompany: {
                    ...prevState.newCompany,
                    logo: base64
                }
            }));
            console.log(base64)
        }
    };


    openPreviewImg = () => {
        this.setState({
            isOpen: true
        })
    }

    handleSaveCompany = async () => {
        const isValid = this.validateInput();
        if (!isValid) return;

        //fire redux action
        // this.props.createNewCompany(this.state.newCompany)

        //call api
        let res = await createNewCompanyService(this.state.newCompany)
        if (res && res.errCode === 0) {
            this.handleResetData()
            toast.success("Create new company success!")
            console.log(res)
        } else {
            this.setState({
                res: res
            })
            toast.warn("Create new company failed!")

        }
    };

    handleResetData = () => {
        this.setState({
            newCompany: {
                companyName: '',
                industry: '',
                companySize: '',
                address: '',
                description: '',
                logo: '',

            },
            previewImgUrl: '',
        })
    }

    onChangeInput = (event, field) => {
        let copyNewCompany = { ...this.state.newCompany };
        copyNewCompany[field] = event.target.value;

        let copyErrors = { ...this.state.errors };
        if (copyErrors[field]) {
            delete copyErrors[field];
        }

        this.setState({
            newCompany: copyNewCompany,
            errors: copyErrors,
            res: '',
        });
    };

    validateInput = () => {
        const { companyName, industry, companySize, address, description } = this.state.newCompany;
        let errors = {};
        let isValid = true;

        if (!companyName) {
            errors.companyName = <FormattedMessage id="manageCompany.error.companyName" />;
            isValid = false;
        }
        if (!industry) {
            errors.industry = <FormattedMessage id="manageCompany.error.industry" />;
            isValid = false;
        }
        if (!companySize) {
            errors.companySize = <FormattedMessage id="manageCompany.error.companySize" />;
            isValid = false;
        }
        if (!address) {
            errors.address = <FormattedMessage id="manageCompany.error.address" />;
            isValid = false;
        }
        if (!description) {
            errors.description = <FormattedMessage id="manageCompany.error.description" />;
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    render() {
        let sizes = this.state.sizeArr
        let language = this.props.language
        let isLoadingSize = this.props.isLoadingSize
        let { companyName, industry, companySize, address, description, logo, } = this.state.newCompany;
        return (
            <div className="info-data" >
                <div className='container container-add-company'>
                    <div className='title text-center pt-3'><FormattedMessage id="manageCompany.add" /></div>
                    <div className='text-danger'> {isLoadingSize === true ? "Loading company size..." : ''}</div>
                    <form>
                        <div className="row">
                            {this.state.res && this.state.res.errCode !== 0 && (
                                <div className='text-danger'> {this.state.res.message}</div>
                            )}

                            <div className="form-group col-6">

                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.name" /></label>
                                <input
                                    type="text"
                                    className={`form-control ${this.state.errors.companyName ? 'is-invalid' : ''}`}
                                    value={companyName}
                                    onChange={(event) => this.onChangeInput(event, 'companyName')}
                                />
                                {this.state.errors.companyName && (
                                    <div className="invalid-feedback">
                                        {this.state.errors.companyName}
                                    </div>
                                )}

                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.industry" /></label>
                                <input
                                    type="text"
                                    className={`form-control ${this.state.errors.industry ? 'is-invalid' : ''}`}
                                    value={industry}
                                    onChange={(event) => this.onChangeInput(event, 'industry')}
                                />
                                {this.state.errors.industry && (
                                    <div className="invalid-feedback">
                                        {this.state.errors.industry}
                                    </div>
                                )}

                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.size" /> </label>
                                <select
                                    className={`form-control ${this.state.errors.companySize ? 'is-invalid' : ''}`}
                                    value={companySize}
                                    onChange={(event) => this.onChangeInput(event, 'companySize')}
                                >
                                    <option value="">-- Chose --</option>
                                    {sizes && sizes.length > 0 &&
                                        sizes.map((item, index) => (
                                            <option value={item.id} key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        ))
                                    }
                                </select>
                                {this.state.errors.companySize && (
                                    <div className="invalid-feedback">
                                        {this.state.errors.companySize}
                                    </div>
                                )}

                            </div>
                            {/* <div className="form-group col-4">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.status" /></label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" />
                            </div> */}
                            <div className="form-group col-8">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.address" /></label>
                                <input
                                    type="text"
                                    className={`form-control ${this.state.errors.address ? 'is-invalid' : ''}`}
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                                {this.state.errors.address && (
                                    <div className="invalid-feedback">
                                        {this.state.errors.address}
                                    </div>
                                )}

                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1"><FormattedMessage id="manageCompany.description" /></label>
                                <textarea
                                    className={`form-control ${this.state.errors.description ? 'is-invalid' : ''}`}
                                    rows="3"
                                    value={description}
                                    onChange={(event) => this.onChangeInput(event, 'description')}
                                />
                                {this.state.errors.description && (
                                    <div className="invalid-feedback">
                                        {this.state.errors.description}
                                    </div>
                                )}


                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Logo</label>
                                <div className='preview-img-container'>
                                    <label htmlFor='preview-img' className='label-upload-img ' > <FormattedMessage id='manageCompany.upload' /><i className="fas fa-upload mx-2"></i></label>
                                    <input id='preview-img' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}

                                    />

                                    <div className={this.state.previewImgUrl ? 'preview-img mx-2' : 'preview-img-hide'}
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImg()}
                                    ></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                            </div>
                        </div>
                        <button type='button' className="btn btn-success my-3 "
                            onClick={() => this.handleSaveCompany()}
                        ><FormattedMessage id="manageCompany.save" /> </button>
                        <button
                            onClick={() => this.handleResetData()}
                            type='button' className=' btn btn-warning my-3 mx-3'>Reset data</button>
                        <Link to='/system/company-manage' className='btn btn-primary'><FormattedMessage id='manageCompany.list' /> </Link>
                    </form>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoadingSize: state.admin.isLoadingSize,
        sizes: state.admin.allCodes.sizes,
        // roles: state.admin.allCodes.roles,
        // positions: state.admin.allCodes.positions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCode: (type) => dispatch(actions.fetchAllCodesStart(type)),
        createNewCompany: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FromAddCompany);
