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
      <h3>店铺人员：{{ baseInfo.allstoreNoNum }}</h3>
      <h3>平均值：{{ baseInfo.allmember }}</h3>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <tables ref="tables" v-model="memberTableData" :columns="memberColumns" 
          @data-view="handleView"
      />
      <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/>
    </Card>
  </div>
</template>

<script>
//权限
// 
import { getKitchenList } from '@/api/setting'
import Tables from '_c/tables'
export default {
  name: 'analysis_kitchen_member',
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
      memberColumns:[
        {
          title: '档口名称',
          key: 'title'
        },
        {
          title: '厨房名称',
          key: 'title'
        },
        {
          title: '档口数量',
          key: 'num',
        },
        {
          title: '店铺人员数量',
          key: 'member'
        },
        {
          title: '店铺人员平均数量',
          key: 'qa'
        }
      ],
      //设备数据
      memberTableData:[{id:11}],
      // 基础数据
      baseInfo:{
        store_no_num:'0',
        member:'0',
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
    handleView(params){
      let kitchen_id = params.row.id
      const route = {
        name: 'kitchen-equipment-item',
        query: {
          kitchen_id
        }
      }
      this.$router.push(route)
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
