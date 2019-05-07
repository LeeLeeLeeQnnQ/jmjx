<template>
  <div>
    <!-- 展示模版 -->
    <Modal title="账单信息" v-model="viewModal" scrollable>
      <Form :label-width="90">
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="店铺名称" class="cellTit">
                <span>{{viewItem.store_name}}</span>
            </FormItem>
            <FormItem label="档口编号" class="cellTit">
                <span>{{viewItem.store_no}}</span>
            </FormItem>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="账单月份" class="cellTit">
                <span>{{viewItem.month}}</span>
            </FormItem>
            <FormItem label="厨房名称" class="cellTit">
                <span>{{viewItem.kitchen_name}}</span>
            </FormItem>
            <FormItem label="公摊天数" class="cellTit">
                <span>{{viewItem.day_number}}</span>
            </FormItem>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="收费基数" class="cellTit">
                <span>{{viewItem.base_number}}</span>
            </FormItem>
        </Row>
        <Divider></Divider>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12" offset="8">
            <h3>费用列表</h3>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12">
            <FormItem label="垃圾及隔油池" class="cellTit">
                <span>{{viewItem.garbage_fee}}</span>
            </FormItem>
            <FormItem label="烟道清洗" class="cellTit">
                <span>{{viewItem.flue_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="消杀" class="cellTit">
                <span>{{viewItem.kill_fee}}</span>
            </FormItem>
            <FormItem label="网络使用费" class="cellTit">
                <span>{{viewItem.network_fee}}</span>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12">
            <FormItem label="库房费" class="cellTit">
                <span>{{viewItem.storage_fee}}</span>
            </FormItem>
            <FormItem label="工程增项" class="cellTit">
                <span>{{viewItem.project_fee}}</span>
            </FormItem>
            <FormItem label="罚款" class="cellTit">
                <span>{{viewItem.fine_fee}}</span>
            </FormItem>
            <FormItem label="物业管理费" class="cellTit">
                <span>{{viewItem.manage_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="卫生费" class="cellTit">
                <span>{{viewItem.health_fee}}</span>
            </FormItem>
            <FormItem label="一次性费用" class="cellTit">
                <span>{{viewItem.one_fee}}</span>
            </FormItem>
            <FormItem label="代收税费" class="cellTit">
                <span>{{viewItem.taxes_fee}}</span>
            </FormItem>
            <FormItem label="滞纳金" class="cellTit">
                <span>{{viewItem.overdue_fee}}</span>
            </FormItem>
            <FormItem label="代运营费" class="cellTit">
                <span>{{viewItem.operate_fee}}</span>
            </FormItem>
            <FormItem label="其他费用" class="cellTit">
                <span>{{viewItem.other_fee}}</span>
            </FormItem>
          </i-col>
        </Row>
        <Card shadow>
          <p slot="title">
              <Icon type="ios-flash-outline" /></Icon>
              电费部分
          </p>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <FormItem label="公摊电费" class="cellTit">
                  <span>{{viewItem.energy_share_fee}}</span>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="店铺电费" class="cellTit">
                  <span>{{viewItem.energy_fee}}</span>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Card shadow style="margin-top: 4px;">
          <p slot="title">
              <Icon type="ios-water-outline" /></Icon>
              水费部分
          </p>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <FormItem label="公摊水费" class="cellTit">
                  <span>{{viewItem.water_share_fee}}</span>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="店铺水费" class="cellTit">
                  <span>{{viewItem.water_fee}}</span>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="4">
            <FormItem label="总计：">
                <h3>{{viewItem.total}}</h3>
            </FormItem>
          </i-col>
        </Row>
        <Divider></Divider>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12" offset="8">
            <h3>留言</h3>
          </i-col>
          <FormItem label="留言" class="cellTit">
              <span>{{viewItem.remark}}</span>
          </FormItem>
        </Row>
      </Form>
    </Modal>
    <!-- 头部搜索 按钮 -->
    <Card shadow style="margin-top: 5px">
<!--       <h3 slot="extra" >
          公摊总天数：999
      </h3> -->
      <Row type="flex" justify="start" align="middle" :gutter="20">
        <i-col span="20">
          <Select v-model="select_kitchen_id" style="width: 200px;margin-right:10px;" @on-change="selectKitchen">
            <Option v-for="item in kitchen" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
          <DatePicker type="month" :value="select_time" placeholder="选择月份" format="yyyy-MM" @on-change="selectDate" style="width: 200px"></DatePicker>
        </i-col>
      </Row>
      <Row type="flex" justify="start" align="middle" :gutter="20" style="margin-top: 5px;">
        <i-col :xs="4" :md="4" :lg="4">
          <Input v-model="keyword" @on-change="changeKeyword" style="width: 200px" placeholder="请输入店铺名称/档口号"/>
        </i-col>
      </Row>
    </Card>
    <Card shadow>
      <Modal v-model="showEditStoreRentBillModal" title="编辑房租" @on-ok="editStoreRentBill" :mask-closable="false">
        <Form :model="storeRentBill" :label-width="80">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="22">
              <FormItem>
                <span>{{storeRentBill.month}} / {{storeRentBill.store_name}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="房租">
                <Input v-model="storeRentBill.rent_fee" style="width: 200px" ></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="滞纳金">
                <Input v-model="storeRentBill.rent_overdue_fee" style="width: 200px" ></Input>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Modal>
      <Modal v-model="paymentModal" scrollable @on-ok="editStoreRunBill" fullscreen>
        <Form ref="paymentForm" :model="paymentItem" :label-width="110">
          <Card style="border:1px solid #2db7f5;">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="店铺名称">
                    <span>{{paymentItem.store_name}}</span>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="档口编号">
                    <span>{{paymentItem.store_no}}</span>
                </FormItem>
              </i-col>
            </Row>

            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="账单月份">
                    <span>{{paymentItem.month}}</span>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="厨房名称">
                    <span>{{paymentItem.kitchen_name}}</span>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="收费基数">
                    <Input v-model="paymentItem.base_number" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>


            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="公摊天数">
                    <span>{{paymentItem.day_number}}</span>
                </FormItem>
              </i-col>
            </Row>


            <!-- <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="开始日期">
                  <DatePicker type="date" placeholder="开始日期" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="结束日期">
                  <DatePicker type="date" placeholder="结束日期" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="公摊天数">
                    <span>{{paymentItem.day_number}}</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <FormItem>
                <Alert type="warning">修改公摊日期会更改全部厨房账单金额！保存后查看厨房账单变更数据！</Alert>
              </FormItem>
            </Row>
            </Row> -->
            
          </Card>
          <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="周期性费用">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="垃圾及隔油池">
                    <Input v-model="paymentItem.garbage_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="烟道清洗">
                    <Input v-model="paymentItem.flue_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="消杀">
                    <Input v-model="paymentItem.kill_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="网络使用费">
                    <Input v-model="paymentItem.network_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="库房费">
                    <Input v-model="paymentItem.storage_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="卫生费">
                    <Input v-model="paymentItem.health_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
          </Card>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="电费">
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <FormItem label="公摊电费">
                      <Input v-model="paymentItem.energy_share_fee" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                  <FormItem label="商户电费">
                      <Input v-model="paymentItem.energy_fee" readonly></Input>
                  </FormItem>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <FormItem label="电表起始值">
                      <Input v-model="paymentItem.energy_start" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                  <FormItem label="电表结束值">
                      <Input v-model="paymentItem.energy_end" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <FormItem label="电表倍率">
                      <Input v-model="paymentItem.energy_multiple" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                </Row>
              </Card>
            </i-col>
            <i-col span="12">
              <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="水费">
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <FormItem label="公摊水费">
                      <Input v-model="paymentItem.water_share_fee" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                  <FormItem label="商户水费">
                      <Input v-model="paymentItem.water_fee" readonly></Input>
                  </FormItem>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <FormItem label="水表起始值">
                      <Input v-model="paymentItem.water_start" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                  <FormItem label="水表结束值">
                      <Input v-model="paymentItem.water_end" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <FormItem label="水表倍率">
                      <Input v-model="paymentItem.water_multiple" @on-change="updateComputedPaper"></Input>
                  </FormItem>
                </Row>
              </Card>
            </i-col>
          </Row>
          <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="其他">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="工程增项">
                    <Input v-model="paymentItem.project_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="罚款">
                    <Input v-model="paymentItem.fine_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="一次性费用">
                    <Input v-model="paymentItem.one_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="滞纳金">
                  <Input v-model="paymentItem.overdue_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="代运营费">
                  <Input v-model="paymentItem.operate_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="代收税费">
                    <Input v-model="paymentItem.taxes_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="物业管理费">
                    <Input v-model="paymentItem.manage_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="其他费用">
                    <Input v-model="paymentItem.other_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
          </Card>
           <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="备注">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="20">
                <FormItem label="备注">
                  <Input v-model="paymentItem.remark" type="textarea" :rows="4" placeholder="备注" />
                </FormItem>
              </i-col>
            </Row>
          </Card>
          <Card style="margin-top: 5px;">
            <h3>总计：{{paymentItem.total}}</h3>
          </Card>
        </Form>
      </Modal>
      <tables 
        :columns="bill_columns"
        v-model="bill_list"
        @data-view="viewEnergyBill"
        @data-edit-rent="showEditStoreRentBill"
        @data-edit-run="showEditStoreRunBill"></tables>
      <Page
        :total="page.total"
        :page-size="page.list_rows"
        @on-change="getNewPage"
        style="margin-top:10px;"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
// 权限
// /api/Kitchen/index,/api/StoreBill/index,/api/StoreCharge/queryList,/api/StoreBill/edit,/api/StoreCharge/add
import { getKitchenList } from '@/api/setting'
import { getStoreBillList , getStoreChargeItem , editStoreBillItem , addStoreCharge } from '@/api/kitchen'
export default {
  name: 'kitchen-kitchen-bill',
  components: {
    Tables
  },
  data () {
    return {
      // 搜索
      kitchen:[],
      select_time:'',
      select_kitchen:[],
      select_kitchen_id:'',
      keyword:'',
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 表格
      bill_columns:[
        {title: '厨房', key: 'kitchen_name'},
        {title: '月份', key: 'month'},
        {title: '商户', key: 'store_name'},
        {title: '档口号', key: 'store_no'},
        // {title: '公摊天数', key: 'day_number'},
        { title: '经营费用',
          render: (h, params) => {
            let operate_fee = params.row.operate_fee;
            let operate_overdue_fee = params.row.operate_overdue_fee;
            let fee = (operate_fee*1 + operate_overdue_fee*1).toFixed(2);
            return h('span', fee)
          }
        },
        { title: '房租',
          render: (h, params) => {
            let rent_fee = params.row.rent_fee;
            let rent_overdue_fee = params.row.rent_overdue_fee;
            let fee = (rent_fee*1 + rent_overdue_fee*1).toFixed(2);
            return h('span', fee)
          }
        },
        // {title: '往期未缴', 
        //   render: (h, params) => {
        //     let is_new = params.row.new*1;
        //     let arrears_fee = '';
        //     if(is_new == 1){
        //       arrears_fee = params.row.arrears_fee;
        //     }else{
        //       arrears_fee = '----';
        //     }
        //     return h('span', arrears_fee)
        //   }
        // },
        {title: '往期未缴', 
          render: (h, params) => {
            let arrears_fee = params.row.arrears_fee;
            return h('span', arrears_fee)
          }
        },
        // { title: '总未缴款',
        //   render: (h, params) => {
        //     let store_account = params.row.store_account;
        //     if(store_account*1 > 1000){
        //       return h('span', { style: {color: '#ff9900'}}, store_account)
        //     }else if( store_account*1 > 0){
        //       return h('span', { style: {color: '#2d8cf0'}}, store_account)
        //     }else{
        //       return h('span', { style: {color: '#19be6b'}}, store_account)
        //     }
        //   }
        // },
        { title: '总未缴款',
          key: 'unpaid_fee',
          render: (h, params) => {
            let operate_fee = params.row.operate_fee;
            let operate_overdue_fee = params.row.operate_overdue_fee;
            let fee1 = (operate_fee*1 + operate_overdue_fee*1).toFixed(2);

            let rent_fee = params.row.rent_fee;
            let rent_overdue_fee = params.row.rent_overdue_fee;
            let fee2 = (rent_fee*1 + rent_overdue_fee*1).toFixed(2);



            let unpaid_fee =(fee1*1 + fee2*1 + params.row.arrears_fee*1).toFixed(2);
            if(unpaid_fee*1 > 1000){
              return h('span', { style: {color: '#ff9900'}}, unpaid_fee)
            }else if( unpaid_fee*1 > 0){
              return h('span', { style: {color: '#2d8cf0'}}, unpaid_fee)
            }else{
              return h('span', { style: {color: '#19be6b'}}, unpaid_fee)
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '经营费用')
            }
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          width :180,
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '编辑经营费用！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-run', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '8px'}
                }, '经营费用')
              ])
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '编辑租金！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-rent', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '8px'}
                }, '租金')
              ])
            },
          ]
        },
      ],
      bill_list:[],
      // 编辑商户账单
      storeRentBill:{},
      showEditStoreRentBillModal:false,
      // 查看能源账单
      viewModal:false,
      viewItem:{},
      // 编辑经营费用
      paymentModal:false,
      paymentItem:{},
      // 电表记录
      energy_record_list:[],
      water_record_list:[],
      record_list:[],
      // 基本数据
      showInfo:{},
    }
  },
  methods: {
    // 搜索
    // 选择厨房
    selectKitchen(){
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword})
    },
    //选择时间
    selectDate(date){
      this.select_time  = date;
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword })
    },
    changeKeyword( ){
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword })
    },
    // 选择新页面
    getNewPage(page){
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword , page :page })
    },
    // 显示弹窗
    showEditStoreRentBill(params){
      this.storeRentBill = {}
      this.storeRentBill.id = params.row.id;
      this.storeRentBill.rent_fee = params.row.rent_fee;
      this.storeRentBill.rent_overdue_fee = params.row.rent_overdue_fee;
      this.storeRentBill.month = params.row.month;
      this.storeRentBill.store_name = params.row.store_name;
      this.showEditStoreRentBillModal = true;
    },
    // 编辑经营费用
    editStoreRunBill(){
      let data = {};
      data.id = this.paymentItem.row.id;
      data.month = this.paymentItem.row.month;
      data.operate_fee = (this.paymentItem.total*1 - this.paymentItem.overdue_fee*1).toFixed(2);
      data.operate_overdue_fee = this.paymentItem.overdue_fee;
      editStoreBillItem( data ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        delete this.paymentItem.create_time
        delete this.paymentItem.update_time
        delete this.paymentItem.id
        addStoreCharge(this.paymentItem).then(res => {
          const dbody = res.data
          if(dbody.code != 0){
            this.$Notice.warning({
              title: dbody.msg,
            })
            return;
          }
          this.$Notice.warning({
            title: "修改成功！"
          })
          this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword , page : this.page.current_page })
        })
      });
    },
    // 编辑商户月租金
    editStoreRentBill(){
      if(isNaN(this.storeRentBill.rent_fee*1)){
        this.$Notice.warning({
          title: '房租非数字！'
        })
        return
      }
      if(isNaN(this.storeRentBill.rent_overdue_fee*1)){
        this.$Notice.warning({
          title: '房租滞纳金非法！'
        })
        return
      }
      editStoreBillItem( this.storeRentBill ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        this.$Notice.warning({
          title: "修改成功！",
        })
        this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword , page : this.page.current_page })
      });
    },
    // 查看能源账单
    viewEnergyBill(params){
      this.viewItem = {};
      let store_id = params.row.store_id;
      let data = { month : this.select_time , kitchen_id:this.select_kitchen_id , store_id: store_id};
      getStoreChargeItem( data ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        if(dbody.data.length > 0){
          this.viewItem = {};
          this.viewItem = dbody.data[0];
          this.viewItem.water_value = this.viewItem.water_start - this.viewItem.water_end;
          this.viewItem.energy_value = this.viewItem.water_value - this.viewItem.energy_end;
          this.viewItem.total = this.getPayItemTotal(this.viewItem);
          this.viewModal = true;
        }else{
          this.$Notice.warning({
            title: "抄表记录不完善！"
          })
        }
      });
    },
    // 计算合计
    getPayItemTotal( info ){
      let total = 0;
      total = info.garbage_fee*1 + total;
      total = info.water_fee*1 + total;
      total = info.energy_fee*1 + total;
      total = info.water_share_fee*1 + total;
      total = info.energy_share_fee*1 + total;
      total = info.flue_fee*1 + total;
      total = info.kill_fee*1 + total;
      total = info.network_fee*1 + total;
      total = info.storage_fee*1 + total;
      total = info.health_fee*1 + total;
      total = info.fine_fee*1 + total;
      total = info.one_fee*1 + total;
      total = info.other_fee*1 + total;
      total = info.operate_fee*1 + total;
      total = info.project_fee*1 + total;
      total = info.taxes_fee*1 + total;
      total = info.overdue_fee*1 + total;
      return total.toFixed(2);
    },
    // 获取账单列表
    getStoreBillList(data){
      getStoreBillList(data).then(res => {
        const dbody = res.data
        this.page = dbody.data.page;
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        if(!dbody.data.list){
          this.bill_list = [];
        }else{
          this.bill_list = dbody.data.list;
        }
      });
    },
    // 显示弹窗
    showEditStoreRunBill(params){
      let store_id = params.row.store_id;
      let data = { month : this.select_time , kitchen_id:this.select_kitchen_id , store_id: store_id};
      getStoreChargeItem( data ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        if(dbody.data.length > 0){
          this.buildPayment(dbody.data[0],params)
        }else{
          this.$Notice.warning({
            title: "抄表信息不全！"
          })
        }
      });
    },
    // 编辑一个条目
    buildPayment( stroe , params ){
      let that = this;
      // 初始化数据
      this.paymentItem = {};
      this.paymentItem = stroe;
      this.paymentItem.row = params.row;
      this.paymentItem.total = this.getPayItemTotal(stroe);
      this.paymentModal = true;
    },
    // 获取本年月份列表
    getDayMany ( year, month ) {
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    // 计算总额
    computedPaper( info ){
      let base_number = info.base_number*1 ;
      let day_number = info.day_number*1 ;
      // let year = this.select_time.split('-')[0];
      // let month = this.select_time.split('-')[1];
      let days = 30;
      // garbage_fee 垃圾及隔油池
      // info.garbage_fee = (day_number*1 / days * base_number * this.showInfo.garbage_fee*1).toFixed(2);
      // water_start 水费差
      if( (isNaN(info.water_start) || info.water_start<0 ) || (isNaN(info.water_end) || info.water_end<0) ){
        info.water_fee = 0.00
      }else{
        if(info.water_start*1 > info.water_end*1){
          info.water_fee = 0.00
        }else{
          info.water_value = (info.water_end*1 - info.water_start*1).toFixed(2);
          info.water_fee = (info.water_value*1 * base_number * this.showInfo.water_fee*1 * info.water_multiple).toFixed(2);
        }
      }
      // energy_start 电费差
      if((isNaN(info.energy_start) || info.energy_start<0) || (isNaN(info.energy_end) || info.energy_end<0) ){
        info.energy_fee = 0.00
      }else{
        if(info.energy_start*1 > info.energy_end*1){
          info.energy_fee = 0.00
        }else{
          info.energy_value = (info.energy_end*1 - info.energy_start*1).toFixed(2);
          info.energy_fee = (info.energy_value*1 * base_number * this.showInfo.energy_fee*1 * info.energy_multiple).toFixed(2);
        }
      }
      // flue_fee 烟道清洗
      // info.flue_fee = (day_number*1 / days * base_number * this.showInfo.flue_fee*1).toFixed(2)
      // kill_fee 消杀
      // info.kill_fee = (day_number*1 / days * base_number * this.showInfo.kill_fee*1).toFixed(2)
      // network_fee 网络使用费
      // info.network_fee = (day_number*1 / days * base_number * this.showInfo.network_fee*1).toFixed(2);
      // storage_fee 库房费
      // info.storage_fee = (day_number*1 / days * base_number * this.showInfo.storage_fee*1).toFixed(2);
      //  health_fee 卫生费
      // info.health_fee = (day_number*1 / days * base_number * this.showInfo.health_fee*1).toFixed(2);

      // 总计
      info.total = '';
      info.total = this.getPayItemTotal(info);
      this.paymentModal = true;
    },
    // 计算激活
    updateComputedPaper(){
      this.paymentModal = false;
      this.computedPaper( this.paymentItem )
    },
    // 初始化基础
    initBaseData ( info ){
      this.showInfo = {};
      // 垃圾及隔油池
      this.showInfo.garbage_fee = info.garbage_fee;
      // 烟道清洗
      this.showInfo.flue_fee = info.flue_fee;
      // 消杀
      this.showInfo.kill_fee = info.kill_fee;
      // 网络使用费
      this.showInfo.network_fee = info.network_fee;
      // 水费基数
      this.showInfo.water_fee = info.water_fee;
      // 电费基数
      this.showInfo.energy_fee = info.energy_fee;
      // 库房费
      this.showInfo.storage_fee = info.storage_fee;
      // 卫生费
      this.showInfo.health_fee = info.health_fee;
      // 活跃档口数量
      this.showInfo.store_count  = info.store_count;
    },
    //初始化
    initData( info ){
      // 基本属性
      this.initBaseData( this.select_kitchen );
      // 获取账单列表
      this.getStoreBillList( info );
    },
  },
  created () {
    // 获取当前时间
    let mYear = new Date().getFullYear();
    let mMonth = (new Date().getMonth() + 1) + '';
    mMonth = mMonth < 10 ? "0" + mMonth : mMonth;
    this.select_time = mYear +'-'+ mMonth;
    // 获取厨房列表
    getKitchenList().then(res => {
      const dbody = res.data
      this.kitchen = dbody.data.list || [];
      this.select_kitchen = this.kitchen[this.kitchen.length*1-1];
      this.select_kitchen_id = this.select_kitchen.id;
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id })
    })
  },
  computed:{
  }
}
</script>

<style lang="less">
  .cellTit{
    margin-bottom: 12px;
    span{
      color:#fff;
      background-color:#3399ff;
      border-radius:5px;
      padding:5px 8px;
      margin-right: 10px;
      // color:#464c5b;
      // border:1px solid #464c5b;
    }
  }

</style>
