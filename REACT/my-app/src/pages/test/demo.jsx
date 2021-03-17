import React, { Component } from 'react';
import { connect } from '@souche-f2e/muji';
import PageWrapper from '@/components/PageWrapper';
import DescriptionList from '@/components/DescriptionList';
import { Card, Input, Spin, Tag, Tooltip, Empty, Divider } from 'antd';
import { dispatch } from '@@/store';
import styles from './index.less';

const { Search } = Input;

const sourceMapping = {
  'souche_entering': '大风车',
  'app_entering': '大风车',
  'cheniu': '车牛',
  'tangeche': '弹个车再弹',
  'lease-item': '弹个车新车',
  'paimai': '拍卖',
  'autcion': '拍卖'
}

const statusMapping = {
  0: '删除',
  1: '草稿',
  2: '待审核',
  3: '审核通过',
  4: '审核不通过',
  5: '在售',
  6: '已售',
  7: '退库',
  8: '退货',
  9: '下架'
}

const orderStatusMapping = {
  2: '初始化',
  5: '预定',
  8: '交易完成',
  10: '订单取消'
}

class SearchPage extends Component {
  search(value) {
    dispatch.search.search(value);
  }


  render() {
    const { className, style, data, loading } = this.props;
    const labels = [{
      label: '品牌',
      render: (text, record) => {
        return <Tooltip placement="top" title={record.brandCode}>{record.brandName}</Tooltip>;
      }
    }, {
      label: '车系',
      render: (text, record) => {
        return <Tooltip placement="top" title={record.seriesCode}>{record.seriesName}</Tooltip>;
      }
    }, {
      label: '车型',
      render: (text, record) => {
        return <Tooltip placement="top" title={record.modelCode}>{record.modelName}</Tooltip>;
      }
    }, {
      label: '车辆来源',
      dataIndex: 'source',
      render: (text, record) => {
        const sourceName = sourceMapping[text];
        return <Tag color="red">{sourceName ? sourceName : "未定义"}</Tag>
      }
    }, {
      label: 'VIN码',
      dataIndex: 'vinNumber',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>
        }
        return <Tag color="purple">{text}</Tag>;
      }
    }, {
      label: '车牌号',
      dataIndex: 'plateNumber',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>
        }
        return <Tag color="blue">{text}</Tag>;
      }
    }, {
      label: '首次上牌时间',
      dataIndex: 'firstLicensePlateDate',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>
        }
        return text;
      }
    }, {
      label: '表显里程',
      dataIndex: 'mileage',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>
        }
        return `${text} 公里`;
      }
    }, {
      label: '销售状态',
      dataIndex: 'status',
      render: (text) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>
        }
        return <span>{statusMapping[text]}</span>
      }
    }, {
      label: '订单状态',
      dataIndex: 'orderStatus',
      render: (text) => {
        if (text == null) {
          return "初始化";
        }
        return <span>{orderStatusMapping[text]}</span>
      }
    }, {
      label: '上下架状态',
      dataIndex: 'isUpShelf',
      render: (text) => {
        if (text == 2) {
          return <span style={{color: 'red'}}>下架</span>
        }
        else if (text == 1) {
          return <span style={{color: '#33cc33'}}>上架</span>
        } else {
          return <span style={{color: 'red'}}>缺失</span>;
        }
      }
    }, {
      label: '上架时间',
      dataIndex: 'upShelfDate',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return text;
      }
    }, {
      label: '下架时间',
      dataIndex: 'downShelfDate',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return text;
      }
    }, {
      label: '店铺',
      render: (text, record) => {
        if (record.shop == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return <Tooltip placement="top" title={`${record.shop.shopCode}`}>{record.shop.shopName}</Tooltip>
      }
    }, {
      label: '车辆所在地',
      render: (text, record) => {
        if (record.provinceCode == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return <Tooltip placement="top" title={`${record.provinceCode} - ${record.cityCode}`}>{record.provinceName} - {record.cityName}</Tooltip>;
      }
    }, {
      label: '车辆上牌地',
      render: (text, record) => {
        if (record.registerProvinceCode == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return <Tooltip placement="top" title={`${record.registerProvinceCode} - ${record.registerCityCode}`}>{record.registerProvinceName} - {record.registerCityName}</Tooltip>;
      }
    }, {
      label: '车身颜色',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return text;
      }
    }, {
      label: '内饰颜色',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return text;
      }
    }, {
      label: '车身颜色（字典）',
      dataIndex: 'colorName',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return text;
      }
    }, {
      label: '内饰颜色（字典）',
      dataIndex: 'interiorColorName',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return text;
      }
    }, {
      label: '排放标准',
      dataIndex: 'emissionStandard',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return text;
      }
    }, {
      label: '指导价',
      dataIndex: 'guidePrice',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return `${text} 元`;
      }
    }, {
      label: '新车价',
      dataIndex: 'newPrice',
      render: (text, record) => {
        if (text == null) {
          return <span style={{color: 'red'}}>缺失</span>;
        }
        return `${text} 元`;
      }
    }];
    return (
      <PageWrapper className={className} style={style}>
        <Card className={styles.content}>
          <Search
            placeholder="请输入车辆ID"
            onSearch={this.search}
            enterButton="Search"
            size="large"
            className={styles.search}
          />
          {loading ? 
            <div className={styles.loading}>
              <Spin size="large"/>
            </div>
            :
            data ? 
            <div className={styles.result}>
              <DescriptionList title="车辆信息" dataSource={data} labels={labels}/>
            </div>
            :
            <Empty style={{marginTop: '20px'}}/>
          }
        </Card>
      </PageWrapper>
    );
  }
}

export default connect((store) => store.search)(SearchPage);
