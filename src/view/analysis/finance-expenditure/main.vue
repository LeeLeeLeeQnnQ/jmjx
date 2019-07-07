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
          <DatePicker type="month" @on-change="selectDate" placeholder="选择月份" :value="sreach.expend_date" style="width: 200px"></DatePicker>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Row :gutter="20" style="margin-top: 15px;" v-for="item in column_data">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card>
          <chart-column style="height: 300px;" :value="item.column" :text="item.kitchen_name"></chart-column>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
//权限
// 
import { getKitchenList  } from '@/api/setting'
import { getKitchenExpendQuery , getExpendType  } from '@/api/finance'
import Tables from '_c/tables'
import { ChartColumn } from '_c/charts'
export default {
  name: 'analysis_fiance_expenditure',
  components: {
    ChartColumn
  },
  data () {
    return {
      // 固体数据
      kitchenList:[],
      // 搜索条件
      sreach:{
        kitchen_id:'',
        expend_date:'',
        expend_type:'0',
      },
      expendList:[],
      // init 数据
      baseinfo:[],
      column_data:[],
      kitchen_column:[],
      tagList:[],
      tagObj:{},
    }
  },
  methods: {
    init( data ){
      let sreach = this.sreach;
      let obj = Object.assign({},data,sreach)
      obj.kitchen_id = obj.kitchen_id.join(',')
      this.getKitchenExpendQuery(obj);
    },
    getKitchenExpendQuery(info){
      getKitchenExpendQuery(info).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.baseinfo = dbody.data;
        this.getKitchenChartColumnData(this.baseinfo);
      })
    },
    getKitchenChartColumnData(data){
      let obj = {};
      let key_list = [];
      data.forEach((item,index)=>{
        if(key_list.includes(item.kitchen_id)){
          obj[item.kitchen_id].list.push(item)
        }else{
          key_list.push(item.kitchen_id);
          obj[item.kitchen_id] = {};
          obj[item.kitchen_id].kitchen_name = item.kitchen_name;
          obj[item.kitchen_id].list = [];
          obj[item.kitchen_id].list.push(item)
        }
      })
      let arr = [];
      for (let key in obj) {
        arr.push(obj[key])
      }
      this.getItemChartColumnData(arr);
    },
    getItemChartColumnData(arr){
      let column_arr = [];
      arr.forEach((item,index)=>{
        let iobj = {};
        iobj.kitchen_name = item.kitchen_name
        let column = item.list || [];
        let x_title = [];
        let item_obj = Object.assign({},this.tagObj);
        column.forEach((citem,cindex)=>{
          if(!!item_obj[citem.expend_type] || item_obj[citem.expend_type] == 0){
            item_obj[citem.expend_type] = (citem.money*1 + item_obj[citem.expend_type]*1).toFixed(2);
          }
        })
        column_arr.push({
          kitchen_name:item.kitchen_name,
          column:item_obj
        });
      })
      this.setData(column_arr)
    },
    setData(column_arr){
      let column_data = [];
      column_arr.forEach((item,index)=>{
        let obj = {};
        for (let k  in item.column) {
          let arrdata = this.tagList.filter(item => 
            k == item.type
          );
          let data = arrdata[0]
          obj[data.name] = item.column[k]
        }
        column_data.push({
          kitchen_name:item.kitchen_name,
          column:obj
        });
      })
      this.column_data = column_data;
    },
    // selectDate
    selectDate(date){
      this.sreach.expend_date = date;
    },
    // 搜索
    sreachSubmit(){
      if(this.sreach.kitchen_id.length <= 0){
        this.$Notice.warning({
          title: '厨房必须选择！'
        })
        return
      }
      if(!this.sreach.expend_date){
        this.$Notice.warning({
          title: '时间必须选择！'
        })
        return
      }
      this.init(this.sreach);
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
    });
    getExpendType( ).then(res => {
      const dbody = res.data
      if(dbody.code != 0){
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      let obj = {}
      dbody.data.forEach((item)=>{
        if(item.category_id == 1){
          obj[item.type] = 0;
        }
      })
      this.tagList = dbody.data;
      this.tagObj = obj;
    })
  },
}
</script>

<style>

</style>
