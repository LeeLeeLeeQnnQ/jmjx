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
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <!-- 预览凭证 -->
    <Modal title="凭证预览" v-model="showStoreBudgetList">
      <div class="img-upload-list" v-for="item in storeBudgetList">
        <div>
          <img :src="item">
          <div class="img-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 头部搜索 按钮 -->
    <Card shadow style="margin-top: 5px">
 <!--      <h3 slot="extra" >
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
      <Modal v-model="showAddStorePayModal" title="编辑商户账单" @on-ok="addStorePay" :mask-closable="false">
        <Form :model="storeBill" :label-width="120">
          <Card shadow>
            <p slot="title">
                <Icon type="logo-usd" />
                {{storeBill.month}} {{storeBill.store_name}}  总未缴款 : {{storeBill.store_account}} 
            </p>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="本次缴纳金额">
                  <Input v-model="storeBill.money" style="width: 200px"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="20">
                <FormItem label="本次缴纳凭证">
                  <div class="img-upload-list" v-for="item in uploadLetter">
                    <div>
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item,'uploadLetter')"></Icon>
                      </div>
                    </div>
                  </div>
                  <Upload
                      ref="uploadLetter"
                      :show-upload-list="false"
                      :on-success="uploadLetterSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="4200"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload"
                      multiple
                      type="drag"
                      action="/api/Index/upload"
                      style="display: inline-block;width:60px;">
                      <div style="width: 60px;height:60px;line-height: 60px;">
                          <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="20">
                <FormItem label="备注">
                  <Input v-model="storeBill.remark" type="textarea" :rows="3" placeholder="备注"/>
                </FormItem>
              </i-col>
            </Row>
          </Card>
        </Form>
      </Modal>
      <Modal v-model="showEditStoreBudgetModal" title="本月上缴" :mask-closable="false" width="80%">
        <tables :columns="budget_columns" v-model="budget_list" @data-delete="deleteStoreBudget" @voucher-view="showStoreBudgetVoucher"></tables>
      </Modal>
      <tables 
        :columns="bill_columns"
        v-model="bill_list"
        @data-view-rent="viewEnergyBill"
        @data-add="showAddStorePay"
        @data-print-energy="printEnergyBill"
        @data-print-rent="printRentBill"
        @data-view-list="showEditStoreBudget" ></tables>
      <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Card>
    <!-- 打印部分 -->
    <!-- <div> -->
    <div style="display: none;">
      <PrintEnergy id="printEnergy" :print_info="print_energy_info"></PrintEnergy>
    </div>
    <div style="display: none;">
      <PrintRent id="printRent" :print_info="print_rent_info"></PrintRent>
    </div>
  </div>
</template>

