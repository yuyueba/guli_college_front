<template>
  <div class="app-container">
    banner表单
     <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="Banner.title"/>
      </el-form-item>
      <el-form-item label="banner排序">
        <el-input-number v-model="Banner.sort" controls-position="right" :min="0"/>
      </el-form-item>
    
     
      <el-form-item label="banner链接地址">
        <el-input v-model="Banner.linkUrl" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="banner图片地址">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="Banner.imageUrl"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换图片
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
      -->
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/eduoss/fileoss'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import banner from '@/api/edu/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      Banner:{
          title:'',
          imageUrl:'',
          sort:0,
          linkUrl:'',
          isDeleted:0
      },

      //上传弹框组件是否显示
      imagecropperShow:false,
      imagecropperKey:0,//上传组件key值
      BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    close() { //关闭上传弹框的方法
        this.imagecropperShow=false
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow=false
      //上传之后接口返回图片地址
      this.Banner.imageUrl = data.url
      console.log(data.url)
      this.imagecropperKey = this.imagecropperKey+1
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getInfo(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.Banner = {
          title:'',
          imageUrl:'',
          sort:0,
          linkUrl:'',
          isDeleted:0
         }
      }
    },
    //根据讲师id查询的方法
    getInfo(id) {
      banner.getBannerInfo(id)
        .then(response => {
          this.Banner = response.data.item
        })
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据teacher是否有id
      if(!this.Banner.id) {
        //添加
        this.saveBanner()
      } else {
        //修改
        this.updateBanner()
      }
    },
    //修改讲师的方法
    updateBanner() {
      banner.updateBannerInfo(this.Banner)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/banner/list'})
        })
    },
    //添加讲师的方法
    saveBanner() {
      banner.addBanner(this.Banner)
        .then(response => {//添加成功
          //提示信息
          console.log("1111111111111111")
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/banner/list'})
        })
    }

  }
}
</script>
