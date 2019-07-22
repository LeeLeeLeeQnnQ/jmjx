<template>
  <Card shadow>
    <h3>123</h3>
  </Card>
</template>

<script>
import Tables from '_c/tables'
// 权限
// /api/Kitchen/index,/api/KitchenStore/index,/api/KitchenStore/add,/api/KitchenStore/edit,/api/KitchenStore/delete,/api/KitchenMeter/queryList,/api/KitchenMeter/add,/api/KitchenMeter/delete,/api/KitchenExpend/index
import { getKitchenList } from '@/api/setting'
import { getManageList } from '@/api/data'
export default {
  name: 'kitchenDataAssignStore',
  components: {
    Tables
  },
  data () {
    return {
      kitchen_id:'',
      kitchen:'',
    }
  },
  methods: {
    // 初始化
    // 获取厨房信息
    getKitchen(){
      getKitchenList(  ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let kitchenList = dbody.data.list || [];
        kitchenList.forEach( ()=>{
          if(this.kitchen_id*1 == element.id*1){
            this.kitchen = element;
          }
          return
        });
      })
    },
  },
  created () {
    this.$nextTick(()=>{
        this.kitchen_id = this.$route.query.kitchen_id;
        this.getKitchen();
    })
     
  }
}
</script>


<style lang="less" scoped>
  .ivu-tabs-content{
    overflow-x: hidden;
  }
  .tableFooter{
    margin-left: 20px;
  }
  .cellTit{
    margin-bottom: 12px;
    span{
      color:#fff;
      background-color:#3399ff;
      border-radius:5px;
      padding:5px 8px;
      margin-right: 10px;
    }
    .noData{
      background-color: #ff9900;
    }
  }
  .img-upload-list{
      display: inline-block;
      width: 60px;
      min-height: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 4px;
  }
  .img-upload-list img{
      width: 100%;
      height: 100%;
  }
  .img-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
  }
  .img-upload-list:hover .img-upload-list-cover{
      display: block;
  }
  .img-upload-list-cover i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
  }
</style>
