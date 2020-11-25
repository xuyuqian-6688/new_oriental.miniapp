import request from '../utils/request'


// 登录
export function login(data) {
  return request({
    url: '/authorizations/login',
    method: 'POST',
    data
  })
}

// 学校搜索
export function searchDomestic(data) {
  return request({
    url: '/school/searchDomestic',
    method: 'POST',
    data
  })
}
export function searchAbroad(data) {
  return request({
    url: '/school/searchAbroad',
    method: 'POST',
    data
  })
}
// 学校详情
export function schoolDetail(data) {
  return request({
    url: '/school/' + data.id,
    method: 'POST',
    data
  })
}

// 活动搜索
export function searchActivity(data) {
  return request({
    url: '/activity/search',
    method: 'POST',
    data
  })
}
// 活动预约
export function activityBooking(data) {
  return request({
    url: '/activity/booking',
    method: 'POST',
    data
  })
}

// 视频搜索
export function searchVideo(data) {
  return request({
    url: '/video/search',
    method: 'POST',
    data
  })
}

// 城市列表
export function getAreaList(data) {
  return request({
    url: '/school/areaLists',
    method: 'GET',
    data
  })
}

// 年级/专业
export function schoolRelation(data) {
  return request({
    url: '/school/schoolRelation',
    method: 'GET',
    data
  })
}

// 热门城市/国家
export function hotCity(data) {
  return request({
    url: '/school/area_sch',
    method: 'GET',
    data
  })
}

// 系统参数
export function systemInfo(data) {
  return request({
    url: '/system_info/list',
    method: 'GET',
    data
  })
}
