import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { getAllCompanyService, deleteCompanyService } from '../../../../services/companyService';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { LANGUAGES } from '../../../../utils';
import { toast } from 'react-toastify'
import ModalEditCompany from './ModalEditCompany';
import { editComponyService } from '../../../../services/companyService'


class TableCompanyManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',

            originalData: [],
            data: [],
            isOpenModalEditCompany: false,
            companyEdit: {},
        }
    }

    componentDidMount() {
        this.getAllCompany()
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.sizes !== this.props.sizes) {
    //         this.setState({
    //             sizeArr: this.props.sizes
    //         })
    //     }

    // }


    getAllCompany = async () => {
        let res = await getAllCompanyService("ALL")
        if (res && res.errCode === 0) {

            this.setState({
                originalData: res.company,
                data: res.company
            })

        }

    }

    handleFilter = (event) => {
        const keyword = event.target.value.toLowerCase();
        const filtered = this.state.originalData.filter(row =>
            row.companyName.toLowerCase().includes(keyword)
        );
        this.setState({
            filterText: keyword,
            data: filtered
        });
    };
    handleEdit = (row) => {
        console.log('cehck trước khi dửa', row)
        this.setState({
            isOpenModalEditCompany: true,
            companyEdit: row,
        })

    };

    handleDelete = async (row) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xoá công ty "${row.companyName}" không?`);
        if (confirmDelete) {
            let res = await deleteCompanyService(row.id)
            if (res && res.errCode === 0) {
                toast.success("Delete company success! ")
                this.getAllCompany()
            } else {
                toast.warn("Delete company Failed! ")
            }
        }
    };


    toggleEditCompanyModel = () => {
        this.setState({
            isOpenModalEditCompany: !this.state.isOpenModalEditCompany,
        })
    }
    saveEditCompany = async (company) => {
        try {
            console.log("cehck trước khi lưu ", company)
            let res = await editComponyService(company)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditCompany: false
                })
                this.getAllCompany()
                toast.success("Update user success! ")
            } else {
                toast.warn("Update user Failed! ", res.message)
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        const records = this.state.data;
        const customStyles = {
            headRow: {
                style: {
                    backgroundColor: '#1775F1', // Màu nền tiêu đ
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
            rows: {
                style: {
                    minHeight: '48px',
                    '&:hover': {
                        backgroundColor: '#f0f8ff', // Màu nền khi hover
                        cursor: 'pointer',
                    },
                },
            },
            headCells: {
                style: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    color: 'white',
                },
            },
            cells: {
                style: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                },
            },
        };
        const columns = [
            {
                name:
                    <FormattedMessage id='manageCompany.name' />,
                selector: row => row.companyName,
                sortable: true
            },
            {
                name: <FormattedMessage id='manageCompany.industry' />,
                selector: row => row.industry,
                sortable: true
            },
            {
                name: < FormattedMessage id='manageCompany.size' />,
                selector: this.props.language === LANGUAGES.VI ? row => row.sizeData.valueVi : row => row.sizeData.valueEn,
            },
            {
                name: <FormattedMessage id='manageCompany.address' />,
                selector: row => row.address,
                sortable: true
            },
            {
                name: '',
                cell: (row) => (
                    <div className='btn-action'>
                        <button className='btn-edit'
                            onClick={() => this.handleEdit(row)}
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                            className='btn-delete'
                            onClick={() => this.handleDelete(row)}

                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true
            }
        ]
        return (

            <div className="info-data" >
                <div className='container mb-5'>
                    <div className='title text-center'>Manage user using redux</div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        {this.state.isOpenModalEditCompany &&
                            <ModalEditCompany isOpen={this.state.isOpenModalEditCompany}
                                toggle={this.toggleEditCompanyModel}
                                currentCompany={this.state.companyEdit}
                                editCompany={this.saveEditCompany}
                            />
                        }
                        <Link to='/system/add-company' className='btn btn-primary px-3 btn-add-new-user'>
                            <FormattedMessage id='manageCompany.add' />
                        </Link>
                        <input
                            type='text'
                            placeholder='Tìm theo tên...'
                            onChange={this.handleFilter}
                            value={this.state.filterText}
                            className='form-control w-auto'
                            style={{ minWidth: '250px' }}
                        />
                    </div>



                    <DataTable
                        columns={columns}
                        data={records}
                        customStyles={customStyles}
                        fixedHeader
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: 'Số dòng mỗi trang:',
                            rangeSeparatorText: 'trên',
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Tất cả',
                        }}
                    />

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCompanyManage);
