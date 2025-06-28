import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Companies.scss'
import w1 from '../../../assets/images/client-logo/w1.png'
import w2 from '../../../assets/images/client-logo/w2.png'
import w3 from '../../../assets/images/client-logo/w3.png'
import w4 from '../../../assets/images/client-logo/w4.png'
import w5 from '../../../assets/images/client-logo/w5.png'
import w6 from '../../../assets/images/client-logo/w6.png'



class Companies extends Component {



    render() {

        return (

            <>

                {/* <!-- CÁC CÔNG TY HÀNG ĐẦU BẮT ĐẦU --> */}
                <div className="section-full p-t120 site-bg-white twm-companies-wrap">

                    {/* <!-- TIÊU ĐỀ BẮT ĐẦU --> */}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Các Công Ty Hàng Đầu</div>
                        </div>
                        <h2 className="wt-title">Được tuyển dụng bởi các công ty hàng đầu</h2>
                    </div>
                    {/* <!-- TIÊU ĐỀ KẾT THÚC --> */}

                    <div className="container">
                        <div className="section-content">
                            <div className="owl-carousel home-client-carousel2 owl-btn-vertical-center">

                                {/* <!-- Danh sách logo công ty --> */}
                                <div className="item">
                                    <div className="ow-client-logo">
                                        <div className="client-logo client-logo-media">
                                            <a href="employer-list.html"><img src={w1} alt="" /></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="ow-client-logo">
                                        <div className="client-logo client-logo-media">
                                            <a href="employer-list.html"><img src={w2} alt="" /></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="ow-client-logo">
                                        <div className="client-logo client-logo-media">
                                            <a href="employer-list.html"><img src={w3} alt="" /></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="ow-client-logo">
                                        <div className="client-logo client-logo-media">
                                            <a href="employer-list.html"><img src={w4} alt="" /></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="ow-client-logo">
                                        <div className="client-logo client-logo-media">
                                            <a href="employer-list.html"><img src={w5} alt="" /></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="ow-client-logo">
                                        <div className="client-logo client-logo-media">
                                            <a href="employer-list.html"><img src={w6} alt="" /></a>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- (Có thể lặp lại các logo tùy mục đích trình bày) --> */}

                            </div>
                        </div>
                    </div>



                </div>
                {/* <!-- CÁC CÔNG TY HÀNG ĐẦU KẾT THÚC --> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
