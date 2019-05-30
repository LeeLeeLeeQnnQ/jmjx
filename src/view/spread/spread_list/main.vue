<template>
  <div>
    <!-- 厨房表格数据 -->
    <Card>
      <p slot="title">
          推广商户列表
      </p>
      <a href="#" slot="extra" @click.prevent="showAddStoreModal">
          新建推广商户
      </a>
      <tables ref="tables" v-model="kitchenList" :columns="columns" 
          @data-view-recharge-list="handleViewRechargeList" 
          @data-edit-info="handleEditInfo" 
          @data-recharge="saveRechargeInfo" 
      />
    </Card>
    <!-- 查看图片 -->
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <!-- 添加店铺 -->
    <Modal 
      v-model="showAddModal"
      title="添加推广商户"
      @on-ok="saveAddModalInfo" >
        <Form :model="addItem" :label-width="120" inline>
          <FormItem label="经营品类">
            <Input v-model="addItem.type" placeholder="不超过6个字" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="地区选择">
            <Select v-model="addItem.kitchen_id" @on-change="getNewKitchen" style="width: 200px">
              <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商铺名称">
            <Input v-model="addItem.manage_phone" placeholder="输入商铺名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="店铺LOGO" style="width: 200px">
            <div>
              <img v-if="!!addItem.store_logo" class="store_logo" :src="addItem.store_logo">
            </div>
            <Upload
              ref="uploadLetter"
              :show-upload-list="false"
              :on-success="uploadStoreLogo"
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
          <FormItem label="满减优惠">
            <Input v-model="addItem.kitchen_rent" placeholder="输入满减金额（满30-15,满40-15）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="返利规则">
            <Input v-model="addItem.garbage_fee" placeholder="输入返利规则（返8元现金红包）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="红包金额">
            <Input v-model="addItem.flue_fee" placeholder="输入红包金额" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="美团二维码">
            <div style="width: 200px">
              <div>
                <img v-if="!!addItem.store_meituan_erweima" class="store_erweima" :src="addItem.store_meituan_erweima">
              </div>
              <Upload
                :show-upload-list="false"
                :on-success="uploadMeituanStoreErweima"
                :format="['jpg','jpeg','png']"
                :max-size="4200"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </div>
          </FormItem>
          <FormItem label="饿了么二维码" >
            <div style="width: 200px">
              <div>
                <img v-if="!!addItem.store_eleme_erweima" class="store_erweima" :src="addItem.store_eleme_erweima">
              </div>
              <Upload
                ref="uploadLetter"
                :show-upload-list="false"
                :on-success="uploadElemeStoreErweima"
                :format="['jpg','jpeg','png']"
                :max-size="4200"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </div>
          </FormItem>
        </Form>
    </Modal>
    <!-- 修改店铺 -->
    <Modal 
      v-model="showEditModal"
      title="添加推广商户"
      @on-ok="saveEditModalInfo" >
        <Form :model="editItem" :label-width="120" inline>
          <FormItem label="更改状态">
            <Select v-model="editItem.kitchen_id" style="width: 200px">
              <Option :value="1" :key="1">启用</Option>
              <Option :value="2" :key="2">禁用</Option>
              <Option :value="3" :key="3">下线</Option>
            </Select>
          </FormItem>
          <FormItem label="经营品类">
            <Input v-model="editItem.type" placeholder="不超过6个字" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="地区选择">
            <Select v-model="editItem.kitchen_id" @on-change="getNewKitchen" style="width: 200px">
              <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商铺名称">
            <Input v-model="editItem.manage_phone" placeholder="输入商铺名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="店铺LOGO" style="width: 200px">
            <div>
              <img v-if="!!editItem.store_logo" class="store_logo" :src="editItem.store_logo">
            </div>
            <Upload
              ref="uploadLetter"
              :show-upload-list="false"
              :on-success="updateStoreLogo"
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
          <FormItem label="满减优惠">
            <Input v-model="editItem.kitchen_rent" placeholder="输入满减金额（满30-15,满40-15）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="返利规则">
            <Input v-model="editItem.garbage_fee" placeholder="输入返利规则（返8元现金红包）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="红包金额">
            <Input v-model="editItem.flue_fee" placeholder="输入红包金额" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="美团二维码" >
            <div style="width: 200px">
              <div>
                <img v-if="!!editItem.store_meituan_erweima" class="store_erweima" :src="editItem.store_meituan_erweima">
              </div>
              <Upload
                ref="uploadLetter"
                :show-upload-list="false"
                :on-success="updateMeituanStoreErweima"
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
            </div>
          </FormItem>
          <FormItem label="饿了么二维码">
            <div  style="width: 200px">
              <div>
                <img v-if="!!editItem.store_eleme_erweima" class="store_erweima" :src="editItem.store_eleme_erweima">
              </div>
              <Upload
                ref="uploadLetter"
                :show-upload-list="false"
                :on-success="updateElemeStoreErweima"
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
            </div>
          </FormItem>
        </Form>
    </Modal>
    <!-- 充值 -->
    <Modal 
      v-model="showRechargeModal"
      title="添加推广商户"
      @on-ok="saveRechargeModalInfo" >
        <Form :model="rechargeItem" :label-width="120" inline>
          <FormItem label="充值金额">
            <Input v-model="rechargeItem.type" placeholder="输入金额" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="本次缴纳凭证">
            <div class="img-upload-list" v-for="item in rechargeImgList">
              <div>
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item,'rechargeImgList')"></Icon>
                </div>
              </div>
            </div>
            <Upload
                :show-upload-list="false"
                :on-success="uploadRechargeImg"
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
        </Form>
    </Modal>
    <!-- 充值列表 -->
    <Modal title="充值列表" v-model="showRechargeModalList">
        <tables
          ref="tables"
          v-model="rechargeBillList"
          :columns="rechargeColumns"
          @voucher-view="showStoreBudgetVoucher"
        />
        <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Modal>
    <!-- 充值凭证 -->
    <Modal title="充值凭证预览" v-model="showRechargeBudgetList">
      <div class="img-upload-list" v-for="item in storeRechargeList">
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
// 
import { getKitchenList  } from '@/api/setting'
import Tables from '_c/tables'
export default {
  name: 'spread_list',
  components: {
    Tables
  },
  data () {
    return {
      // 图片
      imgUrl: '',
      visible: false,
      // 
      columns: [
        {title: '推广店铺ID', key: 'id',width:100},
        {title: '店铺名称', key: 'kitchen_name'},
        { title: '余额',
          render: (h, params) => {
            let yue = params.row.use_total*1
            if(yue > 50){
              return h('span', { style: {color: '#19be6b'}}, yue)
            }else if (yue > 0) {
              return h('span', { style: {color: '#2d8cf0'}}, yue)
            }else if (yue <= 0) {
              return h('span', { style: {color: 'red'}}, yue)
            }  
          }
        },
        {title: '建立日期', key: 'manage_name'},
        {title: '返单数', key: 'manage_phone'},
        { title: '状态',
          render: (h, params) => {
            let a = (params.row.rent_total*1/10000).toFixed(2)+'万';
            return h('span', a)
          }
        },
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
                    vm.$emit('data-view-recharge-list', params)
                  }
                }},
              '充值列表')
            }, 
          ]
        },
        {
          title: '操作',
          key: 'handle',
          // width : 100 ,
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                style: {
                  margin:'5px 0 ',
                },
                props: {
                  confirm: true,
                  title: '修改店铺推广信息！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-info', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {marginLeft: '0px'}
                }, '修改信息')
              ])
            },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {margin: '5px'},
                on: {
                  'click': () => {
                    vm.$emit('data-recharge', params)
                  }
                }},
              '充值')
            },
          ]
        },
      ],
      kitchenList: [],
      // 
      showAddModal: false,
      addItem: {},

      showEditModal: false,
      editItem: {},

      showRechargeModal:false,
      rechargeItem:{},
      rechargeImgList:[],
      // 缴费列表
      showRechargeModalList:false,
      rechargeBillList:[],
      // 充值col
      rechargeColumns: [
        {title: '充值时间', key: 'name'},
        {title: '店铺名称', key: 'kitchen_name'},
        {title: '充值金额', key: 'kitchen_name'},
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
      ],
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 充值凭证
      showRechargeBudgetList:false,
      storeRechargeList:[],
      // id
      spread_store_id: '',
      // 
      source_list:['美团','饿了么']
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
    // 显示添加
    showAddStoreModal(){
      this.addItem= {};
      this.showAddModal = true;
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
    uploadStoreLogo (res, file) {
      if (res.code == 0) {
        this.addItem.store_logo = res.data;
        this.showAddModal = false;
        this.showAddModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    uploadMeituanStoreErweima(res, file) {
      if (res.code == 0) {
        this.addItem.store_meituan_erweima = res.data;
        console.log(this.addItem)
        this.showAddModal = false;
        this.showAddModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    uploadElemeStoreErweima(res, file) {
      if (res.code == 0) {
        this.addItem.store_eleme_erweima = res.data;
        this.showAddModal = false;
        this.showAddModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    // 修改
    updateStoreLogo(res, file) {
      if (res.code == 0) {
        this.editItem.store_logo = res.data;
        this.showAddModal = false;
        this.showAddModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    updateElemeStoreErweima(res, file) {
      if (res.code == 0) {
        this.editItem.store_meituan_erweima = res.data;
        this.showEditModal = false;
        this.showEditModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    updateMeituanStoreErweima(res, file) {
      if (res.code == 0) {
        this.editItem.store_eleme_erweima = res.data;
        this.showEditModal = false;
        this.showEditModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    // 退场其他
    uploadRechargeImg (res, file) {
      if (res.code == 0) {
        this.rechargeImgList.push(res.data)
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    // 查看充值列表
    handleViewRechargeList(params) {
      let spread_store_id = params.row.id;
      this.rechargeBillList = [
        { name:'1' }
      ]
      this.showRechargeModalList = true;
    },
    // 编辑推广商户
    handleEditInfo(params) {
      this.editItem = params.row;
      this.showEditModal = true;
    },
    // 创建推广商户
    saveAddModalInfo(){

    },
    // 保存修改
    saveEditModalInfo(){

    },
    // 保存充值记录
    saveRechargeModalInfo(){

    },
    // 商户充值登记
    saveRechargeInfo(params){
      let spread_store_id = params.row.id;
      this.rechargeImgList = [];
      this.rechargeItem = {};
      this.showRechargeModal = true;
    },
    // 展示凭证
    showStoreBudgetVoucher(params){
      let voucher = !!params.row.images ? params.row.images.split(',') : [];
      this.storeBudgetList = [];
      this.storeBudgetList = voucher;
      this.showRechargeBudgetList = true;
    },
    //获取地点 
    getNewKitchen(){

    },
    // 选择新页面
    getNewPage(page){
      
    },
    // 初始化
    init(){

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
      this.kitchenList = dbody.data.list
    })
  },
  computed: {

  }
}
</script>

<style scoped>
  .store_logo{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border:1px solid #ddd;
  }
  .store_erweima{
    width: 200px;
    height: 200px;
    border-radius: 5px;
    border:1px solid #ddd;
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
