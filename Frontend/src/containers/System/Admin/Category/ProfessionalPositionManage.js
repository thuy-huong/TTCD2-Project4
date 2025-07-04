import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { LANGUAGES } from '../../../../utils';
import { toast } from 'react-toastify'
import '../CompanyManage/FromAddCompany.scss'
import { getAllPositionService, createPositionService, editPositionService, deletePositionService } from '../../../../services/categoryService'
import ModelAddPosition from './ModelAddPosition';
import ModelEditPosition from './ModelEditPosition';

class ProfessionalPositionManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',

            originalData: [],
            data: [],
            isOpenModelAdd: false,
            errorAddNew: '',
            resetModelAddTrigger: false,

            isOpenModelEdit: false,
            positionEdit: {},
            errorEdit: '',

        }
    }
    handleFilter = (event) => {
        let filterText = event.target.value.toLowerCase();
        let { originalData } = this.state;
        let { language } = this.props;

        let filteredData = originalData.filter(item => {
            let nameToCheck = language === LANGUAGES.EN ? item.PositionNameEn : item.PositionNameVi;
            return nameToCheck.toLowerCase().includes(filterText);
        });

        this.setState({
            filterText: event.target.value,
            data: filterText ? filteredData : originalData
        });
    }

    componentDidMount() {
        this.getAllPosition()
    }
    getAllPosition = async () => {
        let res = await getAllPositionService("ALL")

        this.setState({
            originalData: res.data,
            data: res.data
        })
    }
    toggleModelAdd = () => {
        this.setState({
            isOpenModelAdd: !this.state.isOpenModelAdd,
        })
    }

    handleOpenModelAdd = () => {
        this.setState({
            isOpenModelAdd: true
        })
    }
    createNewPosition = async (data) => {

        let res = await createPositionService(data)
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success("Create new professional positionManage success!")
            this.getAllPosition()
            this.setState({
                resetModelAddTrigger: true,
                isOpenModelAdd: false,
                errorAddNew: ''
            });
        } else {
            toast.warn("Create new professional positionManage failed!")
            this.setState({
                errorAddNew: res.message
            })
        }
    }

    handleEdit = (data) => {

        this.setState({
            isOpenModelEdit: true,
            positionEdit: data,
        })
    }
    toggleModelEdit = () => {
        this.setState({
            isOpenModelEdit: !this.state.isOpenModelEdit,
        })
    }
    saveEditPosition = async (data) => {
        console.log(data)
        let res = await editPositionService(data)
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success("Update professional positionManage success!")
            this.getAllPosition()
            this.setState({
                isOpenModelEdit: false,
                errorEdit: ''
            });
        } else {
            toast.error('Update professional positionManage failed!')
            this.setState({
                errorEdit: res.errMessage
            })
        }
    }
    handleDelete = async (position) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa position "${position.PositionNameVi}"?`);

        if (!confirmDelete) return;
        console.log(position)
        try {
            let res = await deletePositionService(position.id);
            if (res && res.errCode === 0) {
                toast.success("Deleted position success!");
                this.getAllPosition();
            } else {
                toast.error(res.message || "Deleted position failed");
            }
        } catch (error) {
            console.error("Delete position error:", error);
            toast.error("Có lỗi xảy ra khi xóa position!");
        }
    }

    render() {
        let records = this.state.data;
        let customStyles = {
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
        let columns = [
            {
                name: 'Id',
                selector: row => row.id,
                sortable: true
            },
            {
                name: <FormattedMessage id='managePosition.name' />,
                selector: this.props.language === LANGUAGES.VI ? row => row.PositionNameVi : row => row.PositionNameEn,
                sortable: true
            },
            {
                name: <FormattedMessage id='manageCategory.description' />,
                selector: row => row.description,
                sortable: true
            },
            {
                name: <FormattedMessage id='managePosition.cate' />,
                selector: this.props.language === LANGUAGES.VI ? row => row.categoryData.categoryNameVi : row => row.categoryData.categoryNameEn,
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

            }
        ]
        return (
            <div className="info-data" >
                <div className='container mb-5'>
                    <div className='title text-center'> <FormattedMessage id='managePosition.title' /></div>

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <div onClick={() => this.handleOpenModelAdd()} className='btn btn-primary px-3 btn-add-new-user'>
                            <FormattedMessage id='managePosition.add' />
                        </div>
                        <input
                            type='text'
                            placeholder='Tìm theo tên...'
                            onChange={this.handleFilter}
                            value={this.state.filterText}
                            className='form-control w-auto'
                            style={{ minWidth: '250px' }}
                        />
                    </div>
                    {this.state.isOpenModelAdd &&
                        <ModelAddPosition
                            isOpen={this.state.isOpenModelAdd}
                            toggleFromParent={this.toggleModelAdd}
                            createNewPosition={this.createNewPosition}
                            resetFormTrigger={this.state.resetModelAddTrigger}
                            onResetComplete={() => this.setState({ resetModelAddTrigger: false })}
                            errorAddNew={this.state.errorAddNew}
                        />
                    }


                    {this.state.isOpenModelEdit &&
                        <ModelEditPosition
                            isOpen={this.state.isOpenModelEdit}
                            toggleFromParent={this.toggleModelEdit}
                            currentPosition={this.state.positionEdit}
                            editPosition={this.saveEditPosition}
                            errorEdit={this.state.errorEdit}
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalPositionManage);
