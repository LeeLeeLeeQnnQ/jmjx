<template>
  <div>
    <Card shadow>
      <Form>
        <Row :gutter="20">
          <i-col :md="6" :lg="6">
            <FormItem>
              <DatePicker type="daterange" @on-change="selectDate" placeholder="选择时间段" style="min-width: 200px"></DatePicker>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
    <!-- 厨房表格数据 -->
    <Card style="margin-top: 10px;">
      <p slot="title">
          商户余额 ： 888
      </p>
      <tables ref="tables" v-model="applyList" :columns="columns" 
          @data-view-img="handleViewImg" 
      />
      <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Card>
    <!-- 申领凭证 -->
    <Modal title="充值凭证预览" v-model="showApplyImgList">
      <div class="img-upload-list" v-for="item in applyImgList">
        <div>
          <img :src="item">
          <div class="img-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
// 权限
// /api/Kitchen/index,/api/Kitchen/add,/api/Kitchen/delete
import Tables from '_c/tables'
import { getKitchenList , addKitchen  , deleKitchen } from '@/api/setting'
export default {
  name: 'apply_list',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: '申领ID', key: 'id', width: 80},
        {title: '申领日期', key: 'kitchen_name'},
        {title: '区域', key: 'kitchen_name'},
        {title: '订单号', key: 'manage_name'},
        {title: '红包金额', key: 'manage_name'},
        {title: '店长电话', key: 'manage_phone'},
        { title: '返现规则', key: 'manage_phone'},
        { title: '审批状态', key: 'manage_phone'},
        { title: '审批结果', key: 'manage_phone'},
        {
          title: '查看',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                style:{
                  margin:"0"
                },
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view-img', params)
                  }
                }},
              '查看凭证')
            }, 
          ]
        },
      ],
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      applyList: [],
      // 
      showApplyImgList:false,
      applyImgList:[],
      // 图片
      imgUrl: '',
      visible: false,
    }
  },
  methods: {
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 选择新页面
    getNewPage(page){
      
    },
    // 查看凭证
    handleViewImg(params){
      let voucher = !!params.row.images ? params.row.images.split(',') : [];
      this.applyImgList = [];
      this.applyImgList = voucher;
      this.showApplyImgList = true;
    },
    // 筛选
    selectDate(){

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
      this.applyList = dbody.data.list
    })
  },
  computed: {

  }
}
</script>

<style scoped>
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
