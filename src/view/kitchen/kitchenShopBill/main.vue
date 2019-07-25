<template>
  <div>
    <!-- 展示模版 -->
    <Modal title="账单信息" v-model="viewModal" scrollable>
      <Form :label-width="120">
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
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="公摊天数" class="cellTit">
                <span>{{viewItem.day_number}}</span>
            </FormItem>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="本月公摊开始日期" class="cellTit">
                <span>{{viewItem.share_start_date}}</span>
            </FormItem>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="本月公摊结束日期" class="cellTit">
                <span>{{viewItem.share_end_date}}</span>
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
                <span>{{viewItem.operate_overdue_fee}}</span>
            </FormItem>
            <FormItem label="代运营费" class="cellTit">
                <span>{{viewItem.operating_fee}}</span>
            </FormItem>
            <FormItem label="其他费用" class="cellTit">
                <span>{{viewItem.other_fee}}</span>
            </FormItem>
            <FormItem label="经营费用减免" class="cellTit">
                <span>{{viewItem.operate_exempt_fee}}</span>
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
      <h3 slot="extra" >
          公摊总天数：{{count_days}}
      </h3>
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
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="房租减免">
                <Input v-model="storeRentBill.rent_exempt_fee" style="width: 200px" ></Input>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Modal>
      <Modal v-model="paymentModal" scrollable @on-ok="editStoreRunBill" width="900">
        <Form ref="paymentForm" :model="paymentItem">
          <Card style="border:1px solid #2db7f5;">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="12">
                <FormItem label="店铺名称">
                    <span>{{paymentItem.store_name}}</span>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="档口编号">
                    <span>{{paymentItem.store_no}}</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="账单月份">
                    <span>{{paymentItem.month}}</span>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="厨房名称">
                    <span>{{paymentItem.kitchen_name}}</span>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="公摊天数">
                    <span>{{paymentItem.day_number}}</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="店铺收费基数">
                    <span>{{paymentItem.base_number}}</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="本月公摊开始日期">
                    <span>{{paymentItem.share_start_date}}</span>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="本月公摊结束日期">
                    <span>{{paymentItem.share_end_date}}</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="24">
                <FormItem>
                  <Button type="primary" @click="goKitchenShopEdit2">编辑店铺信息</Button>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="24">
                <FormItem>
                  <Alert type="warning">修改店铺公摊开始日期与结束日期会影响本月账单公摊！修改完毕后请刷新页面！</Alert>
                </FormItem>
              </i-col>
            </Row>
          </Card>
          <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="周期性费用">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="垃圾及隔油池">
                    <span>{{paymentItem.garbage_fee}}</span>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="烟道清洗">
                    <span>{{paymentItem.flue_fee}}</span>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="消杀">
                    <span>{{paymentItem.kill_fee}}</span>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="网络使用费">
                    <span>{{paymentItem.network_fee}}</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="库房费">
                  <span>{{paymentItem.storage_fee}}</span>
                </FormItem>
              </i-col>
              <i-col span="4">
                <FormItem label="卫生费">
                  <span>{{paymentItem.health_fee}}</span>
                </FormItem>
              </i-col>
            </Row>
          </Card>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="电费">
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <i-col span="24">
                    <FormItem label="公摊电费" style="width: 100%'">
                      <span>{{paymentItem.energy_share_fee}}</span>
                    </FormItem>
                  </i-col>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <i-col span="8">
                    <FormItem label="商户电费">
                      <span>{{paymentItem.energy_fee}}</span>
                    </FormItem>
                  </i-col>
                  <i-col span="8">
                    <FormItem label="电表起始值">
                      <span>{{paymentItem.energy_start}}</span>
                    </FormItem>
                  </i-col>
                  <i-col span="8">
                    <FormItem label="电表结束值">
                      <span>{{paymentItem.energy_end}}</span>
                    </FormItem>
                  </i-col>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <i-col span="24">
                    <FormItem label="电表倍率">
                      <span>{{paymentItem.energy_multiple}}</span>
                    </FormItem>
                  </i-col>
                </Row>
              </Card>
            </i-col>
            <i-col span="12">
              <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="水费">
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <i-col span="24">
                    <FormItem label="公摊水费">
                      <span>{{paymentItem.water_share_fee}}</span>
                    </FormItem>
                  </i-col>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <i-col span="8">
                    <FormItem label="商户水费">
                      <span>{{paymentItem.water_fee}}</span>
                    </FormItem>
                  </i-col>
                  <i-col span="8">
                    <FormItem label="水表起始值">
                      <span>{{paymentItem.water_start}}</span>
                    </FormItem>
                  </i-col>
                  <i-col span="8">
                    <FormItem label="水表结束值">
                      <span>{{paymentItem.water_end}}</span>
                    </FormItem>
                  </i-col>
                </Row>
                <Row type="flex" justify="start" align="middle" :gutter="20">
                  <i-col span="24">
                    <FormItem label="水表倍率">
                      <span>{{paymentItem.water_multiple}}</span>
                    </FormItem>
                  </i-col>
                </Row>
              </Card>
            </i-col>
            <i-col span="24" style="margin-top: 10px;">
              <FormItem>
                <Button type="primary" @click="goKitchenRecord">修改抄表信息</Button>
              </FormItem>
            </i-col>
            <i-col span="24">
              <FormItem>
                <Alert type="warning">修改抄表信息会影响本月账单公摊！修改完毕后请刷新页面！</Alert>
              </FormItem>
            </i-col>
          </Row>
          <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="其他">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="工程增项">
                    <Input v-model="paymentItem.project_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="罚款">
                    <Input v-model="paymentItem.fine_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="一次性费用">
                    <Input v-model="paymentItem.one_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="滞纳金">
                  <Input v-model="paymentItem.operate_overdue_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="代运营费">
                  <Input v-model="paymentItem.operating_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="代收税费">
                    <Input v-model="paymentItem.taxes_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="8">
                <FormItem label="物业管理费">
                    <Input v-model="paymentItem.manage_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="其他费用">
                    <Input v-model="paymentItem.other_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="经营费用减免">
                    <Input v-model="paymentItem.operate_exempt_fee" @on-change="updateComputedPaper"></Input>
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
        :stripe="true"
        :columns="bill_columns"
        v-model="bill_list"
        @data-view="viewEnergyBill"
        @data-edit-rent="showEditStoreRentBill"
        @data-edit-run="showEditStoreRunBill"></tables>
     <!--  <Page
        :total="page.total"
        :page-size="page.list_rows"
        @on-change="getNewPage"
        style="margin-top:10px;"/> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
