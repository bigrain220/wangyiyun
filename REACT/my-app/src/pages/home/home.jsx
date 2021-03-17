import React, { Component } from 'react';
import { Table, Button } from 'antd';
import EditDialog from '../edit/edit'

// return Array of cloumns in table
function getColumns() {
    const name = ['车型code', '车型名称', '外观颜色code', '外观颜色', '内饰颜色code', '内饰颜色', '首次上牌时间', '上牌城市',
        '车牌号', '拍照类型', '车辆用途', '过户次数', '发动机号', '钥匙数量', '车辆来源', '是否新车', '在售状态', '车辆审核状态',
        '来源车辆id', '创建时间', '最后更新时间'];
    const value = Object.keys(data[0])
    const arr = [];
    name.map((item, index) => (
        arr.push({
            title: item,
            key: index + "",
            dataIndex: value[index],
            align:'center'
        })
    ))
    return arr;
}

// the dataSource of the table
const data = [
    {
        id: '2dfeff3f',
        vin: 'dfdfdfdf',
        carNumber: '1ssdsdsd',
        licensingTime: '2020-01-01',
        licensingCity: "00002",
        licensingType: "公户",
        carUsing: "营运",
        transferNumber: "efdfdsf",
        keysNumber: "3rrfer343",
        engineNumber: "ererererere",
        outColor: "黑色",
        insideColor: "黑色"
    },
    {
        id: '34fdf34',
        vin: '565656',
        carNumber: '1ssdsdsd',
        licensingTime: '2020-02-02',
        licensingCity: "00004",
        licensingType: "私户",
        carUsing: "私运",
        transferNumber: "efdfdsf",
        keysNumber: "3rrfer343",
        engineNumber: "ererererere",
        outColor: "白色",
        insideColor: "白色"
    }
]


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 100,
            current: 1,
            pageSize: 10,
            rowData: "",
            showEdit: false
        }
        this.columns = [
            {
                title: '车辆id',
                width: 100,
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
                align:'center'
            },
            {
                title: 'vin码',
                width: 100,
                dataIndex: 'vin',
                key: 'vin',
                fixed: 'left',
                align:'center'
            },
            ...getColumns(),
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                align:'center',
                width: 100,
                render: (text, record) => <div>
                    <Button type="link" onClick={() => this.editClick(text)}>编辑</Button>
                    <Button type="link">操作记录</Button>
                </div>,
            },
        ];
    };
    changePage = page => {
        this.setState({
            current: page,
        });
    };
    changeSize = (current, size) => {
        console.log(current)
        this.setState({
            current: current,
            pageSize: size,
        });
    };

    editClick = (text) => {
        this.setState({
            rowData: text,
            showEdit: true
        });
    };

//control EditDialog hide or visible
    hideDialog = () => {
        this.setState({
            showEdit: false
        });
    };


    render() {
        return (
            <div id="Home" className="page">
                <Table columns={this.columns} dataSource={data} scroll={{ x: 3000 }} 
                    rowKey="id" size="default"
                    pagination={{  // 分页
                        showSizeChanger: true,
                        showQuickJumper: true,
                        current: this.state.current,
                        total: this.state.total,
                        pageSizeOptions: ['10', '50', '100'],
                        onChange: this.changePage,
                        onShowSizeChange: this.changeSize,
                        showTotal: (total) => { return '共 ' + total + ' 条记录 第 ' + this.state.current + ' / ' + total / this.state.pageSize + '页' }
                    }}
                />
                {this.state.showEdit && <EditDialog rowData={this.state.rowData} isShow={this.state.showEdit} hideDialog={() => this.hideDialog()}></EditDialog>}
            </div>
        )

    }
}

export default Home;