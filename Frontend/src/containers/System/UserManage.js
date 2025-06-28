import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUSerService } from '../../services/userSevice'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })

        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModel = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditUserModel = () => {
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }

        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (userId) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = (user) => {

        this.setState({
            isOpenEditModalUser: true,
            userEdit: user
        })
    }

    saveEditUser = async (user) => {
        try {
            let res = await editUSerService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditModalUser: false
                })
            } else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }

    }
    render() {
        let arrUsers = this.state.arrUsers
        return (
            < div className="info-data" >
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModel}
                    createNewUser={this.createNewUser} />
                {this.state.isOpenEditModalUser &&
                    <ModalEditUser isOpen={this.state.isOpenEditModalUser}
                        toggleFromParent={this.toggleEditUserModel}
                        currentUser={this.state.userEdit}
                        editUser={this.saveEditUser}
                    />
                }

                <div className='title text-center'>Manage user</div>

                <div className='container'>
                    <div className='py-3'>
                        <button className='btn btn-primary px-3 btn-add-new-user'
                            onClick={() => this.handleAddNewUser()}
                        >Add new user</button>
                    </div>
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
                                            <td>{item.isActive ? 'Active' : 'UnActive'}</td>
                                            <td>
                                                <button className="btn-edit" type="button" onClick={() => this.handleEditUser(item)}>
                                                    <i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" type="button" onClick={() => this.handleDeleteUser(item.id)}>
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
