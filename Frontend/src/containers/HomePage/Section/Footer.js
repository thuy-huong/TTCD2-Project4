import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import bgF from '../../../assets/images/f-bg.jpg'
import logo from '../../../assets/images/lo1.png';
import './Footer.scss'



class Footer extends Component {
    render() {

        return (

            <>
                {/* <!-- FOOTER START --> */}
                <footer className="footer-dark" style={{ backgroundImage: 'url(' + bgF + ')', backgroundSize: 'auto' }}>
                    <div className="container">

                        {/* <!-- PHẦN ĐĂNG KÝ NHẬN TIN --> */}
                        <div className="ftr-nw-content py-4">
                            <div className="row align-items-center">
                                <div className="col-md-5">
                                    <div className="ftr-nw-title text-white">
                                        Tham gia đăng ký nhận email của chúng tôi ngay để nhận cập nhật
                                        về các công việc mới và thông báo.
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <form>
                                        <div className="ftr-nw-form d-flex">
                                            <input name="news-letter" className="form-control me-2"
                                                placeholder="Nhập Email của bạn" type="text" />
                                            <button className="btn btn-primary ftr-nw-subcribe-btn">Đăng ký ngay</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* <!-- CÁC KHỐI TRONG FOOTER --> */}
                        <div className="footer-top py-5">
                            <div className="row gx-4 gy-4">

                                {/* <!-- Cột Thông tin --> */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="widget widget_about">
                                        <div className="logo-footer mb-3">
                                            <a href="index.html"><img src={logo} alt="Logo" width="250px" /></a>
                                        </div>
                                        <ul className="ftr-list list-unstyled text-white">
                                            <li>
                                                <p><strong>Địa chỉ:</strong> NTU, 28A Lê Trọng Tấn, La Khê, Hà Đông, Hà Nội
                                                </p>
                                            </li>
                                            <li>
                                                <p><strong>Email:</strong> example@max.com</p>
                                            </li>
                                            <li>
                                                <p><strong>Điện thoại:</strong> 555-555-1234</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* <!-- Các cột liên kết --> */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="widget widget_services ftr-list-center text-white">
                                        <h5 className="widget-title">Dành cho Ứng viên</h5>
                                        <ul className="list-unstyled">
                                            <li><a href="dashboard.html">Bảng điều khiển người dùng</a></li>
                                            <li><a href="dash-resume-alert.html">Cảnh báo hồ sơ</a></li>
                                            <li><a href="candidate-grid.html">Ứng viên</a></li>
                                            <li><a href="blog-list.html">Danh sách Blog</a></li>
                                            <li><a href="blog-single.html">Blog chi tiết</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6">
                                    <div className="widget widget_services ftr-list-center text-white">
                                        <h5 className="widget-title">Dành cho Nhà tuyển dụng</h5>
                                        <ul className="list-unstyled">
                                            <li><a href="dash-post-job.html">Đăng tin tuyển dụng</a></li>
                                            <li><a href="blog-grid.html">Lưới Blog</a></li>
                                            <li><a href="contact.html">Liên hệ</a></li>
                                            <li><a href="job-list.html">Danh sách việc làm</a></li>
                                            <li><a href="job-detail.html">Chi tiết việc làm</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6">
                                    <div className="widget widget_services ftr-list-center text-white">
                                        <h5 className="widget-title">Liên kết nhanh</h5>
                                        <ul className="list-unstyled">
                                            <li><a href="index.html">Trang chủ</a></li>
                                            <li><a href="about-1.html">Về chúng tôi</a></li>
                                            <li><a href="dash-bookmark.html">Đánh dấu</a></li>
                                            <li><a href="job-grid.html">Việc làm</a></li>
                                            <li><a href="employer-list.html">Nhà tuyển dụng</a></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* <!-- BẢN QUYỀN --> */}
                        <div className="footer-bottom border-top pt-3 mt-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap text-white">
                                <div className="footer-copy-right">
                                    <span className="copyrights-text">Create By : K22cnt3-NTU</span>
                                </div>
                                <ul className="social-icons list-unstyled d-flex gap-3 m-0">
                                    <li><a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#" className="text-white"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#" className="text-white"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#" className="text-white"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </footer>
                {/* <!-- FOOTER END --> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
