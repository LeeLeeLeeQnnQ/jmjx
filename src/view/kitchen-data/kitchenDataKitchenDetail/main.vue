<template>
  <Card shadow>
    <Tabs>
      <TabPane label="基础资料">
        <KDSLKitchenBaseForm :kitchen_id = "kitchen_id" />
      </TabPane>
      <TabPane label="档口列表">
        
      </TabPane>
      <TabPane label="公摊表">
          <Card>
            <p slot="title">
              电表
            </p>
            <a href="#" slot="extra" @click.prevent="addMeter(1)">
                增加公摊电表
            </a>
            <tables :columns="energy_record_columns" v-model="energy_record_list" @data-dele="deleteKitchenMeter"/>
          </Card>
          <Card style="margin-top: 10px">
            <p slot="title">
              水表
            </p>
            <a href="#" slot="extra" @click.prevent="addMeter(2)">
                增加公摊水表
            </a>
            <tables :columns="water_record_columns" v-model="water_record_list" @data-dele="deleteKitchenMeter"/>
          </Card>
          <Modal v-model="addMeterShowModal" title="编辑表格" @on-ok="addKitchenMeter">
            <Form :model="addMeterItem" :label-width="80">
              <FormItem label="类型">
                <Select v-model="addMeterItem.meter_type" disabled>
                    <Option :value="1" :key="1">电表</Option>
                    <Option :value="2" :key="2">水表</Option>
                </Select>
              </FormItem>
              <FormItem label="表名">
                <Input v-model="addMeterItem.meter_name" placeholder="输入表名"></Input>
              </FormItem>
              <FormItem label="倍率">
                <Input v-model="addMeterItem.multiple" placeholder="输入倍率"></Input>
              </FormItem>
            </Form>
        </Modal>
      </TabPane>
      <TabPane label="支出列表">
        <tables v-model="kitchen_expend_list" :columns="expend_list_columns"/>
        <Page :total="expend_page.total" :page-size="expend_page.list_rows" style="margin-top:10px;" @on-change="getExpendNewPage"/>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
