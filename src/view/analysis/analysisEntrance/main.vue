<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="12" :md="12" :lg="12">
          <Select v-model="sreach.kitchen_id" placeholder="请选择厨房">
            <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <tables ref="tables" v-model="storeProgressData" :columns="storeProgressColumns" 
      />
      <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/>
    </Card>
  </div>
</template>

<script>
//权限
// Kitchen/index,StoreLease/queryStoreProgress
import { getKitchenQueryList } from '@/api/setting'
import { queryStoreProgress } from '@/api/data'
import Tables from '_c/tables'
export default {
  name: 'analysisEntrance',
  components: {
    Tables
  },
  data () {
    return {
      // 固体数据
      kitchenList:[],
      // 搜索条件
      sreach:{
        kitchen_id:[],
      },
      //设备表格头部
      storeProgressColumns:[
        {
          title: '厨房名称',
          key: 'kitchen_name'
        },
        {
          title: '商户名称',
          key: 'store_name'
        },
        {
          title: '档口',
          key: 'store_no',
          width: 80
        },
        {
          title: '建档日期',
          key: 'create_date'
        },
        { title: '进场周期(天)',
          render: (h, params) => {
            let entrance_days = params.row.entrance_days;
            if(entrance_days*1 <= 0){
              return h('span', { style: {color: 'red'}}, entrance_days)
            }else if(entrance_days*1 <= 7){
              return h('span', { style: {color: 'green'}}, entrance_days)
            }else{
              return h('span', { style: {color: 'orange'}}, entrance_days)
            }
          }
        },
        { title: '接驳周期(天)',
          render: (h, params) => {
            let connect_days = params.row.connect_days;
            if(connect_days*1 <= 0){
              return h('span', { style: {color: 'red'}}, connect_days)
            }else if(connect_days*1 <= 7){
              return h('span', { style: {color: 'green'}}, connect_days)
            }else{
              return h('span', { style: {color: 'orange'}}, connect_days)
            }
          }
        },
        { title: '上线周期(天)',
          render: (h, params) => {
            let online_days = params.row.online_days;
            if(online_days*1 <= 0){
              return h('span', { style: {color: 'red'}}, online_days)
            }else if(online_days*1 <= 7){
              return h('span', { style: {color: 'green'}}, online_days)
            }else{
              return h('span', { style: {color: 'orange'}}, online_days)
            }
          }
        },
        { title: '起租周期(天)',
          render: (h, params) => {
            let start_days = params.row.start_days;
            if(start_days*1 <= 0){
              return h('span', { style: {color: 'red'}}, start_days)
            }else if(start_days*1 <= 7){
              return h('span', { style: {color: 'green'}}, start_days)
            }else{
              return h('span', { style: {color: 'orange'}}, start_days)
            }
          }
        },
      ],
      //起租进度数据
      storeProgressData:[],
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
    }
  },
  methods: {
    init(data){
      this.column_data = [];
      let sreach = this.sreach;
      let obj = Object.assign({},data,sreach)
      this.queryStoreProgress(obj);
    },
    queryStoreProgress(info){
      queryStoreProgress(info).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.storeProgressData = dbody.data.list || [];
        this.page = dbody.data.page;
      })
    },
    getNewPage(page){
      this.init({page:page});
    },
    // 搜索
    sreachSubmit(){
      if(this.sreach.kitchen_id.length <= 0){
        this.$Notice.warning({
          title: '厨房必须选择！'
        })
        return
      }
      this.init({});
    },
  },
  computed: {
    
  },
  created () {
    getKitchenQueryList().then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      // 初始化函数
      this.kitchenList = dbody.data || [];
    })  
  },
}
</script>

<style>

</style>
