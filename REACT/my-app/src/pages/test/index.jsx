import React, { Component } from 'react';
import { connect } from '@souche-f2e/muji';
import PageWrapper from '@/components/PageWrapper';
import DescriptionList from '@/components/DescriptionList';
import { Card, Input, Spin, Tag, Tooltip, Empty, Divider, Select, Table, Button } from 'antd';
import { dispatch } from '@@/store';
import styles from './index.less';
import CarDataManageEditor from './CarDataManageEditor';
import createAPI from '@/shared/createAPI';

const { Search } = Input;
const api = createAPI(process.env.MUJI_APP_TITAN_HOST, {
  showNotification: false,
});

function getColumns() {
  const name = ['车型code', '车型名称', '外观颜色code', '外观颜色', '内饰颜色code', '内饰颜色', '首次上牌时间', '上牌城市',
    '车牌号', '牌照类型', '车辆用途', '过户次数', '发动机号', '钥匙数量', '车辆来源', '是否新车', '在售状态', '车辆审核状态',
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
    // carId: '',
    // vin: '',
    modeCode: '',
    modeName: '',
    colorCode: '',
    color: '',
    innerColorCode: '',
    innerColor: '',
    firstLicensePlateDate: '',
    registerCityName: '',
    //registerCityCode: '',
    plateNumber: '',
    ownershipDesc: '',
    useTypeDesc: '',
    transferTotal: '',
    engineNumber: '',
    keysCount: '',
    sourceName: '',
    isNewCarDesc: '',
    statusDesc: '',
    secLeaseStatusDesc: '',
    originCarId: '',
    dateCreate: '',
    dateUpdate: ''
  }
];

var inputValue = '';

class SearchPage extends Component {
  search(value){
    inputValue = value;
    dispatch.carmanage.search(value);
  }

  download(value){
    // const downloadUrl = api.getJSON(`/api/car/data/downloadCarInfo?carIdOrVin=TEST2006081629424`);
    // window.open(encodeURIComponent(downloadUrl));
    const downloadUrl = `/api/car/data/downloadCarInfo?carIdOrVin=${encodeURIComponent(inputValue)}`;
    window.open(downloadUrl);
  }

  constructor(props) {
    super(props);
    this.state = {
      total: 100,
      current: 1,
      pageSize: 10,
      rowData: "",
      showEdit: false,
      data: [],
      inputValue:""
    }
    this.columns = [
      {
        title: '车辆id',
        width: 100,
        dataIndex: 'carId',
        key: 'carId',
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
          <Button type="link" onClick={() => this.editClick(record)}>编辑</Button>
          <Button  type={"link"} href={`#/car_data_manage/trace?carId=${record.carId}`}>

            操作记录</Button>
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

//control CarDataManageEditor hide or visible
  hideDialog = () => {
    this.setState({
      showEdit: false
    });
  };


  render() {
    return (
      <div id="Home" className="page">
        <Search
          placeholder="请输入车辆ID/vin码,输入多个时,请用换行分割"
          onSearch={this.search}
          enterButton="Search"
          size="large"
          className={styles.search}
        />
        <button onClick={this.download}>
          导出
        </button>
        <br/>
        <br/>
        <br/>
        <Table columns={this.columns} dataSource={this.props.carmanage.data} scroll={{ x: 3000 }}
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
        {this.state.showEdit && <CarDataManageEditor rowData={this.state.rowData} visible={this.state.showEdit} hideDialog={() => this.hideDialog()}></CarDataManageEditor>}
      </div>
    );
  }
}
const mapStateToProps = (rootState) => {
  return {
    search: rootState.search,
    carmanage: rootState.carmanage
  }
}
export default connect(mapStateToProps)(SearchPage);
