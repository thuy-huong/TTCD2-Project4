import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss'
import logo from '../../assets/images/lo1.png';
import banner from '../../assets/images/banner.png'
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';


class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event:  actions
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language
        return (

            <>
                <header className="site-header header-style-3">
                    <div className="sticky-header main-bar-wraper navbar-expand-lg">
                        <div className="main-bar">
                            <div className="container-fluid clearfix">

                                <div className="logo-header">
                                    <img src={logo} width={150} />
                                </div>

                                <div className="header-nav navbar-collapse collapse d-flex justify-content-center">
                                    <ul className="navbar-nav">
                                        <li><a href="/"><FormattedMessage id="homeHeader.home" /></a></li>
                                        <li className="has-child">
                                            <a href='/'> <FormattedMessage id="homeHeader.job" /> </a>
                                            <ul className="sub-menu">
                                                <li><a href="/job/jobmap.html">Việc làm kèm bản đồ</a></li>
                                                <li><a href="/job/joblist.html">Danh sách việc làm</a></li>
                                                <li><a href="/job/job-detail.html">Chi tiết công việc</a></li>
                                                <li><a href="/job/apply-job.html">Ứng tuyển việc làm</a></li>
                                            </ul>
                                        </li>

                                        <li className="has-child">
                                            <a href="/"><FormattedMessage id="homeHeader.cv" /></a>
                                            <ul className="sub-menu">
                                                <li><a href="/Employess/employer-list.html">Danh sách nhà tuyển dụng</a></li>
                                                <li><a href="/Employess/employer-list.html">Chi tiết nhà tuyển dụng</a>
                                                </li>
                                                <li><a href="/Employess/employer-list.html">Hồ sơ</a></li>
                                                <li><a href="/Employess/employer-list.html">Hồ sơ ứng viên</a></li>
                                                <li><a href="/Employess/employer-list.html">Quản lý việc làm</a></li>
                                                <li><a href="/Employess/employer-list.html">Đăng việc làm</a></li>
                                                <li><a href="/Employess/employer-list.html">Giao dịch</a></li>
                                                <li><a href="/Employess/employer-list.html">Đăng ký sinh viên mới ra trường</a>
                                                </li>
                                                <li><a href="/Employess/employer-list.html">Đăng ký chuyên gia</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-child">
                                            <a href="/"><FormattedMessage id="homeHeader.career-handbook" /></a>
                                            <ul className="sub-menu">
                                                <li><a href="/about-1">Về chúng tôi</a></li>
                                                <li><a href="/faq">Câu hỏi thường gặp</a></li>
                                                <li><a href="/contact">Liên hệ</a></li>
                                                <li><a href="/coming-soon">Sắp ra mắt</a></li>
                                            </ul>
                                        </li>

                                    </ul>
                                </div>

                                <div className="header-cta">
                                    {/* <form className="header-search" role="search">
                                        <input className="form-control" type="text" placeholder="Tìm kiếm" />
                                    </form> */}
                                    <div className="header-buttons">
                                        {/* <a href="#"><i className="fa fa-briefcase" aria-hidden="true"></i></a>
                                        <a href="#"> <i className="fas fa-sign-out-alt"></i></a> */}
                                        <button className='btn-sign'><FormattedMessage id="homeHeader.sign" /></button>
                                        <button className='btn-login'><FormattedMessage id="homeHeader.login" /></button>
                                        <button className='btn-post-jobs'><FormattedMessage id="homeHeader.PostJobsSearchResumes" /></button>
                                        <div className='language'>
                                            <div className={language === LANGUAGES.VI ? "language-vn active" : 'language-vn '}>
                                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI
                                                </span>
                                            </div>
                                            <div className={language === LANGUAGES.EN ? "language-en active" : 'language-en '}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </header >

                {/* <!--Banner Start--> */}
                <div className="twm-home1-banner-section site-bg-gray bg-cover" >
                    <div className="col-xl-6 col-lg-6 col-md-12">
                        <img src={banner} alt="Banner Image" className="banner-image" />
                    </div>
                    <div className="row">
                        {/* <!--Left Section--> */}
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="twm-bnr-left-section">
                                <div className="twm-bnr-title-small"><FormattedMessage id="homeHeader.WeHaveOver" /> <span
                                    className="site-text-primary">208,000+</span> <FormattedMessage id="homeHeader.directJobs" />.</div>
                                <div className="twm-bnr-title-large"><FormattedMessage id="homeHeader.find" />
                                    <span className="site-text-primary"><FormattedMessage id="homeHeader.theJob" /> </span>
                                    <FormattedMessage id="homeHeader.rightForYou" /></div>
                                <div className="twm-bnr-discription"><FormattedMessage id="homeHeader.EnterKeywords" /></div>
                                <div className="twm-bnr-search-bar">
                                    <form>
                                        <div className="row">
                                            {/* <!--Tiêu đề--> */}
                                            <div className="form-group col-xl-3 col-lg-6 col-md-6">
                                                <label>Công việc</label>
                                                <select className="wt-search-bar-select selectpicker" data-live-search="true"
                                                    title="" id="j-Job_Title">
                                                    <option disabled value="">Chọn danh mục</option>
                                                    <option >Các công việc</option>
                                                    <option>Nhà thiết kế web</option>
                                                    <option>Lập trình viên</option>
                                                    <option>Kế toán</option>
                                                </select>
                                            </div>
                                            {/* <!--Tất cả danh mục--> */}
                                            <div className="form-group col-xl-3 col-lg-6 col-md-6">
                                                <label>Loại</label>
                                                <select className="wt-search-bar-select selectpicker" data-live-search="true"
                                                    title="" id="j-All_Category">
                                                    <option disabled value="">Chọn danh mục</option>
                                                    <option >Tất cả danh mục</option>
                                                    <option>Nhà thiết kế web</option>
                                                    <option>Lập trình viên</option>
                                                    <option>Kế toán</option>
                                                </select>
                                            </div>
                                            {/* <!--Địa điểm--> */}
                                            <div className="form-group col-xl-3 col-lg-6 col-md-6">
                                                <label>Địa điểm</label>
                                                <div className="twm-inputicon-box">
                                                    <input name="username" type="text" required className="form-control"
                                                        placeholder="Tìm kiếm..." />
                                                    <i className="twm-input-icon fas fa-map-marker-alt"></i>
                                                </div>
                                            </div>
                                            {/* <!--Nút tìm việc--> */}
                                            <div className="form-group col-xl-3 col-lg-6 col-md-6 py-2">
                                                <button type="button" className="site-button">Tìm việc</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="twm-bnr-popular-search">
                                    <span className="twm-title">Tìm kiếm phổ biến: </span>
                                    <a href="job-list.html">Lập trình viên</a> ,
                                    <a href="job-list.html">Nhà thiết kế</a> ,
                                    <a href="job-list.html">Kiến trúc sư</a> ,
                                    <a href="job-list.html">Kỹ sư</a> ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
