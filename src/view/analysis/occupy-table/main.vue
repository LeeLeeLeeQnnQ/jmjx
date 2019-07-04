<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="12" :md="12" :lg="12">
          <Select v-model="sreach.kitchenIdList" multiple placeholder="请选择厨房">
            <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
        </i-col>
        <i-col :xs="6" :md="6" :lg="6">
          <DatePicker type="daterange" placeholder="选择时间区间" :value="sreach.month" style="width: 200px"></DatePicker>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <tables
        v-model="kitchen_s_data"
        :columns="kitchen_data_columns"/>
    </Card>
  </div>
</template>

<script>
//权限
// 
import Tables from '_c/tables'
import { getKitchenList } from '@/api/setting'
export default {
  name: 'analysis_occupy_table',
  components: {
    Tables
  },
  data () {
    return {
      // 固体数据
      kitchenList:[],
      // 搜索条件
      sreach:{
        kitchenIdList:[],
        month:'2019-06',
      },
      // 数据
      kitchen_s_data:[
        {
          kitchen_name:"四道口",
          days:"50",
          total_days:"60",
        },
        {
          kitchen_name:"总计",
          days:"50",
          total_days:"60",
        }
      ],
      kitchen_data_columns:[
        {title: '名称', key: 'kitchen_name'},
        {title: '占用天数', key: 'days'},
        {title: '自然天数', key: 'total_days'},
        {
          title: '入住率',
          key: 'occupy',
          render: (h, params) => {
            let days = params.row.days*1;
            let total_days = params.row.total_days*1;
            let occupy = (days/total_days).toFixed(2)
            return h('span', { style: {color: '#ff9900'}} , occupy)
          }
        },
      ],
    }
  },
  methods: {
    // 初始化数据
    initData( ){
      
    },
    // 搜索
    sreachSubmit(){
      console.log(this.sreach)
    },
  },
  computed: {
    
  },
  created () {
    getKitchenList().then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      // 初始化函数
      this.kitchenList = dbody.data.list || [];
      this.initData();
    })  
  },
}
</script>

<style>

</style>