<script>
import Tables from '_c/tables'
import printJS from 'print-js'
import PrintEnergy from '_c/print-energy'
import PrintRent from '_c/print-rent'
// 权限
// /api/Index/getKitchenList,/api/StoreBill/index,/api/StoreCharge/queryList,/api/StoreBill/queryPayList,/api/StoreBill/addStoreBillPay,/api/StoreBill/deleteStoreBillPay
import { getKitchenList  } from '@/api/data'
import { getStoreBillList , getStoreChargeItem } from '@/api/kitchen'
import { getStoreBillPayList , addStoreBillPay  , deleteStoreBillPay } from '@/api/finance'
export default {
  name: 'finance-kitchen-bill',
  components: {
    Tables,
    printJS,
    PrintEnergy,
    PrintRent
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



            let unpaid_fee =(fee1*1 + fee2*1 - params.row.pay_fee*1).toFixed(2);
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
          width :90,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view-rent', params)
                  }
                }},
              '经营费用')
            }
          ]
        },
        {
          title: '打印',
          key: 'handle',
          // width :150,
          // width :90,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-print-energy', params)
                  }
                }},
              '经营费用')
            },
            // (h, params, vm) => {
            //   return h('Button', {
            //     style: {
            //       marginLeft:'5px',
            //     },
            //     props: {
            //       type: 'success',
            //       size: 'small'
            //     },
            //     on: {
            //       'click': () => {
            //         vm.$emit('data-print-rent', params)
            //       }
            //     }},
            //   '房租')
            // }
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          width :90,
          button: [
            (h, params, vm) => {
              return h('Button', {
                style: {},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view-list', params)
                  }
                }},
              '缴费列表')
            }
          ]
        },
        {
          title: '添加',
          key: 'handle',
          width :100,
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '添加商户收款！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-add', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '8px'}
                }, '添加上缴')
              ])
            }
          ]
        },
      ],
      bill_list:[],
      // 编辑商户账单
      storeBill:{},
      showAddStorePayModal:false,
      // 图片
      imgUrl: '',
      visible: false,
      // 上传
      uploadLetter:[],
      // 收支表格
      budget_columns:[
        {title: '金额', key: 'money'},
        {title: '操作时间', key: 'create_time'},
        {title: '操作人', key: 'employee_name'},
        {title: '备注', key: 'remark'},
        {
          title: '查看凭证',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                style: {},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('voucher-view', params)
                  }
                }},
              '查看凭证')
            }
          ]
        },
        {
          title: '操作',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                style: {},
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-delete', params)
                  }
                }},
              '删除')
            }
          ]
        },
      ],
      budget_list:[],
      // 展示收支
      showEditStoreBudgetModal:false,
      // 凭证
      showStoreBudgetList:false,
      storeBudgetList:[],
      // 查看能源账单
      viewModal:false,
      viewItem:{},
      // 打印经营费用数据
      print_energy_info:{},
      print_energy_str:"@page{size:A4;margin:0}@media print{*{font-size:9pt;font-family:'宋体'}.page{margin:0;border:initial;border-radius:initial;width:initial;min-height:initial;box-shadow:initial;background:initial;page-break-after:always}}.page{box-sizing:border-box;padding:22px;padding-top:90px}.page h4{text-align:center;margin-bottom:5px;font-size:22px}.page_head{width:100%;overflow:hidden;line-height:.9em}.page_head_left,.page_head_right{display:inline-block;width:50%;float:left}.table_box table{width:100%;border-spacing:0;border-collapse:collapse;border:1px solid gray;margin-top:5px}.table_box table th{border:1px solid gray;padding:3px}.table_box table td{border-left:1px solid gray;padding:3px;box-sizing:border-box}.table_box table .total_tr td{border:0;border-top:1px solid gray;padding:3px;box-sizing:border-box}.table_box table .total_tr .total_td{border-left:1px solid gray;padding:3px;box-sizing:border-box}.table_box table .last_tr{border-top:1px solid gray}.page_footer{padding:5px;line-height:.9em}.page_footer .zhanghao{overflow:hidden;margin-bottom:10px}.page_footer .zhanghao>div{display:inline-block;float:left}.page_footer .zhanghao .line_box{float:right;margin-right:100px;text-align:center}.page_footer .zhanghao .line_box .line{width:240px;height:14px;border-bottom:1px solid #000;margin-bottom:5px}.page_footer .contect p{margin-top:8px;width:50%;display:inline-block}",
      print_rent_info:{},
      print_rent_str:"@page{size:A4;margin:0}@media print{*{font-size:10pt;font-family:'宋体'}.page{margin:0;border:initial;border-radius:initial;width:initial;min-height:initial;box-shadow:initial;background:initial;page-break-after:always}}.ti2{text-indent:2em}.page{box-sizing:border-box;padding:90px 110px}.page h4{text-align:center;margin-bottom:5px;font-size:22px}.page_head{width:100%;overflow:hidden;line-height:12pt}.page_main .page_main_item{text-indent:2em;display:flex;justify-content:flex-start;align-items:center;height:3em}.page_main .page_main_item span{width:150px}.page_main .page_main_item i{font-style:normal;font-weight:400}.page_main .page_main_item p{border-bottom:1px solid #000;text-align:center;text-indent:0;padding-bottom:2px;width:300px}.page_footer{padding:5px;line-height:.9em}.page_footer_top{text-indent:2em;line-height:12pt;margin:2em 0}.page_footer_main{line-height:15pt;margin:2em 0}.page_footer_bottom{line-height:15pt;text-align:right}"
    }
  },
  methods: {
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 删除图片
    handleRemove (file, name) {
      const fileList = this.$refs[name].fileList
      this.$refs[name].fileList.splice(fileList.indexOf(file), 1)
      this[name].splice(fileList.indexOf(file), 1)
    },
    // 错误提示
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件 ' + file.name + ' 格式错误, 请上传jpg／jpeg／png格式.'
      })
    },
    // 超大提示
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过最大限制',
        desc: '文件  ' + file.name + ' 过大, 不能超过 2M.'
      })
    },
    // 发送触发
    handleBeforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
      }
    },
    // 退场其他
    uploadLetterSuccess (res, file) {
      if (res.code == 0) {
        this.uploadLetter.push(res.data)
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
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
    //选择时间
    changeKeyword( ){
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword })
    },
    // 选择新页面
    getNewPage(page){
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword , page :page })
    },
    // 显示弹窗
    showAddStorePay(params){
      this.uploadLetter = [];
      this.storeBill = {}
      this.storeBill = params.row;
      this.showAddStorePayModal = true;
    },
    // 编辑商户账单
    addStorePay(){
      // 验证操作
      if(isNaN(this.storeBill.money*1)){
        this.$Notice.warning({
          title: '上缴数字有误！'
        })
        return
      }
      if(this.uploadLetter.length <= 0){
        this.$Notice.warning({
          title: '凭证不能为空！'
        })
        return
      }
      let data = {};
      data.bill_id = this.storeBill.id;
      data.store_id = this.storeBill.store_id;
      data.money = this.storeBill.money*1;
      data.images = this.uploadLetter.join(",");
      data.remark = this.storeBill.remark;
      // 提交修改
      addStoreBillPay( data ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        this.$Notice.warning({
          title: "添加成功！",
        })
        this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword , page : this.page.current_page })
      })
    },
    // 展示收支列表
    showEditStoreBudget(params){
      let id = params.row.id;
      getStoreBillPayList( { bill_id : id } ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        this.budget_list = dbody.data;
        this.showEditStoreBudgetModal = true;
      })
    },
    // 展示凭证
    showStoreBudgetVoucher(params){
      let voucher = !!params.row.images ? params.row.images.split(',') : [];
      this.storeBudgetList = [];
      this.storeBudgetList = voucher;
      this.showStoreBudgetList = true;
    },
    // 删除一条收支
    deleteStoreBudget(params){
      let id = params.row.id;
      let bill_id = params.row.bill_id;
      deleteStoreBillPay( { id : id } ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        this.$Notice.warning({
          title: "删除成功！"
        })
        this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id , keyword:this.keyword , page : this.page.current_page })
        getStoreBillPayList( { bill_id : bill_id } ).then(res => {
          const dbody = res.data
          if(dbody.code != 0){
            this.$Notice.warning({
              title: dbody.msg,
            })
            return
          }
          this.budget_list = dbody.data;
        })
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
            title: "抄表信息不全！"
          })
        }
      });
    },
    // 打印能源账单
    printEnergyBill(params){
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
          this.print_energy_info = {};
          this.print_energy_info = dbody.data[0];
          let that = this;
          setTimeout(function(argument) {
            printJS({
              printable: 'printEnergy',
              documentTitle: '橘猫精选',
              type: 'html',
              targetStyle: ['*'],
              maxWidth: 1200,
              gridStyle:'border: 1px solid lightgray; margin-bottom: -1px;',
              style: that.print_energy_str,
            })
          },500)
        }else{
          this.$Notice.warning({
            title: "抄表信息不全！"
          })
        }
      });
    },
    // 打印租金账单
    printRentBill(params){
      let that = this;
      // 获取店铺本月租金账单基本信息
      let info = params.row;
            // print_rent_str
      setTimeout(function(argument) {
        printJS({
          printable: 'printRent',
          documentTitle: '橘猫精选',
          type: 'html',
          targetStyle: ['*'],
          maxWidth: 1200,
          gridStyle:'border: 1px solid lightgray; margin-bottom: -1px;',
          style: that.print_rent_str,
        })
      },500)
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
      total = info.project_fee*1 + total;
      total = info.taxes_fee*1 + total;
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
    //初始化
    initData( info ){
      // 获取已经生成列表的商户
      this.getStoreBillList( info );
    },
  },
  mounted(){
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
      this.kitchen = dbody.data || []
      this.select_kitchen = this.kitchen[this.kitchen.length*1-1];
      this.select_kitchen_id = this.select_kitchen.id;
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id })
    })
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
