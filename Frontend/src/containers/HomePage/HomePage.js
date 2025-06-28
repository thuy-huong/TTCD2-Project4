import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import WorkingProcess from './Section/WorkingProcess'
import JobsCategories from './Section/JobsCategories'
import Footer from './Section/Footer'
import Companies from './Section/Companies';

class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader />
                <div className='page-content'>
                    <WorkingProcess />
                    <JobsCategories />
                    <Companies />

                </div>
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
