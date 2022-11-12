import { request } from '../utils/request.js'
/**
 * 说明：获取评论或评论回复
 *
 * @param type 评论类型 a-对文章的评论列表 ，c-对评论的回复列表
 * @param source 源id type为a时=>文章id，type为c时=> 评论id
 * @param offset 评论id （通过评论id获取评论列表的偏移量，如果不传，则以最新的评论开始获取）
 * @param limit 单页列表获取的数量
 *
 */
export const getComments = params => request({
  method: 'GET',
  url: '/v1_0/comments',
  params
})
