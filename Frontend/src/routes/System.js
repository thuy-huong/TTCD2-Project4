import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Admin/UserManage/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import FromAddCompany from '../containers/System/Admin/CompanyManage/FromAddCompany';
import TableCompanyManage from '../containers/System/Admin/CompanyManage/TableCompanyManage';
import './System.scss'
import CategoryManage from '../containers/System/Admin/Category/CategoryManage';
import ProfessionalPositionManage from '../containers/System/Admin/Category/ProfessionalPositionManage';

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
                        <Route path="/system/company-manage" component={TableCompanyManage} />
                        <Route path="/system/add-company" component={FromAddCompany} />
                        <Route path="/system/category-manage" component={CategoryManage} />
                        <Route path="/system/professional-position-manage" component={ProfessionalPositionManage} />
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
