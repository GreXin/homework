// 用户相关接口模块
import { request } from '../utils/request.js'
// import store from '../store/index.js'

// @params 表示入参
// @return 表示后端成功请求后的返回值
/*
*  @params userName 用户名String
*  @params password 密码 String
*  @return userInfo 用户信息（返回值一般可以不写）
*/
// params表示入参
// @return表示后端请求成功的返回值
export const Login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
/*
* @params mobile 手机号String

*/
// params表示入参
// @return表示后端请求成功的返回值
export const userSendSms = mobile => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // 发生请求参数
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
    // 发生请求参数
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
/*
*  说明：关注用户
*  @params target 需要关注的用户id
*/
export const addFollow = data => {
  return request({
    method: 'post',
    url: '/v1_0/user/followings',
    data
  })
}
/*
*  说明：取关用户
*  @params target 需要取关的用户id
*/
export const deleteFollow = target => {
  return request({
    method: 'delete',
    url: `/v1_0/user/followings/${target}`

  })
}
