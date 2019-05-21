<template>
  <div>
    <div>
      <Card shadow>
        <Row :gutter="20">
          <i-col :xs="4" :md="4" :lg="4">
            <Select v-model="sreach_kitchen_id" @on-change="selectKitchen">
              <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
            </Select>
          </i-col>
        </Row>
      </Card>
      <Card shadow style="margin-top: 5px">
        <Row :gutter="20">
          <i-col :xs="4" :md="4" :lg="4">
            <Input v-model="keyword"  placeholder="请输入店铺名称/档口号"/>
          </i-col>
          <i-col :xs="4" :md="4" :lg="4">
            <Button type="primary" @click="sreachKeyword">搜索</Button>
          </i-col>
        </Row>
      </Card>
    </div>
    <Modal v-model="periodStoreModalshow" title="店铺周期表格导出" ok-text="导出" @on-ok="expordPSExcal">
        <Form :label-width="80">
          <FormItem label="选择厨房">
            <Select v-model="pSE_kitchenID" @on-change="selectKitchen" style="width: 200px">
              <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="选择周期">
            <DatePicker format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px" @on-change="selectPSEdate"></DatePicker>
          </FormItem>
        </Form>
    </Modal>
    <Modal v-model="storeRefundModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>确认商户异常退款么？</span>
      </p>
      <div slot="footer">
          <Button type="error" size="large" long @click="quitKitchen">确认</Button>
      </div>
    </Modal>
    <Tabs :animated="false" @on-click="setCard" style="margin-top: 5px;" :value="tabValue">
        <Button @click="buildStore" size="small" slot="extra">店铺建档</Button>
        <Button @click="periodStoreModalshow = true" size="small" slot="extra" style="margin-left: 3px;">周期表格</Button>
        <TabPane label="起租中" name="1" >
          <tables 
            ref="start_shops_tables"  
            v-model="start_shops_list" 
            :columns="start_shops_columns" 
            @data-view="showShopCard" 
            @data-edit="editStartCard" 
            @data-handle="handleStartCard"
            @data-refund="showStoreRefundModal"
            @on-sort-change="startShopsSortTables"/>
          <Page
            :total="start_shops_page.total"
            :page-size="start_shops_page.list_rows"
            style="margin-top:10px;"
            @on-change="getStartShopsNewPage"/>
        </TabPane>
        <TabPane label="租赁中" name="2" >
          <tables 
            ref="normal_shops_tables"
            v-model="normal_shops_list"
            :columns="normal_shops_columns"
            @data-view="showShopCard"
            @data-edit="editStartCard"
            @on-sort-change="normalShopsSortTables"/>
          <Page
            style="margin-top:10px;"
            :total="normal_shops_page.total"
            :page-size="normal_shops_page.list_rows"
            @on-change="getNormalShopsNewPage"/>
        </TabPane>
        <TabPane label="退租中" name="3">
          <tables
            ref="end_shops_tables"
            v-model="end_shops_list"
            :columns="end_shops_columns"
            @data-view="showShopCard"
            @data-edit="editStartCard2"
            @on-sort-change="endShopsSortTables"/>
          <Page
            style="margin-top:10px;"
            :total="end_shops_page.total"
            :page-size="end_shops_page.list_rows"
            @on-change="getEndShopsNewPage"/>
        </TabPane>
        <TabPane label="退款中" name="7">
          <tables
            ref="refund_shops_tables"
            v-model="refund_shops_list"
            :columns="refund_shops_columns"
            @data-view="showShopCard"
            @data-edit="editStartCard2"
            @data-handle="handleStartCard2"
            @on-sort-change="refundShopsSortTables"/>
          <Page
            :total="refund_shops_page.total"
            :page-size="refund_shops_page.list_rows"
            style="margin-top:10px;"
            @on-change="getRefundShopsNewPage"/>
        </TabPane>
        <TabPane label="已归档" name="4">
          <tables
            ref="eliminate_shops_tables"
            v-model="eliminate_shops_list"
            :columns="eliminate_shops_columns"
            @data-view="showShopCard"
            @data-edit="editStartCard2"
            @on-sort-change="eliminateShopsSortTables"/>
          <Page
            style="margin-top:10px;"
            :total="eliminate_shops_page.total"
            :page-size="eliminate_shops_page.list_rows"
            @on-change="getEliminateShopsNewPage"/>
        </TabPane>
        <TabPane label="全部商户" name="5">
          <tables
            ref="all_shops_tables"
            v-model="all_shops_list"
            :columns="all_shops_columns"
            @data-view="showShopCard"
            @on-sort-change="allShopsSortTables"/>
          <Page
            style="margin-top:10px;"
            :total="all_shops_page.total"
            :page-size="all_shops_page.list_rows"
            @on-change="getAllShopsNewPage"/>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Tables from '_c/tables'
