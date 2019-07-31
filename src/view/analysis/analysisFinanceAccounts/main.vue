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
          <DatePicker  @on-change="selectDate"  type="month"  placeholder="选择时间" style="width: 200px"></DatePicker>
        </i-col>
        <i-col :xs="3" :md="3" :lg="3">
          <Button type="primary" shape="circle" long @click="sreachSubmit">搜索</Button>
        </i-col>
      </Row>
    </Card>
    <Row :gutter="20" style="margin-top: 15px;" v-for="item in column_data">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card>
          <p slot="title">
            {{item.kitchen_name}}收支差值：{{item.total}}
          </p>
          <Card shadow>
            <p slot="title">
             合计收入：{{item.income.total}}
            </p>
            <chart-column style="height: 300px;" :value="item.income.column" :text="item.income.kitchen_name"></chart-column>
          </Card>
          <Card shadow>
            <p slot="title">
             合计支出：{{item.expend.total}}
            </p>
            <chart-column style="height: 300px;" :value="item.expend.column" :text="item.expend.kitchen_name"></chart-column>
          </Card>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
//权限
// Kitchen/index,KitchenIncome/queryList,KitchenIncome/getIncomeType,KitchenExpend/getExpendType
import { getKitchenQueryList  } from '@/api/setting'
import { getKitchenAccounts , getIncomeType , getExpendType } from '@/api/finance'
import Tables from '_c/tables'
import { ChartColumn } from '_c/charts'
export default {
  name: 'analysisFinanceAccounts',
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
        start_time:'',
        end_time:'',
        category_id:'1',
      },
      expendList:[],
      // init 数据
      baseinfo:[],
      column_data:[],

      incomeTagList:[],
      incomeTagObj:{},
      expendTagList:[],
      expendTagObj:[],
    }
  },
  methods: {
    init( data ){
      this.column_data = [];
      let sreach = this.sreach;
      let obj = Object.assign({},data,sreach)
      obj.kitchen_id = obj.kitchen_id.join(',')
      this.getKitchenAccounts(obj);
    },
    getKitchenAccounts(info){
      getKitchenAccounts(info).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.baseinfo = dbody.data;
        this.setAccountsData(this.baseinfo);
      })
    },
    getTotal(obj){
      let total = 0;
      for (let kk in obj) {
        total = obj[kk]*1 + total*1;
      }
      return total.toFixed(2);
    },
    setAccountsData(data){
      let arr = [];
      data.forEach((item)=>{
        let obj = {};
        obj.kitchen_name = item.kitchen_name
        obj.kitchen_id = item.kitchen_id
        obj.income = !!item.income ? this.getIncomeKitchenChartColumnData(item.income) : this.getEmptyData('income',item)
        obj.expend = !!item.expend ? this.getExpendKitchenChartColumnData(item.expend) : this.getEmptyData('expend',item)
        obj.total = (obj.income.total - obj.expend.total).toFixed(2)
        arr.push(obj)
      })
      this.column_data = arr;
    },
    getEmptyData(key,data){
      if(key == "income"){
        let obj = {}
        obj.kitchen_id = data.kitchen_id;
        obj.kitchen_name = data.kitchen_name;
        obj.total = 0
        let cObj = {};
        this.incomeTagList.forEach((item)=>{
          cObj[item.name] = 0.00
        })
        obj.column = cObj;
        return obj
      }
      if(key == "expend"){
        let obj = {}
        obj.kitchen_id = data.kitchen_id;
        obj.kitchen_name = data.kitchen_name;
        obj.total = 0
        let cObj = {};
        this.expendTagList.forEach((item)=>{
          cObj[item.name] = 0.00
        })
        obj.column = cObj;
        return obj
      }
    },
    getIncomeKitchenChartColumnData(data){
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
        arr.push(obj[key])
      }
      return this.getIncomeItemChartColumnData(arr);
    },
    getIncomeItemChartColumnData(arr){
      let column_arr = [];
      arr.forEach((item,index)=>{
        let iobj = {};
        iobj.kitchen_name = item.kitchen_name
        let column = item.list || [];
        let x_title = [];
        let item_obj = Object.assign({},this.incomeTagObj);
        column.forEach((citem,cindex)=>{
          if(!!item_obj[citem.income_type] || item_obj[citem.income_type] == 0){
            item_obj[citem.income_type] = (citem.money*1 + item_obj[citem.income_type]*1).toFixed(2);
          }
        })
        column_arr.push({
          kitchen_name:item.kitchen_name,
          kitchen_id:item.kitchen_id,
          column:item_obj,
          total:this.getTotal(item_obj)
        });
      })
      return this.setIncomeData(column_arr)
    },
    setIncomeData(column_arr){
      let column_data = [];
      column_arr.forEach((item,index)=>{
        let obj = {};
        for (let k  in item.column) {
          let arrdata = this.incomeTagList.filter(item => 
            k == item.type
          );
          let data = arrdata[0]
          obj[data.name] = item.column[k]
        }
        column_data.push({
          kitchen_name:item.kitchen_name,
          column:obj,
          total:item.total,
          kitchen_id:item.kitchen_id,
        });
      })
      return column_data[0];
    },

    getExpendKitchenChartColumnData(data){
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
        arr.push(obj[key])
      }
      return this.getExpendItemChartColumnData(arr);
    },
    getExpendItemChartColumnData(arr){
      let column_arr = [];
      arr.forEach((item,index)=>{
        let iobj = {};
        iobj.kitchen_name = item.kitchen_name
        let column = item.list || [];
        let x_title = [];
        let item_obj = Object.assign({},this.expendTagObj);
        column.forEach((citem,cindex)=>{
          if(!!item_obj[citem.expend_type] || item_obj[citem.expend_type] == 0){
            item_obj[citem.expend_type] = (citem.money*1 + item_obj[citem.expend_type]*1).toFixed(2);
          }
        })
        column_arr.push({
          kitchen_name:item.kitchen_name,
          kitchen_id:item.kitchen_id,
          column:item_obj,
          total:this.getTotal(item_obj)
        });
      })
      return this.setExpendData(column_arr)
    },
    setExpendData(column_arr){
      let column_data = [];
      column_arr.forEach((item,index)=>{
        let obj = {};
        for (let k  in item.column) {
          let arrdata = this.expendTagList.filter(item => 
            k == item.type
          );
          let data = arrdata[0]
          obj[data.name] = item.column[k]
        }
        column_data.push({
          kitchen_name:item.kitchen_name,
          column:obj,
          total:item.total,
          kitchen_id:item.kitchen_id,
        });
      })
      return column_data[0];
    },
    // selectDate
    selectDate(date){
      this.sreach.month= date;
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
    });
    getIncomeType( ).then(res => {
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
      this.incomeTagList = dbody.data;
      this.incomeTagObj = obj;
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
      this.expendTagList = dbody.data;
      this.expendTagObj = obj;
    })
  },
}
</script>

<style>

</style>
