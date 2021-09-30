import request from '@/utils/request'
export default {

    getBannerListPage(current,limit) {
        return request({
            //url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
            url: `/educms/banneradmin/pageBanner/${current}/${limit}`,
            method: 'get'
          })
    },
    //删除banner
    deleteBannerId(id) {
        return request({
            url: `/educms/banneradmin/remove/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addBanner(Banner) {
        return request({
            url: '/educms/banneradmin/addBanner',
            method: 'post',
            data: Banner
          })
    },
    //根据id查询讲师
    getBannerInfo(id) {
        return request({
            url: `/educms/banneradmin/get/${id}`,
            method: 'get'
          })
    },
    //修改讲师
    updateBannerInfo(Banner) {
        return request({
            url: '/educms/banneradmin/update',
            method: 'post',
            data: Banner
          })
    }
}
