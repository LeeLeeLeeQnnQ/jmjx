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
          <DatePicker type="month" placeholder="选择月份" :value="sreach.month" style="width: 200px"></DatePicker>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <Row :gutter="40">
        <i-col v-for="item in baseList" :xs="4" :md="4" :lg="4">
          <h3>{{item.title}}</h3>
          <h3>{{item.value }}</h3>
        </i-col>
      </Row>
    </Card>
    <Card shadow style="margin-top: 8px;">
      <tables ref="tables" v-model="incomeTableData" :columns="incomeColumns" 
        @data-view = "handleView"
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
  name: 'analysis_fiance_expenditure',
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
      incomeColumns:[
        {
          title: '厨房',
          key: 'title'
        },
        {
          title: '金额',
          key: 'voltage'
        },
        {
          title: '支出时间',
          key: 'voltage'
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '查看')
            },
          ]
        },
      ],
      //设备数据
      incomeTableData:[{id:1,title:'1213',gas:1}],
      // 基础数据
      baseInfo:{
        a:999
      },
      // 
      baseList:[{title:'2',value:'123'}],
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
    // 查看
    handleView(){

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