// 权限
// Kitchen/index,StoreBill/queryList,StoreCharge/queryList,StoreBill/edit,StoreCharge/add
import { getKitchenQueryList } from '@/api/setting'
import { getStoreBillList , getStoreChargeItem , editStoreBillItem , addStoreCharge } from '@/api/kitchen'
export default {
  name: 'kitchenShopBill',
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
        {title: '公摊天数', key: 'day_number'},
        { title: '经营费用',
          render: (h, params) => {
            let operate_fee = params.row.operate_fee;
            let operate_overdue_fee = params.row.operate_overdue_fee;
            let operate_exempt_fee = params.row.operate_exempt_fee;
            let fee = (operate_fee*1 + operate_overdue_fee*1 - operate_exempt_fee*1).toFixed(2);
            return h('span', fee)
          }
        },
        { title: '房租',
          render: (h, params) => {
            let rent_fee = params.row.rent_fee;
            let rent_overdue_fee = params.row.rent_overdue_fee;
            let rent_exempt_fee = params.row.rent_exempt_fee;
            let fee = (rent_fee*1 + rent_overdue_fee*1 - rent_exempt_fee*1).toFixed(2);
            return h('span', fee)
          }
        },
        {title: '往期未缴', 
          render: (h, params) => {
            let is_new = params.row.new*1;
            let store_account = '';
            if(is_new == 1){
              store_account = params.row.store_account;
            }else{
              store_account = '----';
            }
            return h('span', store_account)
          }
        },
        { title: '总未缴款',
          render: (h, params) => {
            
            let is_deposit = params.row.is_deposit;

            let operate_fee = params.row.operate_fee;
            let operate_overdue_fee = params.row.operate_overdue_fee;
            let operate_exempt_fee = params.row.operate_exempt_fee;
            let fee1 = (operate_fee*1 + operate_overdue_fee*1 - operate_exempt_fee*1).toFixed(2);

            let rent_fee = params.row.rent_fee;
            let rent_overdue_fee = params.row.rent_overdue_fee;
            let rent_exempt_fee = params.row.rent_exempt_fee;
            let fee2 = (rent_fee*1 + rent_overdue_fee*1  - rent_exempt_fee*1).toFixed(2);

            let store_account = params.row.store_account || 0;
            let pay_fee = params.row.pay_fee || 0;

            let unpaiy = (fee1*1 + fee2*1 + store_account*1 - pay_fee*1).toFixed(2);
            if(is_deposit*1 == 1){
              return h('span', { style: {color: '#67ba23'}}, '押金已抵扣')
            }
            if(unpaiy*1 > 1000){
              return h('span', { style: {color: '#ff9900'}}, unpaiy)
            }else if( unpaiy*1 > 0){
              return h('span', { style: {color: '#2d8cf0'}}, unpaiy)
            }else{
              return h('span', { style: {color: '#19be6b'}}, unpaiy)
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
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          width :90,
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                style: {
                  margin:'5px 0 ',
                },
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
                  style: {marginLeft: '0px'}
                }, '经营费用')
              ])
            },
            (h, params, vm) => {
              return h('Poptip', {
                style: {
                  margin:'5px 0 ',
                },
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
                  style: {marginLeft: '0px'}
                }, '租金')
              ])
            },
          ]
        },
      ],
      bill_list:[],
      // 总公摊天出
      count_days:0,
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
    // getNewPage(page){
    //   this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword , page :page })
    // },
    // 显示弹窗
    showEditStoreRentBill(params){
      this.storeRentBill = {}
      this.storeRentBill.id = params.row.id;
      this.storeRentBill.rent_fee = params.row.rent_fee;
      this.storeRentBill.rent_overdue_fee = params.row.rent_overdue_fee;
      this.storeRentBill.rent_exempt_fee = params.row.rent_exempt_fee;
      this.storeRentBill.month = params.row.month;
      this.storeRentBill.store_name = params.row.store_name;
      this.showEditStoreRentBillModal = true;
    },
    // 编辑经营费用
    editStoreRunBill(params){
      delete this.paymentItem.create_time
      delete this.paymentItem.operate_fee
      delete this.paymentItem.rent_fee
      delete this.paymentItem.rent_overdue_fee
      delete this.paymentItem.update_time
      editStoreBillItem( this.paymentItem ).then(res => {
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
        this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword })
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
        this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword })
      });
    },
    // 查看能源账单
    viewEnergyBill(params){
      this.viewItem = {};
      this.viewItem = params.row;
      this.viewItem.water_value = this.viewItem.water_start - this.viewItem.water_end;
      this.viewItem.energy_value = this.viewItem.water_value - this.viewItem.energy_end;
      this.viewItem.total = this.getPayItemTotal(this.viewItem);
      this.viewModal = true;
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
      total = info.operating_fee*1 + total;
      total = info.project_fee*1 + total;
      total = info.taxes_fee*1 + total;
      total = info.operate_overdue_fee*1 + total;
      total = total - info.operate_exempt_fee*1;
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
        this.bill_list = dbody.data.list || [];
        this.count_days = dbody.data.days || 0;
      });
    },
    // 显示弹窗
    showEditStoreRunBill(params){
      this.paymentItem = Object.assign({}, params.row);
      this.paymentItem.total = this.getPayItemTotal(this.paymentItem);
      this.paymentModal = true;
    },
    // 账单开始时间
    selectStartDate(date){
      this.paymentItem.start_date;
    },
    // 账单开始时间
    selectEndDate(date){
      this.paymentItem.end_date;
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
    // 跳转商户编辑
    goKitchenShopEdit2(){
      let id = this.paymentItem.store_id;
      let kitchen_id = this.paymentItem.kitchen_id;
      const href = "./kitchenShopEditB?id="+ id +"&kitchen_id="+ kitchen_id +"&tabValue=2";
      window.open(href, '_blank')
    },
    // 跳转抄表界面
    goKitchenRecord(){
      const href = "./kitchenStoreRecord";
      window.open(href, '_blank')
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
    getKitchenQueryList().then(res => {
      const dbody = res.data
      this.kitchen = dbody.data || [];
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
