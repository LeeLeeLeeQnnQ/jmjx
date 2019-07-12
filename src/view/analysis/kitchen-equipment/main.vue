<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="12" :md="12" :lg="12">
          <Select v-model="sreach.kitchen_id" multiple placeholder="请选择厨房">
            <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Tabs style="margin-top: 12px;" type="card">
        <TabPane v-for="item in equipmentTableData" :label="item.kitchen_name">
          <Card shadow style="margin-top: 8px;">
            <tables
              v-model="item.list"
              :columns="equipmentColumns"/>
          </Card>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
//权限
// Kitchen/index,Kitchen/getStoreEmployee
import { getKitchenList } from '@/api/setting'
import { getKitchenStoreDeviceList  } from '@/api/data'
import Tables from '_c/tables'
export default {
  name: 'analysis_kitchen_equipment',
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
      equipmentColumns:[
        {
          title: '档口名称',
          key: 'store_no'
        },
        {
          title: '商户名称',
          key: 'store_name'
        },
        {
          title: '店铺设备总数量',
          key: 'device_total',
        },
        {
          title: '电压V',
          key: 'voltage'
        },
        {
          title: '功率KW',
          key: 'kw'
        },
        {
          title: '燃气量 m³',
          key: 'gas'
        },
      ],
      //设备数据
      equipmentTableData:[],
    }
  },
  methods: {
    // 初始化数据
    initData( data ){
      this.equipmentTableData = [];
      let sreach = this.sreach;
      let obj = Object.assign({},data,sreach)
      obj.kitchen_id = obj.kitchen_id.join(',')
      this.getKitchenStoreDeviceList(obj)
    },
    getKitchenStoreDeviceList(info){
      getKitchenStoreDeviceList(info).then(res => {
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
        total.device_total = 0;
        total.voltage = 0;
        total.kw = 0;
        total.gas = 0;
        obj[key].list.forEach((i_t)=>{
          total.device_total = i_t.device_total*1 + total.device_total*1
          total.voltage = (i_t.voltage*1 + total.voltage*1).toFixed(2)
          total.kw = (i_t.kw*1 + total.kw*1).toFixed(2)
          total.gas = (i_t.gas*1 + total.gas*1).toFixed(2)
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
          title: '部分厨房无设备数据！'
        })
      }
      this.equipmentTableData = arr;
    },
    // 搜索
    sreachSubmit(){
      if(this.sreach.kitchen_id.length <= 0){
        this.$Notice.warning({
          title: '厨房必须选择！'
        })
        return
      }
      this.initData({})
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
