<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="12" :md="12" :lg="12">
          <Select v-model="sreach.kitchenIdList" multiple placeholder="请选择厨房">
            <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <h3>数据总电压：{{ baseInfo.allVoltage }} V</h3>
      <h3>数据总功率：{{ baseInfo.allKW }} KW</h3>
      <h3>数据总燃气量：{{ baseInfo.allGas }} m³</h3>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <tables ref="tables" v-model="equipmentTableData" :columns="equipmentColumns" 
      />
      <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/>
    </Card>
  </div>
</template>

<script>
//权限
// 
import { getKitchenList , getKitchenStoreQueryList } from '@/api/setting'
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
        kitchenIdList:1,
      },
      //设备表格头部
      equipmentColumns:[
        {
          title: '店铺名称',
          key: 'title'
        },
        {
          title: '所属厨房',
          key: 'title'
        },
        {
          title: '店铺设备总数量',
          key: 'quantity',
        },
        {
          title: '电压V/每个设备',
          key: 'voltage'
        },
        {
          title: '功率KW/每个设备',
          key: 'kw'
        },
        {
          title: '燃气量 m³',
          key: 'gas'
        },
      ],
      //设备数据
      equipmentTableData:[{id:1,title:'1213',gas:1}],
      // 基础数据
      baseInfo:{
        allVoltage:'0',
        allKW:'0',
        allGas:'0',
      },
      page: {
        curmoney_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
    }
  },
  methods: {
    init( ){
      
    },
    getNewPage(){

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
    })  
  },
}
</script>

<style>

</style>
