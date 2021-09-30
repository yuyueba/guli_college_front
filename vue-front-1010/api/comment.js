import request from '@/utils/request'

export default {
  //分页评论查询的方法
  getCommentList(page,limit, courseId) {
    return request({
      url: `/eduservice/educomment/pageComment/${page}/${limit}/${courseId}`,
      method: 'post'
    })
  },

  //评论上传的方法
  publicComment(eduComment) {
    return request({
      url: '/eduservice/educomment/comment/',
      method: 'post',
      data: eduComment
    })
  }

}