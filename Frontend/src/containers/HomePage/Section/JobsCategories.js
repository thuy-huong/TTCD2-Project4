import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './JobsCategories.scss'
import icon1 from '../../../assets/images/work-process/icon1.png'
import icon2 from '../../../assets/images/work-process/icon2.png'
import icon3 from '../../../assets/images/work-process/icon3.png'



class JobsCategories extends Component {



    render() {

        return (

            <>
                {/* <!-- JOBS CATEGORIES SECTION START --> */}
                <div className="section-full p-t120 p-b90 site-bg-gray twm-job-categories-area">
                    <div className="container">
                        <div className="wt-separator-two-part">
                            <div className="row wt-separator-two-part-row">
                                <div className="col-xl-5 col-lg-5 col-md-12 wt-separator-two-part-left">
                                    {/* <!-- TIÊU ĐỀ BẮT ĐẦU --> */}
                                    <div className="section-head left wt-small-separator-outer">
                                        <div className="wt-small-separator site-text-primary">
                                            <div>Việc làm theo ngành nghề</div>
                                        </div>
                                        <h1 className="wt-title">Chọn ngành nghề <br />bạn mong muốn</h1>
                                    </div>
                                    {/* <!-- TIÊU ĐỀ KẾT THÚC --> */}
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-right">
                                    <p> Tạo cơ hội, điều kiện thuận lợi cho người lao động được gặp gỡ, tiếp<br /> cận với
                                        các
                                        doanh nghiệp, cơ sở đào tạo, Trung tâm Dịch vụ việc làm,<br /> để người lao động lựa
                                        chọn
                                        những công việc làm và nghề nghiệp phù<br /> hợp, góp phần giải quyết việc làm cho
                                        người
                                        lao động.</p>
                                </div>
                            </div>
                        </div>

                        <div className="twm-job-categories-section">
                            <div className="job-categories-style1 m-b30">
                                <div className="owl-carousel job-categories-carousel owl-btn-left-bottom">
                                    {/* <!-- CỘT 1 - Phát triển kinh doanh --> */}
                                    <div className="item">
                                        <div className="job-categories-block">
                                            <div className="twm-media">
                                                <i className="fas fa-chart-line fa-3x"></i>
                                            </div>
                                            <div className="twm-content">
                                                <div className="twm-jobs-available">9,185 công việc</div><br />
                                                <a href="job-detail.html">Phát triển kinh doanh</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- CỘT 2 - Quản lý dự án --> */}
                                    <div className="item">
                                        <div className="job-categories-block">
                                            <div className="twm-media">
                                                <i className="fas fa-tasks fa-3x"></i>
                                            </div>
                                            <div className="twm-content">
                                                <div className="twm-jobs-available">3,205 công việc</div><br />
                                                <a href="job-detail.html">Quản lý dự án</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- CỘT 3 - Viết nội dung --> */}
                                    <div className="item">
                                        <div className="job-categories-block">
                                            <div className="twm-media">
                                                <i className="fa fa-book" aria-hidden="true"></i>
                                            </div>
                                            <div className="twm-content">
                                                <div className="twm-jobs-available">2,100 công việc</div><br />
                                                <a href="job-detail.html">Viết nội dung</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- CỘT 4 - Chăm sóc khách hàng --> */}
                                    <div className="item">
                                        <div className="job-categories-block">
                                            <div className="twm-media">
                                                <i className="fa fa-headphones" aria-hidden="true"></i>
                                            </div>
                                            <div className="twm-content">
                                                <div className="twm-jobs-available">1,500 công việc</div><br />
                                                <a href="job-detail.html">Chăm sóc khách hàng</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- CỘT 5 - Xây dựng --> */}
                                    <div className="item">
                                        <div className="job-categories-block">
                                            <div className="twm-media">
                                                <i className="fa fa-building" aria-hidden="true"></i>
                                            </div>
                                            <div className="twm-content">
                                                <div className="twm-jobs-available">9,185 công việc</div><br />
                                                <a href="job-detail.html">Xây dựng</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right job-categories-btn">
                            <a href="job-grid.html" className="site-button">Tất cả ngành nghề</a>
                        </div>
                    </div>
                </div>
                {/* <!-- JOBS CATEGORIES SECTION END --> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(JobsCategories);
