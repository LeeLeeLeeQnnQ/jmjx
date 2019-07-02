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
      <h3>进场周期：{{ baseInfo.a }}</h3>
      <h3>接驳周期：{{ baseInfo.b }}</h3>
      <h3>上线周期：{{ baseInfo.b }}</h3>
      <h3>起租周期：{{ baseInfo.c }}</h3>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <tables ref="tables" v-model="entranceTableData" :columns="entranceColumns" 
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
  name: 'analysis_entrance',
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
      entranceColumns:[
        {
          title: '厨房名称',
          key: 'title'
        },
        {
          title: '进场周期',
          key: 'quantity',
        },
        {
          title: '接驳周期',
          key: 'voltage'
        },
        {
          title: '上线周期',
          key: 'kw'
        },
        {
          title: '起租周期',
          key: 'gas'
        },
      ],
      //设备数据
      entranceTableData:[{id:1,title:'1213',gas:1}],
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
