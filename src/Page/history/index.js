import React,{ Component } from 'react';
import moment from 'moment';
import { Card,Table,Modal } from 'antd';
import axios from '../../axios';
import Axios from 'axios';
import './style.less';
import Utils from '../../utils/utils';
import BaseForm from '../../Components/BaseForm'
export default class History extends Component{
  state  = {
    list:[],
    begin:null,
    end:null
}
params = {
    page: 1
}
  handleFilter = (params)=>{
    var device = params.device;
    var begin_time = params.begin_time;
    var end_time = params.end_time;
    if(begin_time === undefined || end_time === undefined ||begin_time === null || end_time === null || device === '请选择设备'){
      Modal.warning({
        title: '注意',
        content: '设置不得为空！',
      });
    }else{
      var beginTime = this.changeTimestamp(params.begin_time._d);
      var endTime = this.changeTimestamp(params.end_time._d);
      this.setState({
        begin:beginTime,
        end:endTime
      },function(){
        Axios.post('https://www.easy-mock.com/mock/5c23296a543d3e6e163d88f5/uwbmwr/search/postHistory', {
          begin: this.state.begin,
          end: this.state.end
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      this.params = params;
      Modal.success({
        title: '恭喜',
        content: '查询成功！',
        okText: '确认',
        onOk: ()=>{
         this.setState({
           list:[{'deviceNumber':1,'surplus':100,'intensity':1,'datatime':1}]
         })
        }
      })
    }
}
  changeTimestamp = (date)=>{
    var time = new Date(date);  
    var time_value=time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() ;
    var res = moment(time_value, 'YYYY-MM-DD').valueOf();
    return res;
  }
  requestList = ()=>{
    let _this = this;
        axios.axios({
            url: 'getHistory',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list:list,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
  }
  formList = [
    {
        type:'SELECT',
        label:'卷纸器设备',
        field:'device',
        initialValue:'请选择设备',
        width:150,
        list: [{ id: '0', name: '卷纸器1' }, { id: '1', name: '卷纸器2' }]
    },
    {
        type: '时间查询',
        field:'times'
    }
]
  render(){
    const columns = [
      {
        title:'卷纸器编号',
        dataIndex:'deviceNumber'
      },
      {
          title:'卷纸剩余量',
          dataIndex:'surplus'
      }, {
          title: '信号强度',
          dataIndex: 'intensity'
      }, {
          title: '时间',
          dataIndex: 'datatime'
      }
  ]
    return<div className="home-wrap2">
      <Card style={{marginBottom:'10px'}}>
        <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
      </Card>
      <Table
        bordered
        columns={columns}
        dataSource={this.state.list}
        pagination={this.state.pagination }
      />
    </div>
  }
}
