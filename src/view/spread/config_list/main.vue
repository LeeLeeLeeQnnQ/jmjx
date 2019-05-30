<template>
  <div>
    <!-- 厨房表格数据 -->
    <Card>
      <p slot="title">
          头部banner配置
      </p>
      <a href="#" slot="extra" @click.prevent="addNewBannerModal">
          添加banner
      </a>
      <tables ref="tables" v-model="bannerList" :columns="columns" 
          @data-view-banner="handleViewBanner" 
          @data-edit-alive="handleEditAlive" 
          @data-edit-ban="handleEditBan" 
          @data-edit-info="handleEditInfo"
      />
    </Card>
    <!-- 查看图片 -->
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <!-- 添加 -->
    <Modal 
      v-model="showAddNewBannerModal"
      title="增加新banner"
      @on-ok="saveAddNewBannerInfo" >
        <Form :model="newBannerItem" :label-width="120" inline>
          <FormItem label="名称">
            <Input v-model="newBannerItem.name" placeholder="banner名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="描述">
            <Input v-model="newBannerItem.remark" type="textarea" :rows="4" placeholder="描述"  style="width: 200px"/>
          </FormItem>
          <FormItem label="链接">
            <Input v-model="newBannerItem.url" placeholder="请输入url" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="banner图片" style="width: 200px" >
            <div v-if="!!newBannerItem.img" class="img-upload-list">
              <img :src="newBannerItem.img">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(newBannerItem.img)"></Icon>
              </div>
            </div>
            <Upload
              ref="uploadLetter"
              :show-upload-list="false"
              :on-success="uploadNewBanner"
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
    <!-- 修改 -->
    <Modal 
      v-model="showEditBannerModal"
      title="修改banner"
      @on-ok="saveEditBannerInfo" >
        <Form :model="editBannerItem" :label-width="120" inline>
          <FormItem label="名称">
            <Input v-model="editBannerItem.name" placeholder="banner名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="描述">
            <Input v-model="editBannerItem.remark" type="textarea" :rows="4" placeholder="描述"  style="width: 200px"/>
          </FormItem>
          <FormItem label="链接">
            <Input v-model="editBannerItem.url" placeholder="请输入url" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="banner图片" style="width: 200px" >
            <div v-if="!!editBannerItem.img" class="img-upload-list">
              <img :src="editBannerItem.img">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(editBannerItem.img)"></Icon>
              </div>
            </div>
            <Upload
              ref="uploadLetter"
              :show-upload-list="false"
              :on-success="updateBanner"
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
  </div>
</template>
<script>
// 权限
// /api/Kitchen/index,/api/Kitchen/add,/api/Kitchen/delete
import Tables from '_c/tables'
import { getKitchenList } from '@/api/setting'
export default {
  name: 'config_list',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: '查看图片',
          key: 'handle',
          button: [
            (h, params, vm) => {
              let banner_name = params.row.kitchen_name;
              return h('a', {
                style:{
                  margin:"0"
                },
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view-banner', params)
                  }
                }},
              banner_name)
            }, 
          ]
        },
        {title: '状态', key: 'manage_name', width: 80},
        {title: '链接', key: 'manage_name', width: 80},
        {title: '描述', key: 'manage_phone'},
        {
          title: '编辑',
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
                    vm.$emit('data-edit-info', params)
                  }
                }},
              '编辑')
            }, 
          ]
        },
        {
          title: '操作',
          key: 'handle',
          width : 160 ,
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                style: {
                  margin:'5px 0 ',
                },
                props: {
                  confirm: true,
                  title: '启用banner！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-alive', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {marginLeft: '0px'}
                }, '启用')
              ])
            },
            (h, params, vm) => {
              return h('Poptip', {
                style: {
                  margin:'5px 0 ',
                },
                props: {
                  confirm: true,
                  title: '禁用banner！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-ban', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '5px'}
                }, '禁用')
              ])
            },
          ]
        },
      ],
      bannerList: [],
      // 图片
      imgUrl: '',
      visible: false,
      // 增加新banner
      showAddNewBannerModal:false,
      newBannerItem:{},
      // 修改showEditBannerModal
      showEditBannerModal:false,
      editBannerItem:{},
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
    //NewBanner
    uploadNewBanner (res, file) {
      if (res.code == 0) {
        this.newBannerItem.img = res.data;
        this.showAddNewBannerModal = false;
        this.showAddNewBannerModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    //oldBanner
    updateBanner (res, file) {
      if (res.code == 0) {
        this.editBannerItem.img = res.data;
        this.showEditBannerModal = false;
        this.showEditBannerModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    // 图片预览
    handleViewBanner (params) {
      this.imgUrl = params.row.url;
      this.visible = true
    },
    // 启用
    handleEditAlive(params){

    },
    // 禁用
    handleEditBan(params){

    },
    // 增加新
    addNewBannerModal(){
      this.newBannerItem = {};
      this.showAddNewBannerModal = true;
    },
    // 保存新
    saveAddNewBannerInfo(){

    },
    // 修改
    handleEditInfo(params){
      this.editBannerItem = {};
      this.showEditBannerModal = true;
    },
    // saveEditBannerInfo
    saveEditBannerInfo(){

    }

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
      this.bannerList = dbody.data.list
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
