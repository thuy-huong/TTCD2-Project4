import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUSerService } from '../../../../services/userSevice'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../../../utils/emitter'
import { toast } from 'react-toastify'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {},
            resAddUser: {},
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
                toast.warn("Create user failed! ")

            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
                toast.success("Create user success! ")
            }
            this.setState({
                resAddUser: response
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (user) => {
        let confirmDelete = window.confirm(`Bạn có chắc chắn muốn xoá công ty "${user.fullName}" không?`);
        if (confirmDelete) {
            try {
                let res = await deleteUserService(user.id)
                if (res && res.errCode === 0) {
                    toast.success("Delete user success! ")
                    await this.getAllUsersFromReact()
                } else {
                    toast.warn("Delete user Failed! ")
                }
            } catch (error) {
                console.log(error)
            }
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
                toast.success("Update user success! ")
            } else {
                toast.warn("Update user Failed! ", res.message)
            }
        } catch (error) {
            console.log(error)
        }

    }
    render() {
        let arrUsers = this.state.arrUsers

        return (
            < div className="info-data" >
                <div className='container'>
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleFromParent={this.toggleUserModel}
                        createNewUser={this.createNewUser}
                        resAddUser={this.state.resAddUser}
                    />
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
                                                    <button className="btn-delete" type="button" onClick={() => this.handleDeleteUser(item)}>
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
