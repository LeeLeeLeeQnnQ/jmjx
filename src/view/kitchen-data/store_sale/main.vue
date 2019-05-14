<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="4" :md="4" :lg="4">
          <Select v-model="sreach_kitchen_id" @on-change="selectKitchen">
            <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
        </i-col>
<!--         <i-col :xs="4" :md="4" :lg="4">
          <DatePicker type="datetime" format="yyyy-MM-dd" placeholder="选择时间" style="width: 200px"></DatePicker>
        </i-col> -->
      </Row>
    </Card>
    <Card shadow style="margin-top: 5px;">
      <tables
        v-model="alive_store_list"
        :columns="alive_store_columns"/>
      <Page
        :total="page.total"
        :page-size="page.list_rows"
        style="margin-top:10px;"
        @on-change="getNewPage"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
// 权限
// Kitchen/index
import { getKitchenList } from '@/api/setting'
export default {
  name: 'kitchen-data-store-list',
  components: {
    Tables
  },
  data () {
    return {
      // 搜索部分
      kitchenList:[],
      sreach_kitchen_id:'',
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 列表数据
      alive_store_list:[],
      alive_store_columns:[
        {title: '档口', key: 'store_no'},
        {title: '档口状态', key: 'store_no'},
        {title: '商铺', key: 'store_name'},
        {title: '租金', key: 'store_name'},
        {title: '押金', key: 'store_name'},
        {title: '入场费', key: 'store_name'},
        {title: '面积', key: 'store_name'},
        {title: '增容', key: 'store_name'},
      ],
    }
  },
  methods: {
    getNewPage( page ){
      let info = {};
      info.kitchen_id = this.sreach_kitchen_id;
      info.date = this.sreach_kitchen_id;
      info.page = page;
      this.initData(info);
    },
    initData(info){

    },
    init( ){
      let info = {};
      info.kitchen_id = this.sreach_kitchen_id;
      info.date = this.sreach_kitchen_id;
      info.page = this.page.current_page;
      this.initData(info);
    },
  },
  mounted () {
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
      if(this.kitchenList.length > 0){
        this.sreach_kitchen_id = this.kitchenList[this.kitchenList.length-1].id;
      }
    })  
  }
}






</script>