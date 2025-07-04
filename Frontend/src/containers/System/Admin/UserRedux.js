import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';


class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // filterText: '',
            columns: [
                {

                    name: (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Tên
                            <span role="img" aria-label="filter">🔍</span> {/* icon filter tuỳ chỉnh */}
                        </div>
                    ),
                    selector: row => row.name,
                    sortable: true

                },
                {
                    name: "Email",
                    selector: row => row.email

                },
                {
                    name: 'Age',
                    selector: row => row.age
                }, {
                    name: 'Action',
                    cell: (row) => (
                        <div className=''>
                            <button
                                onClick={() => this.handleEdit(row)}
                                style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}
                            >
                                Sửa
                            </button>
                            <button
                                onClick={() => this.handleDelete(row)}
                                style={{ padding: '4px 8px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px' }}
                            >
                                Xoá
                            </button>
                        </div>
                    ),
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true
                }
            ],
            originalData: [
                {
                    id: 1,
                    name: "ABC",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 2,
                    name: "BCD",
                    email: "acb@gmail.com",
                    age: 10
                },
                {
                    id: 3,
                    name: "CDE",
                    email: "cde@gmail.com",
                    age: 10
                },
                {
                    id: 4,
                    name: "DEF",
                    email: "efg@gmail.com",
                    age: 10
                },
                {
                    id: 5,
                    name: "EFG",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 6,
                    name: "FGH",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 1,
                    name: "ABC",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 2,
                    name: "BCD",
                    email: "acb@gmail.com",
                    age: 10
                },
                {
                    id: 3,
                    name: "CDE",
                    email: "cde@gmail.com",
                    age: 10
                },
                {
                    id: 4,
                    name: "DEF",
                    email: "efg@gmail.com",
                    age: 10
                },
                {
                    id: 5,
                    name: "EFG",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 6,
                    name: "FGH",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 3,
                    name: "CDE",
                    email: "cde@gmail.com",
                    age: 10
                },
                {
                    id: 4,
                    name: "DEF",
                    email: "efg@gmail.com",
                    age: 10
                },
                {
                    id: 5,
                    name: "EFG",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 6,
                    name: "FGH",
                    email: "abc@gmail.com",
                    age: 10
                },
            ],
            data: [
                {
                    id: 1,
                    name: "ABC",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 2,
                    name: "BCD",
                    email: "acb@gmail.com",
                    age: 10
                },
                {
                    id: 3,
                    name: "CDE",
                    email: "cde@gmail.com",
                    age: 10
                },
                {
                    id: 4,
                    name: "DEF",
                    email: "efg@gmail.com",
                    age: 10
                },
                {
                    id: 5,
                    name: "EFG",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 6,
                    name: "FGH",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 1,
                    name: "ABC",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 2,
                    name: "BCD",
                    email: "acb@gmail.com",
                    age: 10
                },
                {
                    id: 3,
                    name: "CDE",
                    email: "cde@gmail.com",
                    age: 10
                },
                {
                    id: 4,
                    name: "DEF",
                    email: "efg@gmail.com",
                    age: 10
                },
                {
                    id: 5,
                    name: "EFG",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 6,
                    name: "FGH",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 3,
                    name: "CDE",
                    email: "cde@gmail.com",
                    age: 10
                },
                {
                    id: 4,
                    name: "DEF",
                    email: "efg@gmail.com",
                    age: 10
                },
                {
                    id: 5,
                    name: "EFG",
                    email: "abc@gmail.com",
                    age: 10
                },
                {
                    id: 6,
                    name: "FGH",
                    email: "abc@gmail.com",
                    age: 10
                },
            ]
        }
    }

    componentDidMount() {
    }
    handleFilter = (event) => {
        const keyword = event.target.value.toLowerCase();
        const filtered = this.state.originalData.filter(row =>
            row.name.toLowerCase().includes(keyword)
        );
        this.setState({
            filterText: keyword,
            data: filtered
        });
    };
    handleEdit = (row) => {
        console.log("Sửa:", row);
        // TODO: Mở form sửa hoặc xử lý tùy ý
    };

    handleDelete = (row) => {
        console.log("Xoá:", row);
        // TODO: Hiển thị xác nhận và xoá row
    };
    render() {
        const records = this.state.data;
        const customStyles = {
            headRow: {
                style: {
                    backgroundColor: '#0d6efd', // Màu nền tiêu đ
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
        return (

            <div className="info-data" >
                <div className='container'>
                    <div className='title text-center'>Manage user using redux</div>
                    <div className='container mb-5'>
                        <div className='text-end'><input
                            type='text'
                            placeholder='Tìm theo tên...'
                            onChange={this.handleFilter}
                            value={this.state.filterText}
                        /> </div>
                        <DataTable
                            columns={this.state.columns}
                            data={records}
                            customStyles={customStyles}
                            fixedHeader
                            pagination
                        ></DataTable>
                    </div>
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