import merge from 'webpack-merge'
// 权限
// Kitchen/index,StoreLease/index,StoreLease/exportStoreLease,StoreLease/settle,StoreLease/edit
import { getKitchenList } from '@/api/setting'
import { getAllShopList } from '@/api/data'
import { quitKitchen , settleShop } from '@/api/kitchen'
export default {
  name: 'finance-store-list',
  components: {
    Tables
  },
  data () {
    return {
      // 搜索部分
      kitchenList:[],
      sreach_kitchen_id:'',
      keyword:'',
      tabValue:'1',
      tab_current_page:'1',
      //起租中
      start_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺ID', key: 'store_id'},
        {title: '商铺', key: 'store_no',sortable: 'custom'},
        {title: '商铺名', key: 'store_name'},
        {title: '建档时间', key: 'create_time',sortable: 'custom'},
        {title: '最后操作人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease', width: 100,sortable: 'custom'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 7) {
              return h('span', { style: {color: '#6600cc'}}, '退款中')
            }else if (lease_type == 4){
              return h('span', '已归档')
            } 
          }
        },
        { title: '首期未缴',
          render: (h, params) => {
            let unpaid_fee = params.row.unpaid_fee*1
            return h('span', unpaid_fee)
          }
        },
        {title: '操作状态',
          render: (h, params) => {
            let confirm_time = params.row.confirm_time*1
            if( confirm_time > 0 ){
              return h('span', { style: {color: '#ff9900'}}, '财务已确认')
            }else{
              return h('span', { style: {color: '#19be6b'}}, '财务已建档')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        },
        {
          title: '操作',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              let confirm_time = params.row.confirm_time*1
              if( confirm_time > 0 ){
                return ''
              }
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-handle', params)
                  }
                }},
              '允许起租')
            },
          ]
        },
        {
          title: '异常退款',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '商户异常退款！',
                  placement: "left-start"
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-refund', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '0'}
                }, '异常退款')
              ])
            }
          ]
        },
      ],
      start_shops_list: [],
      start_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 排序字段
      start_sort_data:{
        order:'',
        key:'',
      },
      //租赁中
      normal_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺ID', key: 'store_id'},
        {title: '商铺', key: 'store_no',sortable: 'custom'},
        {title: '商铺名', key: 'store_name'},
        {title: '起租时间', key: 'start_date',sortable: 'custom'},
        {title: '最后操作人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease', width: 100,sortable: 'custom'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 7) {
              return h('span', { style: {color: '#6600cc'}}, '退款中')
            }else if (lease_type == 4){
              return h('span', '已归档')
            } 
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        }
      ],
      normal_shops_list: [],
      normal_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 排序字段
      normal_sort_data:{
        order:'',
        key:'',
      },
      //退租中
      end_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺ID', key: 'store_id'},
        {title: '商铺', key: 'store_no',sortable: 'custom'},
        {title: '商铺名', key: 'store_name'},
        {title: '申请退租时间', key: 'apply_date',sortable: 'custom'},
        {title: '最后操作人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease', width: 100,sortable: 'custom'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 7) {
              return h('span', { style: {color: '#6600cc'}}, '退款中')
            }else if (lease_type == 4){
              return h('span', '已归档')
            } 
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        },
      ],
      end_shops_list: [],
      end_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 排序字段
      end_sort_data:{
        order:'',
        key:'',
      },

      //退款中
      refund_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺ID', key: 'store_id'},
        {title: '商铺', key: 'store_no',sortable: 'custom'},
        {title: '商铺名', key: 'store_name'},
        {title: '租金结束时间', key: 'settle_date',sortable: 'custom'},
        {title: '最后操作人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease', width: 100,sortable: 'custom'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 7) {
              return h('span', { style: {color: '#6600cc'}}, '退款中')
            }else if (lease_type == 4){
              return h('span', '已归档')
            } 
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        },
        {
          title: '操作',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {style: {margin: '0'},
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-handle', params)
                  }
                }},
              '退款归档')
            },
          ]
        }
      ],
      refund_shops_list: [],
      refund_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 排序字段
      refund_sort_data:{
        order:'',
        key:'',
      },

      // 已归档 eliminate
      eliminate_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺ID', key: 'store_id'},
        {title: '商铺', key: 'store_no',sortable: 'custom'},
        {title: '商铺名', key: 'store_name'},
        {title: '归档时间',
          render: (h, params) => {
            let archive_time = params.row.archive_time*1
            return h('span', this.getdate(archive_time))
          },sortable: 'custom'
        },
        {title: '最后操作人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease', width: 100,sortable: 'custom'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 7) {
              return h('span', { style: {color: '#6600cc'}}, '退款中')
            }else if (lease_type == 4){
              return h('span', '已归档')
            } 
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                    type: 'info',
                    size: 'small'
                  },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        }
      ],
      eliminate_shops_list: [],
      eliminate_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 排序字段
      eliminate_sort_data:{
        order:'',
        key:'',
      },
      // 全部商户
      all_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺ID', key: 'store_id'},
        {title: '商铺', key: 'store_no',sortable: 'custom'},
        {title: '商铺名', key: 'store_name'},
        {title: '提交人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease', width: 100,sortable: 'custom'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 7) {
              return h('span', { style: {color: '#6600cc'}}, '退款中')
            }else if (lease_type == 4) {
              return h('span', '已归档')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        }
      ],
      all_shops_list: [],
      all_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 排序字段
      all_sort_data:{
        order:'',
        key:'',
      },
      // 查看操作
      // 导出周期表格
      periodStoreModalshow:false,
      pSE_kitchenID:'',
      selectPSEdate_s:'',
      selectPSEdate_e:'',
      // 异常退款！
      storeRefundModal:false,
      rufund_id:'',
    }
  },
  methods: {
    // 时间转换
    getdate() {
        var now = new Date(),
            y = now.getFullYear(),
            m = ("0" + (now.getMonth() + 1)).slice(-2),
            d = ("0" + now.getDate()).slice(-2);
        return y + "-" + m + "-" + d + " " + now.toTimeString().substr(0, 8);
    },
    // 模糊查询店铺
    sreachKeyword(){
      let keyword = this.keyword || '';
      // 全部列表
      this.getAllShops( this.sreach_kitchen_id , 1 , keyword );
      // 起租中
      this.getStartShops( this.sreach_kitchen_id , 1 , keyword  );
      // 租赁中
      this.getNormalShops( this.sreach_kitchen_id , 1 , keyword  );
      // 退租中
      this.getEndShops( this.sreach_kitchen_id , 1 , keyword  );
      // 退款中
      this.getRefundShops( this.sreach_kitchen_id , 1 , keyword  );
      // 归档
      this.getEliminateShops( this.sreach_kitchen_id , 1 , keyword  );
    },
    // 财务建档案
    buildStore(){
      const route = {
        name: 'finance_build'
      }
      this.$router.push(route)
    },
    // 起租 租赁中编辑
    editStartCard(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShopEdit',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 财务润恤起租
    handleStartCard(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShophandle',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    handleStartCard2(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShophandle2',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 退租 归档编辑
    editStartCard2(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShopEdit2',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 重新选择厨房
    selectKitchen(){
      this.$router.push({
          query:merge(this.$route.query,{'tabValue':this.tabValue , 'kitchen_id':this.sreach_kitchen_id})
      })
      this.initData(this.sreach_kitchen_id);
    },
    // 获取起租中
    getStartShops( kitchen_id , page , keyword){
      let info = { kitchen_id : kitchen_id , order: this.start_sort_data.order , key : this.start_sort_data.key }
      if(!!page) {
        info.page = page;
      }
      if(!!keyword){
        info.keyword = keyword;
      }
      info.lease_type = 1;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.start_shops_list = dbody.data.list || [];
        this.start_shops_page = dbody.data.page;
      })
    },
    getStartShopsNewPage(page){
      // 获取新页-全部店铺
      this.getStartShops( this.sreach_kitchen_id , page , this.keyword );
    },
    // 表格排序
    startShopsSortTables(sort_data){
      if(sort_data.order == 'normal'){
        this.start_sort_data.order = null;
        this.start_sort_data.key = null;
      }else{
        this.start_sort_data.order = sort_data.order;
        this.start_sort_data.key = sort_data.key;
      }
      this.getStartShops( this.sreach_kitchen_id , this.start_shops_page.current_page );
    },
    // 获取租赁中
    getNormalShops( kitchen_id , page , keyword){
      let info = { kitchen_id : kitchen_id , order: this.normal_sort_data.order , key : this.normal_sort_data.key}
      if(!!page) {
        info.page = page;
      }
      if(!!keyword){
        info.keyword = keyword;
      }
      info.lease_type = 2;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.normal_shops_list = dbody.data.list || [];
        this.normal_shops_page = dbody.data.page;
      })
    },
    getNormalShopsNewPage(page){
      // 获取新页-全部店铺
      this.getNormalShops( this.sreach_kitchen_id , page , this.keyword );
    },
    // 表格排序
    normalShopsSortTables(sort_data){
      if(sort_data.order == 'normal'){
        this.normal_sort_data.order = null;
        this.normal_sort_data.key = null;
      }else{
        this.normal_sort_data.order = sort_data.order;
        this.normal_sort_data.key = sort_data.key;
      }
      this.getNormalShops( this.sreach_kitchen_id , this.normal_shops_page.current_page );
    },
    // 获取退租中
    getEndShops( kitchen_id , page , keyword ){
      let info = { kitchen_id : kitchen_id , order: this.end_sort_data.order , key : this.end_sort_data.key}
      if(!!page) {
        info.page = page;
      }
      if(!!keyword){
        info.keyword = keyword;
      }
      info.lease_type = 3;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.end_shops_list = dbody.data.list || [];
        this.end_shops_page = dbody.data.page;
      })
    },
    getEndShopsNewPage(page){
      // 获取新页-全部店铺
      this.getEndShops( this.sreach_kitchen_id , page , this.keyword );
    },
    // 表格排序
    endShopsSortTables(sort_data){
      if(sort_data.order == 'normal'){
        this.end_sort_data.order = null;
        this.end_sort_data.key = null;
      }else{
        this.end_sort_data.order = sort_data.order;
        this.end_sort_data.key = sort_data.key;
      }
      this.getEndShops( this.sreach_kitchen_id , this.end_shops_page.current_page );
    },

    // 获取退款中
    getRefundShops( kitchen_id , page , keyword){
      let info = { kitchen_id : kitchen_id , order: this.refund_sort_data.order , key : this.refund_sort_data.key}
      if(!!page) {
        info.page = page;
      }
      if(!!keyword){
        info.keyword = keyword;
      }
      info.lease_type = 7;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.refund_shops_list = dbody.data.list || [];
        this.refund_shops_page = dbody.data.page;
      })
    },
    getRefundShopsNewPage(page){
      // 获取新页-全部店铺
      this.getRefundShops( this.sreach_kitchen_id , page , this.keyword  );
    },
    // 表格排序
    refundShopsSortTables(sort_data){
      if(sort_data.order == 'normal'){
        this.refund_sort_data.order = null;
        this.refund_sort_data.key = null;
      }else{
        this.refund_sort_data.order = sort_data.order;
        this.refund_sort_data.key = sort_data.key;
      }
      this.getRefundShops( this.sreach_kitchen_id , this.refund_shops_page.current_page );
    },


    // 获取归档
    getEliminateShops( kitchen_id , page , keyword){
      let info = { kitchen_id : kitchen_id , order: this.eliminate_sort_data.order , key : this.eliminate_sort_data.key}
      if(!!page) {
        info.page = page;
      }
      if(!!keyword){
        info.keyword = keyword;
      }
      info.lease_type = 4;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.eliminate_shops_list = dbody.data.list || [];
        this.eliminate_shops_page = dbody.data.page;
      })
    },
    getEliminateShopsNewPage(page){
      // 获取新页-全部店铺
      this.getEliminateShops( this.sreach_kitchen_id , page , this.keyword );
    },
    // 表格排序
    eliminateShopsSortTables(sort_data){
      if(sort_data.order == 'normal'){
        this.eliminate_sort_data.order = null;
        this.eliminate_sort_data.key = null;
      }else{
        this.eliminate_sort_data.order = sort_data.order;
        this.eliminate_sort_data.key = sort_data.key;
      }
      this.getEliminateShops( this.sreach_kitchen_id , this.eliminate_shops_page.current_page );
    },
    // 获取全部店铺列表函数
    getAllShops( kitchen_id , page , keyword ){
      let info = { kitchen_id : kitchen_id , order: this.all_sort_data.order , key : this.all_sort_data.key}
      if(!!page) {
        info.page = page;
      }
      if(!!keyword){
        info.keyword = keyword;
      }
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.all_shops_list = dbody.data.list || [];
        this.all_shops_page = dbody.data.page;
      })
    },
    getAllShopsNewPage(page){
      // 获取新页-全部店铺
      this.getAllShops( this.sreach_kitchen_id , page , this.keyword );
    },
    // 表格排序
    allShopsSortTables(sort_data){
      if(sort_data.order == 'normal'){
        this.all_sort_data.order = null;
        this.all_sort_data.key = null;
      }else{
        this.all_sort_data.order = sort_data.order;
        this.all_sort_data.key = sort_data.key;
      }
      this.getAllShops( this.sreach_kitchen_id , this.all_shops_page.current_page );
    },

    // 表格查看栏
    showShopCard(params){
      let id = params.row.store_id
      let kitchen_id = params.row.kitchen_id
      const route = {
        name: 'kitchenDataShopDetail',
        query: {
          id,
          kitchen_id
        }
      }
      this.$router.push(route)
    },
    // 表格时间
    selectPSEdate(date){
      this.selectPSEdate_s = date[0]
      this.selectPSEdate_e = date[1]
    },
    // 导出表格操作
    expordPSExcal(){
      if (!this.pSE_kitchenID) {
        this.$Notice.warning({
          title: '请选择厨房！'
        })
        return false
      }
      if (!this.selectPSEdate_s || !this.selectPSEdate_e) {
        this.$Notice.warning({
          title: '请选择时间段！'
        })
        return false
      }
      const href = "./api/StoreLease/exportStoreLease?kitchen_id="+ this.pSE_kitchenID +"&start_date="+ this.selectPSEdate_s +"&end_date="+ this.selectPSEdate_e +"";
      window.open(href, '_blank')
    },

    // 异常退款弹窗
    showStoreRefundModal(params){
      this.rufund_id = params.row.store_id
      this.storeRefundModal = true;
    },
    quitKitchen(){
      let obj = {};
      obj.store_id = this.rufund_id;
      obj.kitchen_id = this.sreach_kitchen_id;
      obj.lease_type = 2;
      obj.apply_date = this.curentTime();
      obj.is_start = 1;
      quitKitchen(obj).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.settleShop();
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },
    curentTime(){ 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day;
        return(clock); 
    },
    // 异常退款
    settleShop(  ){
      settleShop( this.rufund_id ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            desc: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "操作完成！"
        })
        this.storeRefundModal = false;
        this.initData(this.sreach_kitchen_id);
      })
    },
    // 初始化函数
    initData( kitchen_id ){
      console.log(kitchen_id)
      // 全部列表
      this.getAllShops( kitchen_id );
      // 起租中
      this.getStartShops( kitchen_id );
      // 租赁中
      this.getNormalShops( kitchen_id );
      // 退租中
      this.getEndShops( kitchen_id );
      // 退款中
      this.getRefundShops( kitchen_id );
      // 归档
      this.getEliminateShops( kitchen_id );
    },
    // 卡片路由
    setCard(num){
      this.tabValue = num;
      this.$router.push({
          query:merge(this.$route.query,{'tabValue':this.tabValue , 'kitchen_id':this.sreach_kitchen_id})
      })
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
      }      // 初始化函数
      this.kitchenList = dbody.data.list || [];
      if(this.kitchenList.length > 0){
        this.sreach_kitchen_id = this.$route.query.kitchen_id || this.kitchenList[this.kitchenList.length - 1].id;
        this.initData(this.sreach_kitchen_id);
        this.tabValue = this.$route.query.tabValue || "1";
        this.$router.push({
            query:merge(this.$route.query,{'tabValue':this.tabValue , 'kitchen_id':this.sreach_kitchen_id})
        })
      }
    })
  }
}
</script>

<style>

</style>
