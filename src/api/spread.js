import axios from '@/libs/api.request'


// 获取列表
/*
  获取列表
*/
/*
  id : 1
*/
/*
  
*/
export const getSpreadStoreList = () => {
  return axios.request({
    url: '/api/Shop/index',
    method: 'post'
  })
}


// 增加一个推广商户
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
export const addSpreadStore = (data) => {
  return axios.request({
    url: '/api/Shop/add',
    data,
    method: 'post'
  })
}


// 编辑一个推广商户
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
export const editSpreadStore = (data) => {
  return axios.request({
    url: '/api/Shop/edit',
    data,
    method: 'post'
  })
}

// 更改一个推广商户状态
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
export const changeStateSpreadStore = (data) => {
  return axios.request({
    url: '/api/Shop/state',
    data,
    method: 'post'
  })
}

// 充值
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
export const depositSpreadStore = (data) => {
  return axios.request({
    url: '/api/Shop/deposit',
    data,
    method: 'post'
  })
}



// 获取充值列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
export const getShopPayList = (data) => {
  return axios.request({
    url: '/api/ShopPay/index',
    data,
    method: 'post'
  })
}


// 获取区域列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
export const getAreaList = (data) => {
  return axios.request({
    url: '/api/Area/getAreaList',
    data,
    method: 'post'
  })
}


// 获取红包申请列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// UserOrder
export const getSpreadUserOrderList = (data) => {
  return axios.request({
    url: '/api/UserOrder/index',
    params: data,
    method: 'get'
  })
}

// 编辑红包申请列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// UserOrder
export const changeStateSpreadUserOrdert = (data) => {
  return axios.request({
    url: '/api/UserOrder/state',
    data,
    method: 'post'
  })
}


// Banner列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// Banner列表
export const getBannerList = (data) => {
  return axios.request({
    url: '/api/Banner/index',
    data,
    method: 'post'
  })
}


// AddNewBanner列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// Banner列表
export const addNewBanner = (data) => {
  return axios.request({
    url: '/api/Banner/add',
    data,
    method: 'post'
  })
}


// editBanner列表
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// Banner列表
export const editBanner = (data) => {
  return axios.request({
    url: '/api/Banner/edit',
    data,
    method: 'post'
  })
}


// changeBannerStatus
/*
  推广商户
*/
/*
  id : 1
*/
/*
  
*/
// Banner列表
export const changeBannerStatus = (data) => {
  return axios.request({
    url: '/api/Banner/status',
    data,
    method: 'post'
  })
}


