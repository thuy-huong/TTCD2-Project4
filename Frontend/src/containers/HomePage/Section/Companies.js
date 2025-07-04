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
import * as actions from '../../../store/actions'



class Companies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrCompany: [],
            logoImg: '',
        }
    }

    async componentDidMount() {
        this.props.loadTopCompany()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topCompany !== this.props.topCompany) {
            this.setState({
                arrCompany: this.props.topCompany
            })
        }

    }

    render() {
        let arrCompany = this.state.arrCompany
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
                                {arrCompany && arrCompany.length > 0
                                    && arrCompany.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.logo) {
                                            imageBase64 = new Buffer(item.logo, 'base64').toString('binary')
                                        }
                                        return (
                                            <div className="item">
                                                <div className="ow-client-logo">
                                                    <div className="client-logo client-logo-media">
                                                        <a href="#"><img src={imageBase64} alt={item.companyName} /></a>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}


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
        topCompany: state.admin.topCompany
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopCompany: () => dispatch(actions.fetchTopCompany())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
