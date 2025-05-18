import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userSevice'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })

        }
    }


    render() {
        let arrUsers = this.state.arrUsers
        return (
            < div className="users-containers" >
                <div className='title text-center'>Manage user</div>
                <div className='container'>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr className='table-success'>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Full name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{item.id} </th>
                                            <td>{item.email}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.isActive ? 'Active' : 'Unactive'}</td>
                                            <td>
                                                <button className="btn-edit" type="button">
                                                    <i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" type="button">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
