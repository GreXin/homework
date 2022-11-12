// 文章相关接口
import { request } from '../utils/request.js'
/*
    *说明：根据频道获取文章列表

    *params channer_id 频道id
    *params timestamp 时间戳，请求新的数据传当前的时间戳，请求历史推荐传指定的时间戳
*/
export const getArticleList = params => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}
/*
    *说明：获取文章详情

    *params articleId 文章id
*/
export const getArticleById = articleId => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
  })
}

/*
*  说明：收藏文章
*  @params target 需要收藏的文章id
*/
export const addCollect = data => request({
  method: 'POST',
  url: '/v1_0/article/collections',
  data
})
/*
*  说明：取消收藏文章
*  @params target 需要取关的用户id
*/
export const deleteCollect = target => {
  return request({
    method: 'delete',
    url: `/v1_0/user/followings/${target}`

  })
}
/*
*  说明：点赞文章
*  @params target 需要点赞的文章id
*/
export const addLike = data => request({
  method: 'POST',
  url: '/v1_0/article/likings',
  data
})
/*
*  说明：取消收藏文章
*  @params target 需要取关的用户id
*/
export const deleteLike = target => request({
  method: 'DELETE',
  url: `/v1_0/article/likings/${target}`
})
