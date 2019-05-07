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
    <Tabs :animated="false" @on-click="setCard" style="margin-top: 5px;" :value="tabValue">
        <TabPane label="起租中" name="1">
          <tables
            ref="start_shops_tables"
            v-model="start_shops_list"
            :columns="start_shops_columns"
            @data-view="showShopCard"
            @data-edit="editShopCard"
            @on-sort-change="startShopsSortTables"/>
          <Page
            :total="start_shops_page.total"
            :page-size="start_shops_page.list_rows"
            style="margin-top:10px;"
            @on-change="getStartShopsNewPage"/>
        </TabPane>
        <TabPane label="租赁中" name="2">
          <tables
            ref="normal_shops_tables"
            v-model="normal_shops_list"
            :columns="normal_shops_columns"
            @data-view="showShopCard"
            @data-edit="editShopCard"
            @on-sort-change="normalShopsSortTables"/>
          <Page
            :total="normal_shops_page.total"
            :page-size="normal_shops_page.list_rows"
            style="margin-top:10px;"
            @on-change="getNormalShopsNewPage"/>
        </TabPane>
        <TabPane label="退租中" name="3">
          <tables
            ref="end_shops_tables"
            v-model="end_shops_list"
            :columns="end_shops_columns"
            @data-view="showShopCard"
            @data-edit="editShopCard"
            @on-sort-change="endShopsSortTables"/>
          <Page
            :total="end_shops_page.total"
            :page-size="end_shops_page.list_rows"
            style="margin-top:10px;"
            @on-change="getEndShopsNewPage"/>
        </TabPane>
        <TabPane label="退款中" name="7">
          <tables
            ref="refund_shops_tables"
            v-model="refund_shops_list"
            :columns="refund_shops_columns"
            @data-view="showShopCard"
            @data-edit="editShopCard"
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
            @data-edit="editShopCard"
            @on-sort-change="eliminateShopsSortTables"/>
          <Page
            :total="eliminate_shops_page.total"
            :page-size="eliminate_shops_page.list_rows"
            style="margin-top:10px;"
            @on-change="getEliminateShopsNewPage"/>
        </TabPane>
        <TabPane label="全部商户" name="5">
          <tables
            ref="all_shops_tables"
            v-model="all_shops_list"
            :columns="all_shops_columns"
            @data-view="showShopCard"
            @data-edit="editShopCard"
            @on-sort-change="allShopsSortTables"/>
          <Page
            :total="all_shops_page.total"
            :page-size="all_shops_page.list_rows"
            style="margin-top:10px;"
            @on-change="getAllShopsNewPage"/>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Tables from '_c/tables'
import merge from 'webpack-merge'
// 权限
// /api/Kitchen/index,/api/StoreLease/index
import { getKitchenList } from '@/api/setting'
import { getAllShopList } from '@/api/data'
export default {
  name: 'canvass-data-store-list',
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
      //起租中
      start_shops_columns: [
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
      //租赁中
      end_shops_columns: [
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
      //租赁中
      refund_shops_columns: [
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
    }
  },
  methods: {
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
      this.getStartShops( this.sreach_kitchen_id , page );
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
      this.getNormalShops( this.sreach_kitchen_id , page );
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
      this.getEndShops( this.sreach_kitchen_id , page );
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
      this.getRefundShops( this.sreach_kitchen_id , page );
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
      this.getEliminateShops( this.sreach_kitchen_id , page );
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
      this.getAllShops( this.sreach_kitchen_id , page );
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
    //表格编辑
    editShopCard(params){
      let id = params.row.store_id
      let kitchen_id = params.row.kitchen_id
      const route = {
        name: 'canvassShopEdit',
        query: {
          id,
          kitchen_id
        }
      }
      this.$router.push(route)
    },
    // 重新选择厨房
    selectKitchen(){
      this.initData(this.sreach_kitchen_id);
    },
    
    // 初始化函数
    initData( kitchen_id ){
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
      this.$router.push({
          query:merge(this.$route.query,{'tabValue':num})
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
      }
      // 初始化函数
      this.kitchenList = dbody.data.list || [];
      if(this.kitchenList.length > 0){
        this.sreach_kitchen_id = this.kitchenList[this.kitchenList.length - 1].id;
        this.initData(this.sreach_kitchen_id);
      }
    }) 
    this.tabValue = this.$route.query.tabValue || "1"
  }
}
</script>

<style>

</style>