import Tables from '_c/tables'
import KDSLKitchenBaseForm from './components/KDSLKitchenBaseForm'
// 权限
// /api/Kitchen/index,/api/KitchenStore/index,/api/KitchenStore/add,/api/KitchenStore/edit,/api/KitchenStore/delete,/api/KitchenMeter/queryList,/api/KitchenMeter/add,/api/KitchenMeter/delete,/api/KitchenExpend/index
import { getKitchenList , getKitchenStoreList , addKitchenStore , editKitchenStore , deleKitchenStore , editKitchen , getKitchenMeterList , addKitchenMeter ,deleteKitchenMeter } from '@/api/setting'
import { getKitchenExpendList } from '@/api/finance'
import { getManageList } from '@/api/data'
export default {
  name: 'kitchenDataKitchenDetail',
  components: {
    Tables,
    KDSLKitchenBaseForm
  },
  data () {
    return {
      kitchen_id:'',
      // 基本信息
      kitchen:{},
      manageList:[],
      eidtkitchen:{},
      // 档口列表
      kitchenStoreList:[],
      storeColumns:[
        {title: '档口号', key: 'store_no'},
        {title: '档口面积', key: 'area'},
        {title: '原价入场费', key: 'entrance_fee'},
        { title: '入场费折扣',
          render: (h, params) => {
            let t = params.row.entrance_fee*1;
            let b = params.row.entrance_sell*1;
            if(t > 0 && b > 0){
              let r = (1-((t-b)/t)).toFixed(2);
              return h('span', r );
            }else{
              return h('span', 0 );
            }
          }
        },
        {title: '实际入场费', key: 'entrance_sell'},
        {title: '原价租金', key: 'rent_fee'},
        { title: '租金折扣',
          render: (h, params) => {
            let t = params.row.rent_fee*1;
            let b = params.row.rent_sell*1;
            if(t > 0 && b > 0){
              let r = (1-((t-b)/t)).toFixed(2);
              return h('span', r );
            }else{
              return h('span', 0 );
            }
          }
        },
        {title: '实际租金', key: 'rent_sell'},
        {
          title: '操作',
          key: 'handle',
          width : 160,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                'click': () => {
                  vm.$emit('data-edit', params)
                }
              }},
              '修改')
            },
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0 0 0 0.5em'},
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-dele', params)
                  }
                }},
              '删除')
            }
          ]
        }
      ],
      store_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      showAddModal:false,
      addStore:{},
      showEditModal:false,
      editStore:{},
      showDeleModal:false,
      store_id:'',
      // 公摊能源
      // 表头
      energy_record_columns:[
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '电表名称', key: 'meter_name'},
        {title: '倍率', key: 'multiple'},
        {title: '添加人', key: 'creator_name'},
        {
          title: '操作',
          key: 'handle',
          width : 90,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-dele', params)
                  }
                }},
              '删除')
            }
          ]
        }
      ],
      water_record_columns:[
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '水表名称', key: 'meter_name'},
        {title: '倍率', key: 'multiple'},
        {title: '添加人', key: 'creator_name'},
        {
          title: '操作',
          key: 'handle',
          width : 90,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-dele', params)
                  }
                }},
              '删除')
            }
          ]
        }
      ],
      // 表身
      energy_record_list:[],
      water_record_list:[],
      // 增加
      addMeterItem:{},
      addMeterShowModal:false,


      // 第四页-支出
      kitchen_expend_list:[],
      expend_list_columns: [
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '标题', key: 'title'},
        {title: '报账日期', key: 'expend_date'},
        {title: '登记时间', key: 'create_time'},
        {title: '金额总计', key: 'money'},
        {title: '备注', key: 'remark'},
      ],
      expend_page: {
        curmoney_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
    }
  },
  methods: {
    // 初始化
    // 获取厨房信息
    getKitchen( ){
      getKitchenList(  ).then(res => {
        let that = this;
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let kitchenList = dbody.data.list || [];
        kitchenList.forEach( (element, index)=>{
          if(this.kitchen_id*1 == element.id*1){
            this.kitchen = element;
            console.log(element)
            // that.initBaseInfo( that.kitchen );
          }
          return
        });
      })
    },
    // 获取店内列表
    getManageList(){
      getManageList().then(res => {
        const dbody = res.data
        this.manageList = dbody.data
      })
    },
    // 初始化数据
    setBaseInfo( obj ){
      this.eidtkitchen = Object.assign({position:0},obj);
      delete this.eidtkitchen.create_time
      delete this.eidtkitchen.update_time
      if(!this.eidtkitchen.manage_id){
        this.$Notice.warning({
            title: '店长必须选择！'
          })
        return false
      }
      if( isNaN(this.eidtkitchen.rent_day) || isNaN(this.eidtkitchen.operate_day)){
        this.$Notice.warning({
            title: '账单日期输入错误'
          })
        return false
      }
      if(this.eidtkitchen.rent_day*1 > 28 || this.eidtkitchen.operate_day*1 > 28){
        this.$Notice.warning({
            title: '账单日期不能大于28'
          })
        return false
      }
      return true;
    },
    // 第一页
    editBaseinfo(){
      if(this.setBaseInfo( this.kitchen )){
        let data = Object.assign({},this.eidtkitchen);
        this.manageList.forEach((item)=>{
          if(item.id == data.manage_id){
             data.manage_name =  item.fullname
          }
        })
        editKitchen(data).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          // 处理成功逻辑
          this.$Notice.warning({
            title: "保存成功！"
          })
        })
      }
    },
    // 第二页 档口页面
    // 获取档口列表
    getKitchenStoreList( obj ){
      getKitchenStoreList( obj ).then(res => {
        const dbody = res.data;
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if( !dbody.data.list || dbody.data.list.length <= 0){
          this.kitchenStoreList = [];
          return;
        }
        this.kitchenStoreList = dbody.data.list
        this.store_page = dbody.data.page
      })
    },
    // 点击分页
    getNewKitchenStorePage( page ){
      let data = { 
        kitchen_id : this.kitchen_id ,
        page : page ,
      }
      this.getKitchenStoreList( data );
    },
    // 添加验证
    //验证发送对象
    verifyObj( obj ){
      if( !obj.store_no ){
        this.$Notice.warning({
          title: '请输入档口名！'
        })
        return false
      }
      if(isNaN(obj.area*1) || obj.area*1 <= 0){
        this.$Notice.warning({
          title: '请输入正确面积！'
        })
        return false
      }
      if(isNaN(obj.entrance_fee*1)){
        this.$Notice.warning({
          title: '请输入原价入场费！'
        })
        return false
      }
      if(isNaN(obj.entrance_sell*1)){
        this.$Notice.warning({
          title: '请输入实际入场费！'
        })
        return false
      }
      if(isNaN(obj.rent_fee*1)){
        this.$Notice.warning({
          title: '请输入原价入场费！'
        })
        return false
      }
      if(isNaN(obj.rent_sell*1)){
        this.$Notice.warning({
          title: '请输入实际入场费！'
        })
        return false
      }
      return true;
    },
    // 添加档口弹窗
    showAddModalFn(){
      this.addStore = {};
      this.showAddModal = true;
    },
    // 保存添加档口 - 弹窗
    saveAddModalInfo () {
      if( this.verifyObj( this.addStore ) ){
        let obj = this.addStore;
        obj.kitchen_id = this.kitchen_id;
        addKitchenStore( obj ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: "添加成功！"
          })
          this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
        })
      }
    },
    // 编辑弹窗
    // 编辑档口弹窗
    handleEdit (params) {
      this.editStore = {};
      this.store_id = '';
      this.store_id  =  params.row.id ;
      this.editStore.store_no = params.row.store_no;
      this.editStore.area = params.row.area;
      this.editStore.entrance_fee = params.row.entrance_fee;
      this.editStore.entrance_sell = params.row.entrance_sell;
      this.editStore.rent_fee = params.row.rent_fee;
      this.editStore.rent_sell = params.row.rent_sell;
      this.showEditModal = true;
    },
    // 编辑修改
    saveEditModalInfo () {
      if( this.verifyObj( this.editStore ) ){
        let obj = this.editStore;
        obj.kitchen_id = this.kitchen_id;
        obj.id = this.store_id;
        editKitchenStore( obj ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: '修改成功！'
          })
          this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
        })
      }
    },
    // 删除弹窗
    handleDele (params) {
      this.store_id = '';
      this.store_id = params.row.id;
      this.showDeleModal = true
    },
    // 删除操作
    saveDeleModalInfo () {
      deleKitchenStore({ id: this.store_id }).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: '删除成功！'
        })
        this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
      })
    },
    // 第三页
    // 获取电表水表
    getKitchenMeterList( obj ){
      getKitchenMeterList( obj ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let arr = dbody.data;
        let arr_e = [];
        let arr_w = [];
        arr.forEach( function(element, index) {
          if(element.meter_type*1  == 1){
            arr_e.push(element)
          }else{
            arr_w.push(element)
          }
        });
        this.energy_record_list = arr_e;
        this.water_record_list = arr_w;
      })
    },
    // 增加公摊表
    addMeter( meter_type ){
      this.addMeterItem = {};
      this.addMeterItem.meter_type = meter_type;
      this.addMeterShowModal = true;
    },
    // 确认增加
    addKitchenMeter(){
      if(!this.addMeterItem.meter_name){
        this.$Notice.warning({
          title: "表名必须填写！"
        })
        return
      }
      if(!this.addMeterItem.multiple){
        this.$Notice.warning({
          title: "倍率必须填写！"
        })
        return
      }
      this.addMeterItem.kitchen_id = this.kitchen_id;
      addKitchenMeter( this.addMeterItem ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "添加成功！"
        })
        this.getKitchenMeterList({ kitchen_id : this.kitchen_id});
      })
    },
    // 删除表
    deleteKitchenMeter(params){
      let id = params.row.id;
      deleteKitchenMeter( { id : id } ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "删除成功！"
        })
        this.getKitchenMeterList({ kitchen_id : this.kitchen_id});
      })
    },
    // 第四页 支出列表
    // 获取新页面
    getExpendNewPage (page) {
      let obj = {
        kitchen_id: this.kitchen_id,
        page:page
      }
      this.getKitchenExpendList( obj );
    },
    // 获取支出列表
    getKitchenExpendList( obj ){
      getKitchenExpendList( obj ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.kitchen_expend_list = dbody.data.list || [];
        this.expend_page = dbody.data.page;
      })
    },
  },
  created () {
    this.$nextTick(()=>{
        this.kitchen_id = this.$route.query.kitchen_id;
        // this.getKitchen();
        this.getManageList();
        this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
        this.getKitchenExpendList({ kitchen_id : this.kitchen_id});
        this.getKitchenMeterList({ kitchen_id : this.kitchen_id});
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
