<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="12" :md="12" :lg="12">
          <Select v-model="sreach.kitchen_id" multiple placeholder="请选择厨房">
            <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
        </i-col>
        <i-col :xs="6" :md="6" :lg="6">
          <DatePicker @on-change="selectDate" type="month" placeholder="选择月份" style="width: 200px"></DatePicker>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Tabs style="margin-top: 12px;" type="card">
        <TabPane v-for="item in kitchen_s_data" :label="item.kitchen_name">
          <Card shadow style="margin-top: 8px;">
            <tables
              v-model="item.list"
              :columns="kitchen_data_columns"/>
          </Card>
        </TabPane>
    </Tabs>
    
  </div>
</template>

<script>
//权限
// Kitchen/index,KitchenReside/queryList
import Tables from '_c/tables'
import { getKitchenList  } from '@/api/setting'
import { getKitchenResideQueryList  } from '@/api/data'
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
        kitchen_id:'',
        month:'',
      },
      // 数据
      kitchen_s_data:[],
      kitchen_data_columns:[
        {title: '档口号', key: 'store_no'},
        {title: '占用天数', key: 'days'},
        {title: '自然天数', key: 'days_total'},
        {
          title: '占用率',
          key: 'occupy',
          render: (h, params) => {
            let days = params.row.days*1;
            let days_total = params.row.days_total*1;
            let occupy = (Math.round(days*1/days_total*1 * 10000)/100).toFixed(2) + '%'
            return h('span', { style: {color: '#ff9900'}} , occupy)
          }
        },
      ],
    }
  },
  methods: {
    // selectDate
    selectDate(date){
      this.sreach.month = date;
    },
    // 初始化数据
    initData( data ){
      this.kitchen_s_data = [];
      let sreach = this.sreach;
      let obj = Object.assign({},data,sreach)
      obj.kitchen_id = obj.kitchen_id.join(',')
      this.getKitchenResideQueryList(obj)
    },
    // 搜索
    sreachSubmit(){
      if(this.sreach.kitchen_id.length <= 0){
        this.$Notice.warning({
          title: '厨房必须选择！'
        })
        return
      }
      if(!this.sreach.month){
        this.$Notice.warning({
          title: '时间必须选择！'
        })
        return
      }
      this.initData({})
    },
    getKitchenResideQueryList(info){
      getKitchenResideQueryList(info).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        // 初始化函数
        let t_data = dbody.data || []
        this.getKitchenData(t_data);
      })
    },
    getKitchenData(data){
      let obj = {};
      let key_list = [];
      data.forEach((item,index)=>{
        if(key_list.includes(item.kitchen_id)){
          obj[item.kitchen_id].list.push(item)
        }else{
          key_list.push(item.kitchen_id);
          obj[item.kitchen_id] = {};
          obj[item.kitchen_id].kitchen_name = item.kitchen_name;
          obj[item.kitchen_id].kitchen_id = item.kitchen_id;
          obj[item.kitchen_id].list = [];
          obj[item.kitchen_id].list.push(item)
        }
      })
      let arr = [];
      for (let key in obj) {
        let total = {};
        total.store_no = "厨房总计";
        total.days = 0;
        total.days_total = 0;
        obj[key].list.forEach((i_t)=>{
          total.days = i_t.days*1 + total.days*1
          total.days_total = i_t.days_total*1 + total.days_total*1
        })
        obj[key].list.push(total)
        arr.push(obj[key])
      }
      if(arr.length  == 0){
        this.$Notice.warning({
          title: '无匹配数据！'
        })
        return
      }
      if(arr.length  != this.sreach.kitchen_id.length){
        this.$Notice.warning({
          title: '部分厨房无入住数据！'
        })
      }
      this.kitchen_s_data = arr;
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
    })  
  },
}
</script>

<style>

</style>
