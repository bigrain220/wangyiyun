import React, { Component } from 'react';
import { connect } from '@souche-f2e/muji';
import PageWrapper from '@/components/PageWrapper';
import DescriptionList from '@/components/DescriptionList';
import { Card, Input, Spin, Tag, Tooltip, Empty, Divider, Select, Modal, Button, Row, Col, DatePicker } from 'antd';
import { dispatch } from '@@/store';
import styles from './index.less';
import moment from 'moment';
import searchAPI from '@/services/carmanage';

const { Search } = Input;

const { Option } = Select;
const { confirm } = Modal;

//edit-dialog's each label of item
const labels = [
  {
    label: "车辆id",
    placeholder: '请输入车辆id',
    prop: 'carId',
    type: 'input',
    disabled: true
  },
  {
    label: "vin码",
    placeholder: '请输入vin码',
    prop: 'vin',
    type: 'input',
    disabled: true
  },
  {
    label: "车牌号",
    placeholder: '请输入车牌号',
    prop: 'plateNumber',
    type: 'input'
  },
  {
    label: "上牌时间",
    placeholder: '请选择上牌时间',
    prop: 'firstLicensePlateDate',
    type: 'date'
  },
  {
    label: "上牌城市",
    placeholder: '请选择上牌城市',
    prop: 'registerCityName',
    type: 'select',
    selectName:"cityVOList",
    serach:true
  },
  // {
  //   label: "牌照类型",
  //   placeholder: '请选择牌照类型',
  //   prop: 'ownership',
  //   type: 'select',
  //   serach:false
  // },
  // {
  //   label: "车辆用途",
  //   placeholder: '请选择车辆用途',
  //   prop: 'useType',
  //   type: 'select',
  //   serach:false
  // },
  {
    label: "过户次数",
    placeholder: '请输入过户次数',
    prop: 'transferTotal',
    type: 'input'
  },
  {
    label: "钥匙数量",
    placeholder: '请输入钥匙数量',
    prop: 'keysCount',
    type: 'input'
  },
  {
    label: "发动机号",
    placeholder: '请输入发动机号',
    prop: 'engineNumber',
    type: 'input'
  },
  {
    label: "外观颜色",
    placeholder: '请选择外观颜色',
    prop: 'color',
    type: 'select',
    selectName:"colorMap",
    serach:false
  },
  {
    label: "内饰颜色",
    placeholder: '请选择内饰颜色',
    prop: 'innerColor',
    type: 'select',
    selectName:"innerColorMap",
    serach:false
  }
]





class CarDataManageEditor extends Component {
  search(value) {
    dispatch.search.search(value);
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      formData: ""
    }
  }

  showConfirm = () => {
    var that = this;
    confirm({
      title: '是否确认提交修改?',
      onOk() {
        // console.log('OK');
        that.okEvent();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCancel = () => {
    this.props.hideDialog()
    this.setState({ visible: false });
  };

  okEvent = (value) => {
    //final results,which is going to submit
    console.log(this.state.formData, 'sure');
    searchAPI.updateCarInfo(this.state.formData);
    //searchAPI.search("TEST2006081629424");
    //this.state.visible = false;
  }

  updateData = (prop, value) => {
    const obj = {};
    obj[prop] = value;
    const formData = Object.assign({}, this.state.formData, obj);
    this.setState({
      formData: formData
    });
  }
  input_change = (prop, e) => {
    // console.log(prop,e.target.value)
    this.updateData(prop, e.target.value)
  }

  select_change = (prop, value) => {
    // console.log(prop,value);
    this.updateData(prop, value)
  }

  date_change = (prop, date, dateString) => {
    // console.log(prop,dateString);
    this.updateData(prop, dateString)
  }

  getSelectOtions=()=>{
    const selectArr=['colorMap','innerColorMap','cityVOList'];//这里填你需要用到的selectName，selectName和你接口的键值一样
    const options=[];
    selectArr.forEach((item,index)=>{
      let obj={
        name:item,
        data:this.props.rowData[item]
      };
      options.push(obj)
    })
    return options
  }

  getOptions=(value)=>{
    const options= this.getSelectOtions();
    let res = options.find(x => x.name === value);
    let results=[];
    if(res.data){
      if(Object.prototype.toString.call(res.data)=='[object Object]'){
          Object.keys(res.data).forEach(item=>{
            results.push(
              {
                value:res.data[item],
                text:item,
              }
            )
          })
      }else if(Object.prototype.toString.call(res.data)=='[object Array]'){
        //如果返回值是数组,把需要的参数传入函数
        results = this.optionsByArr(res.data,{value:'soucheCode',text:"name"})
      }
    }
    return results;
  }

  optionsByArr(data,params){
    let arr = [];
    data.forEach(item=>{
        arr.push(
          {
            value:item[params.value],
            text:item[params.text]
          }
        )
    });
    return arr;
  }

  render() {
    const { visible, loading } = this.props
    console.info(this.props.rowData.colorList)
    return (
      <div>
        <Modal
          title="修改车辆基础信息"
          visible={visible}
          width="70vw"
          wrapClassName="edit-modal"
          onCancel={this.handleCancel}
          // destroyOnClose
          footer={[
            <Button key="submit" type="primary" loading={loading} onClick={this.showConfirm}>
              提交
            </Button>,
            <Button key="back" onClick={this.handleCancel} >
              取消
            </Button>,
          ]}
        >
          <div className="edit-form">
            <Row gutter={48}>
              {
                labels.map((item, index) => {
                  if (item.type === 'input') {
                    return (
                      <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                        <div className="item" key={index}>
                          <div className="label">{item.label}：</div><Input disabled={item.disabled} placeholder={item.placeholder}
                                                                           defaultValue={this.props.rowData[item.prop]} onChange={this.input_change.bind(this, item.prop)} />
                        </div>
                      </Col>
                    )
                  } else if (item.type === 'select') {
                    return (
                      <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                        <div className="item" key={index}>
                          <div className="label">{item.label}：</div>
                          <Select defaultValue={this.props.rowData[item.prop]} style={{ width: 220 }} showSearch={item.serach} optionFilterProp="children"
                                  placeholder="请选择" onChange={this.select_change.bind(this, item.prop)}>
                            {
                              this.getOptions(item.selectName).map((item1, i) => {
                                console.info("item.prop:" + item.prop + ";item:" + item1 + ";itemValue:" + item1.value)
                                return (
                                  <Option value={item1.value} key={i}>{item1.text}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                      </Col>
                    )
                  } else if (item.type === 'date') {
                    return (
                      <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                        <div className="item" key={index}>
                          <div className="label">{item.label}：</div><DatePicker onChange={this.date_change.bind(this, item.prop)}
                                                                                defaultValue={moment(this.props.rowData[item.prop], 'YYYY-MM-DD')} />
                        </div>
                      </Col>
                    )
                  } else {
                    return ""
                  }
                })
              }
            </Row>
          </div>

        </Modal>
      </div>
    );
  }

  componentDidMount() {
    // console.log(this.props.rowData);
    this.setState({
      visible: this.props.isShow,
      formData: this.props.rowData,
    });
  }
}

export default connect((store) => store.carmanage)(CarDataManageEditor);
