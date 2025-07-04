import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { LANGUAGES } from '../../../../utils';
import { toast } from 'react-toastify'
import '../CompanyManage/FromAddCompany.scss'
import { getAllCategoryService, createCategoryService, editCategoryService, deleteCategoryService } from '../../../../services/categoryService'
import ModelAddCategory from './ModelAddCategory';
import ModelEditCategory from './ModelEditCategory';


class CategoryManage extends Component {
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
            categoryEdit: {},
            errorEdit: '',

        }
    }
    handleFilter = (event) => {
        let filterText = event.target.value.toLowerCase();
        let { originalData } = this.state;
        let { language } = this.props;

        let filteredData = originalData.filter(item => {
            let nameToCheck = language === LANGUAGES.EN ? item.categoryNameEn : item.categoryNameVi;
            return nameToCheck.toLowerCase().includes(filterText);
        });

        this.setState({
            filterText: event.target.value,
            data: filterText ? filteredData : originalData
        });
    }

    componentDidMount() {
        this.getAllCategory()
    }
    getAllCategory = async () => {
        let res = await getAllCategoryService("ALL")

        this.setState({
            originalData: res.data,
            data: res.data
        })
    }
    toggleModelAddCategory = () => {
        this.setState({
            isOpenModelAdd: !this.state.isOpenModelAdd,
        })
    }

    handleOpenModelAdd = () => {
        this.setState({
            isOpenModelAdd: true
        })
    }
    createNewCategory = async (data) => {
        let res = await createCategoryService(data)
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success("Create new category success!")
            this.getAllCategory()
            this.setState({
                resetModelAddTrigger: true,
                isOpenModelAdd: false,
                errorAddNew: ''
            });
        } else {
            toast.warn("Create new category failed!")
            this.setState({
                errorAddNew: res.message
            })
        }
    }

    handleEdit = (data) => {
        this.setState({
            isOpenModelEdit: true,
            categoryEdit: data,
        })
    }
    toggleModelEditCategory = () => {
        this.setState({
            isOpenModelEdit: !this.state.isOpenModelEdit,
        })
    }
    saveEditCategory = async (data) => {
        let res = await editCategoryService(data)
        console.log(res)
        if (res && res.errCode === 0) {
            toast.success("Update category success!")
            this.getAllCategory()
            this.setState({
                isOpenModelEdit: false,
                errorEdit: ''
            });
        } else {
            toast.warn('Update category failed!')
            this.setState({
                errorEdit: res.errMessage
            })
        }
    }
    handleDelete = async (category) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa category "${category.categoryNameVi}"?`);

        if (!confirmDelete) return;

        try {
            let res = await deleteCategoryService(category.id);
            if (res && res.errCode === 0) {
                toast.success("Deleted category success!");
                this.getAllCategory();
            } else {
                toast.error(res.message || "Deleted category failed");
            }
        } catch (error) {
            console.error("Delete category error:", error);
            toast.error("Có lỗi xảy ra khi xóa category!");
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
                name: <FormattedMessage id='manageCategory.name' />,
                selector: this.props.language === LANGUAGES.VI ? row => row.categoryNameVi : row => row.categoryNameEn,
                sortable: true
            },
            {
                name: <FormattedMessage id='manageCategory.description' />,
                selector: row => row.description,
                sortable: true
            },
            {
                name: <FormattedMessage id='manageCategory.professionNumber' />,
                selector: row => row.ProfessionalPositions?.length || 0,
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
                    <div className='title text-center'>Manage user using redux</div>

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <div onClick={() => this.handleOpenModelAdd()} className='btn btn-primary px-3 btn-add-new-user'>
                            Add new category
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
                        <ModelAddCategory
                            isOpen={this.state.isOpenModelAdd}
                            toggleFromParent={this.toggleModelAddCategory}
                            createNewCategory={this.createNewCategory}
                            resetFormTrigger={this.state.resetModelAddTrigger}
                            onResetComplete={() => this.setState({ resetModelAddTrigger: false })}
                            errorAddNew={this.state.errorAddNew}
                        />
                    }
                    {this.state.isOpenModelEdit &&
                        <ModelEditCategory
                            isOpen={this.state.isOpenModelEdit}
                            toggleFromParent={this.toggleModelEditCategory}
                            currentCategory={this.state.categoryEdit}
                            editCategory={this.saveEditCategory}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
