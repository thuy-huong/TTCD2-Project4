import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './WorkingProcess.scss'
import icon1 from '../../../assets/images/work-process/icon1.png'
import icon2 from '../../../assets/images/work-process/icon2.png'
import icon3 from '../../../assets/images/work-process/icon3.png'



class WorkingProcess extends Component {



    render() {

        return (

            <>
                {/* <!-- HOW IT WORK SECTION START --> */}
                <div className="section-full p-t120 p-b90 site-bg-white twm-how-it-work-area">
                    <div className="container">

                        {/* <!-- TIÊU ĐỀ BẮT ĐẦU --> */}
                        <div className="section-head center wt-small-separator-outer">
                            <div className="wt-small-separator site-text-primary">
                                <div>Quy trình làm việc</div>
                            </div>
                            <h2 className="wt-title">Cách hoạt động</h2>
                        </div>
                        {/* <!-- TIÊU ĐỀ KẾT THÚC --> */}

                        <div className="twm-how-it-work-section">
                            <div className="row">

                                {/* <!-- BƯỚC 1 --> */}
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="twm-w-process-steps">
                                        <span className="twm-large-number">01</span>
                                        <div className="twm-w-pro-top bg-clr-sky">
                                            <div className="twm-media">
                                                <span><img src={icon1} alt="icon1" /></span>
                                            </div>
                                            <h4 className="twm-title">Đăng ký<br />Tài khoản</h4>
                                        </div>
                                        <p>Bạn cần tạo tài khoản để tìm được công việc tốt nhất và phù hợp nhất.</p>
                                    </div>
                                </div>

                                {/* <!-- BƯỚC 2 --> */}
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="twm-w-process-steps">
                                        <span className="twm-large-number">02</span>
                                        <div className="twm-w-pro-top bg-clr-pink">
                                            <div className="twm-media">
                                                <span><img src={icon2} alt="icon2" /></span>
                                            </div>
                                            <h4 className="twm-title">Ứng tuyển<br />Công việc mơ ước</h4>
                                        </div>
                                        <p>Bạn cần tạo tài khoản để tìm được công việc tốt nhất và phù hợp nhất.</p>
                                    </div>
                                </div>

                                {/* <!-- BƯỚC 3 --> */}
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="twm-w-process-steps">
                                        <span className="twm-large-number">03</span>
                                        <div className="twm-w-pro-top bg-clr-green">
                                            <div className="twm-media">
                                                <span><img src={icon3} alt="icon3" /></span>
                                            </div>
                                            <h4 className="twm-title">Tải lên<br />Hồ sơ xin việc</h4>
                                        </div>
                                        <p>Bạn cần tạo tài khoản để tìm được công việc tốt nhất và phù hợp nhất.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingProcess);
