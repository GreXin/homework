// 统一API出口
import {
  Login, userSendSms, getUserInfo, getUserChannels,
  addFollow, deleteFollow
} from './user.js'
import { getArticleList, getArticleById, addCollect, deleteCollect, addLike, deleteLike } from './article.js'
import { getAllChannels, addUserChannel, delUserChannel } from './channel.js'
import { getSearchSuggestions, getSearchResults } from './search.js'
import { getComments } from './comment.js'

export const LoginAPI = Login
export const userSendSmsAPI = userSendSms
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticleListAPI = getArticleList
export const getAllChannelsAPI = getAllChannels
export const addUserChannelAPI = addUserChannel
export const delUserChannelAPI = delUserChannel
export const getSearchSuggestionsAPI = getSearchSuggestions
export const getSearchResultsAPI = getSearchResults
export const getArticleByIdAPI = getArticleById
export const deleteFollowAPI = deleteFollow
export const addFollowAPI = addFollow
export const deleteCollectAPI = deleteCollect
export const addCollectAPI = addCollect
export const addLikeAPI = addLike
export const deleteLikeAPI = deleteLike
export const getCommentsAPI = getComments
