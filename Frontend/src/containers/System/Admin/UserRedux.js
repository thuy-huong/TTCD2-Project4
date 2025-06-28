import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="info-data" >
                <div className='title text-center'>Manage user using redux</div>
                <div className='container'>
                    oki
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
