import './edit.css';
import React, { Component } from 'react'
import { Modal, Input, DatePicker, Select, Button } from 'antd';
import { Row, Col } from 'antd';
import moment from 'moment';


const { Option } = Select;
const { confirm } = Modal;

//edit-dialog's each label of item
const labels = [
    {
        label: "车辆id",
        placeholder: '请输入车辆id',
        prop: 'id',
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
        prop: 'carNumber',
        type: 'input'
    },
    {
        label: "上牌时间",
        placeholder: '请选择上牌时间',
        prop: 'licensingTime',
        type: 'date'
    },
    {
        label: "上牌城市",
        placeholder: '请选择上牌城市',
        prop: 'licensingCity',
        type: 'select',
        serach: true
    },
    {
        label: "牌照类型",
        placeholder: '请选择牌照类型',
        prop: 'licensingType',
        type: 'select',
        serach: false
    },
    {
        label: "车辆用途",
        placeholder: '请选择车辆用途',
        prop: 'carUsing',
        type: 'select',
        serach: false
    },
    {
        label: "过户次数",
        placeholder: '请输入过户次数',
        prop: 'transferNumber',
        type: 'input'
    },
    {
        label: "钥匙数量",
        placeholder: '请输入钥匙数量',
        prop: 'keysNumber',
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
        prop: 'outColor',
        type: 'select',
        serach: false
    },
    {
        label: "内饰颜色",
        placeholder: '请选择内饰颜色',
        prop: 'insideColor',
        type: 'select',
        serach: false
    }
]
//all the options of the select
const selectOptions = [
    {
        name: 'licensingType',
        data: [
            { value: '公户', text: '公户' },
            { value: '私户', text: '私户' }
        ]
    },
    {
        name: 'carUsing',
        data: [
            { value: '营运', text: '营运' },
            { value: '非营运', text: '非营运' }
        ]
    },
    {
        name: 'outColor',
        data: [
            { value: '黑色', text: '黑色' },
            { value: '白色', text: '白色' }
        ]
    },
    {
        name: 'insideColor',
        data: [
            { value: '黑色', text: '黑色' },
            { value: '白色', text: '白色' }
        ]
    },
    {
        name: 'licensingCity',
        data: [
            { value: '00002', text: '北京市' },
            { value: '00003', text: '天津市' },
            { value: '00004', text: '深圳市' }
        ]
    }
]




//functions to get selectoptions by name
function getOptions(value) {
    let res = selectOptions.find(x => x.name === value);
    return res.data ? res.data : [];
}



class EditDialog extends Component {
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

    resetFrom = () => {
        this.setState({
            formData: this.props.rowData
        });
    };

    handleCancel = () => {
        this.props.hideDialog()
        this.setState({ visible: false });
    };

    okEvent = () => {
        //final results,which is going to submit
        console.log(this.state.formData, 'sure');
        console.log(this.state.visible, 'visible')
        this.setState({ visible: false });
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

    render() {
        const { visible, loading } = this.state
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
                        <Button key="rest" type="dashed" loading={loading} onClick={this.resetFrom}>
                            重置
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
                                                            getOptions(item.prop).map((item1, i) => {
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
        )
    }
    componentDidMount() {
        // console.log(this.props.rowData);
        this.setState({
            visible: this.props.isShow,
            formData: this.props.rowData
        });
    }



}
export default EditDialog;