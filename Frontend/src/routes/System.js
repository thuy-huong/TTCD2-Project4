import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import CompanyRedux from '../containers/System/Admin/CompanyRedux'
import './System.scss'
class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    handleSidebarToggle = (visible) => {
        console.log("Giá trị sidebarVisible từ Header:", visible);
        this.setState({ visible: visible });
    };

    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        const { visible } = this.state;

        return (
            <>
                {isLoggedIn && <Header onToggleSidebar={this.handleSidebarToggle} />}

                <div className={visible ? 'system-container' : 'system-container-hide'}>

                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/company-manage" component={CompanyRedux} />
                        <Route component={() => <Redirect to={systemMenuPath} />} />
                    </Switch>

                </div>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
