import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../Admin/CompanyRedux.scss'
import { getAllCodeService } from '../../../services/companyService'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'



class CompanyRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizeArr: [],
            roleArr: [],
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
    handleOnChangeImg = (event) => {
        let file = event.target.file

    }

    render() {
        let sizes = this.state.sizeArr
        let language = this.props.language
        let isLoadingSize = this.props.isLoadingSize
        return (
            <div className="info-data" >

                <div className='container container-add-company'>
                    <div className='title text-center pt-3'><FormattedMessage id="manageCompany.add" /></div>
                    <div className='text-danger'> {isLoadingSize === true ? "Loading company size..." : ''}</div>
                    <form>
                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.name" /></label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.industry" /></label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.size" /> </label>
                                <select id="inputState" className="form-control">

                                    {sizes && sizes.length > 0 &&
                                        sizes.map((item, index) => {
                                            return <option value={item.id} key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        })

                                    }

                                </select>
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.status" /></label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1"><FormattedMessage id="manageCompany.address" /></label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1"><FormattedMessage id="manageCompany.description" /></label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Logo</label>
                                <div className='preview-img-container'>
                                    <label htmlFor='preview-img' className='label-upload-img ' >Tải ảnh lên <i className="fas fa-upload"></i></label>
                                    <input id='preview-img' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}
                                    />

                                    <div className='preview-img'></div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary my-3 btn-save-company"><FormattedMessage id="manageCompany.save" /> </button>
                    </form>
                </div>
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
        getAllCode: (type) => dispatch(actions.fetchAllCodesStart(type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyRedux);
