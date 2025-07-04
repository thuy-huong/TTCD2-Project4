import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import './Header.scss';
import { LANGUAGES } from '../../utils'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'; // Nhập Link
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDropdown: null,
            sidebarVisible: true,
            profileDropdownVisible: false,
        };
    }

    toggleDropdown = (index) => {
        this.setState(prevState => ({
            activeDropdown: prevState.activeDropdown === index ? null : index
        }));
    };

    toggleSidebar = () => {
        this.setState(prevState => {
            const newSidebarVisible = !prevState.sidebarVisible;

            // Gửi giá trị mới lên component cha
            if (this.props.onToggleSidebar) {
                this.props.onToggleSidebar(newSidebarVisible);
            }

            return { sidebarVisible: newSidebarVisible };
        });
    };

    toggleProfileDropdown = () => {
        this.setState(prevState => ({
            profileDropdownVisible: !prevState.profileDropdownVisible
        }));


    };

    // handleClickOutside = (e) => {
    //     const { profileDropdownVisible } = this.state;
    //     const profileLink = document.querySelector('.profile-link');

    //     if (profileDropdownVisible && !profileLink.contains(e.target)) {
    //         this.setState({ profileDropdownVisible: false });
    //     }
    // };

    componentDidMount() {
        window.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside);
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const { processLogout, language } = this.props;
        const { sidebarVisible, profileDropdownVisible } = this.state;
        let userInfo = this.props.userInfo
        return (
            <>

                <section id="sidebar" className={sidebarVisible ? '' : 'hide'} >
                    <Link to="#" className="brand"><i className="fa fa-smile icon" aria-hidden="true"></i>  <FormattedMessage id="AdminHeader.adminSite" /></Link>
                    <ul className="side-menu">
                        <li><Link to="#" className="active"><i className="fa fa-th icon" aria-hidden="true"></i> <FormattedMessage id="AdminHeader.dashboard" /></Link></li>
                        <li className="divider" data-text="main">Main</li>

                        {/* <li>
                            <Link to="#" onClick={() => this.toggleDropdown(1)}
                                className={activeDropdown === 1 ? 'active' : ''} >
                                <i className="fa fa-user icon" aria-hidden="true"></i>
                                <FormattedMessage id="menu.admin.user" />
                                <i className='fa fa-chevron-right icon-right'></i>
                            </Link>
                            {activeDropdown === 1 && (
                                <ul className="menu-dropdown">
                                    <li><Link to="/system/user-manage">user manage</Link></li>
                                    <li><Link to="/system/user-redux">user redux</Link></li>
                                </ul>
                            )}
                        </li> */}
                        <Navigator menus={adminMenu} />
                        {/* <li className="divider" data-text="main"> <FormattedMessage id="AdminHeader.settings" /></li> */}
                        <li> <a><i className='fa fa-user-circle icon'></i> <FormattedMessage id="AdminHeader.profile" /></a></li>
                        <li> <a><i className='fa fa-cog icon'></i> <FormattedMessage id="AdminHeader.settings" /></a></li>
                        <li> <a><i className="fa fa-question-circle icon" aria-hidden="true"></i> <FormattedMessage id="AdminHeader.help" /></a></li>
                        <li onClick={processLogout}> <Link to="#"><i className='fas fa-sign-out-alt icon' ></i> <FormattedMessage id="AdminHeader.logout" /></Link></li>
                    </ul>

                </section>

                <section id="content">
                    <nav>
                        <i className="fa fa-bars toggle-sidebar" onClick={this.toggleSidebar} aria-hidden="true"></i>
                        <form action="#">
                            <div className="form-group">
                                <input type="text" placeholder="Search..." />
                                <i className="fa fa-search icon" aria-hidden="true"></i>
                            </div>
                        </form>
                        <div className="profile" >
                            <span onClick={this.toggleProfileDropdown} ><FormattedMessage id="AdminHeader.welcome" /> {userInfo && userInfo.fullName ? userInfo.fullName : ''}!</span>
                            <ul className={`profile-link ${profileDropdownVisible ? 'show' : ''}`}>

                                <li><a href="#"><i className='fa fa-user-circle icon'></i> <FormattedMessage id="AdminHeader.profile" /></a></li>
                                <li><a href="#"><i className='fa fa-cog'></i> <FormattedMessage id="AdminHeader.settings" /></a></li>
                                <li>
                                    <a onClick={processLogout}>
                                        <i className='fas fa-sign-out-alt icon' ></i> <FormattedMessage id="AdminHeader.logout" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="nav-link">
                            <i className='fa fa-bell icon'></i>
                            <span className="badge">5</span>
                        </div>
                        <div className="nav-link">
                            <i className="fa fa-comments icon" aria-hidden="true"></i>
                            <span className="badge">8</span>
                        </div>
                        <div className='nav-link'>
                            <span className={`language-vn ${language === LANGUAGES.VI ? 'active' : ''}`} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VI</span>
                            <span className={`language-en ${language === LANGUAGES.EN ? 'active' : ''}`} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                        </div>
                    </nav>

                    <main>
                        {/* <h1 className="title">Dashboard</h1> */}
                        <ul className="breadcrumbs">
                            <li><a href="#">Home</a></li>
                            <li className="divider">/</li>
                            <li><a href="#" className="active">Dashboard</a></li>
                        </ul>
                    </main>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
});

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);