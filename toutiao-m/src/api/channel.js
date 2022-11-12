// 频道相关接口
import { request } from '../utils/request.js'
/*
    *说明：获取全部频道列表
*/
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}
/*
    *说明：添加频道
    *因为当前业务只可能一次添加一个元素

    *@params  item.id  频道id
    *@params  item.seq  频道顺序 list.length
*/
export const addUserChannel = item => {
  return request({
    method: 'patch',
    url: '/v1_0/user/channels',
    data: {
      channels: [item]
    }
  })
}
/*
    *说明：删除频道
    *因为当前业务只可能一次添加一个元素

    *@params  item.id  频道id
    *@params  item.seq  频道顺序 list.length
*/
export const delUserChannel = channelId => {
  return request({
    method: 'delete',
    url: `/v1_0/user/channels/${channelId}`
  })
}
