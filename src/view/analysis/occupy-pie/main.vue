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
      <Row :gutter="20" style="margin-top: 15px;">
        <i-col :md="12" :lg="12" style="margin-bottom: 20px;">
          <Card>
            <chart-pie style="height: 300px;" :value="pie_data.occupy" text="入住率"></chart-pie>
          </Card>
        </i-col>
        <i-col :md="12" :lg="12" style="margin-bottom: 20px;">
          <Card>
            <chart-pie style="height: 300px;" :value="pie_data.store_status" text="档口状态"></chart-pie>
          </Card>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
//权限
// 
import { getKitchenList , getKitchenStoreQueryList } from '@/api/setting'
import { ChartPie  } from '_c/charts'
export default {
  name: 'analysis_occupy_pie',
  components: {
    ChartPie
  },
  data () {
    return {
      // 固体数据
      kitchenList:[],
      // 搜索条件
      sreach:{
        kitchenIdList:1,
      },
      // 饼状图数据
      pie_data:{
        occupy:[],
        store_status:[],
      },
    }
  },
  methods: {
    // 初始化数据
    initData( info ){
      getKitchenStoreQueryList( info ).then(res => {
        const dbody = res.data;
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let rdata = dbody.data || [];
        this.setOccupyInfo(rdata);
        this.setStatusInfo(rdata);
      })
    },
    // 获取入住率
    setOccupyInfo( data ){
      let info = data || [];
      let pie = [];
      let count = {};
      info.forEach((ele,index) => {
          if(ele.store_status*1 == 1 || ele.store_status*1 == 2 || ele.store_status*1 == 3){
            count.aaa = !!count.aaa ? (count.aaa + 1) : 1;
          }else if (ele.store_status*1 == 4) {
            count.bbb = !!count.bbb ? (count.bbb + 1) : 1;
          }
      });
      for(let k in count){
        if(k == 'aaa'){
          pie.push({name:'占用', value : count[k]})
        }else if (k = 'bbb') {
          pie.push({name:'空闲', value : count[k]})
        }
      }
      this.pie_data.occupy = pie;
    },
    // 获取厨房状态数据
    setStatusInfo( data ){
      let info = data || [];
      let pie = [];
      let count = {};
      info.forEach((ele,index) => {
          if(ele.store_status*1 == 1){
            count.aaa = !!count.aaa ? (count.aaa + 1) : 1;
          }else if (ele.store_status*1 == 2) {
            count.bbb = !!count.bbb ? (count.bbb + 1) : 1;
          }else if (ele.store_status*1 == 3) {
            count.ccc = !!count.ccc ? (count.ccc + 1) : 1;
          }else if (ele.store_status*1 == 4) {
            count.ddd = !!count.ddd ? (count.ddd + 1) : 1;
          }
      });
      for(let k in count){
        if(k == 'aaa'){
          pie.push({name:'租赁中', value : count[k]})
        }else if (k = 'bbb') {
          pie.push({name:'转租中', value : count[k]})
        }else if (k = 'ccc') {
          pie.push({name:'起租中', value : count[k]})
        }else if (k = 'ddd') {
          pie.push({name:'空闲中', value : count[k]})
        }
      }
      this.pie_data.store_status = pie;
    },
    init( ){
      let info = {};
      info.kitchen_id = this.sreach.kitchenIdList;
      this.initData(info);
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
      this.init();
    })  
  },
}
</script>

<style>

</style>
