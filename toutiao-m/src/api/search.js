// 搜索相关接口
import { request } from '../utils/request.js'
/*
    *说明：获取联想建议列表

    *params q 需要联想查询的内容 String
*/
export const getSearchSuggestions = params => {
  return request({
    method: 'get',
    url: '/v1_0/suggestion',
    params
  })
}
/*
    *说明：获取搜索结果

    *params q  需要查询的内容 String
    *params page  当前的页码 number
    *params per_page 每一页的数据数量 number
*/
export const getSearchResults = params => {
  return request({
    method: 'get',
    url: '/v1_0/search',
    params
  })
}
