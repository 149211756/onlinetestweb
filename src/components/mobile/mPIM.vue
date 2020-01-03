<template>
  <div style="padding-bottom: 30%;">
    <mHeader></mHeader>

    <van-tabs v-model="active">
      <van-tab title="个人信息">
        <div>
          <van-swipe-cell>
            <van-cell :border="false" title="我的学校："><i style="color: black">{{this.loginSuccessUser.school}}</i></van-cell>
            <template slot="right">
              <van-button square type="primary" text="修改信息"/>
            </template>
          </van-swipe-cell>
          <van-swipe-cell>
            <van-cell :border="false" title="我的姓名："><i style="color: black">{{this.loginSuccessUser.username}}</i></van-cell>
            <template slot="right">
              <van-button square type="primary" text="修改信息"/>
            </template>
          </van-swipe-cell>
          <van-swipe-cell>
            <van-cell :border="false" title="我的学号："><i style="color: black"> {{this.loginSuccessUser.snumber}}</i></van-cell>
            <template slot="right">
              <van-button square type="primary" text="修改信息"/>
            </template>
          </van-swipe-cell>

        </div>

      </van-tab>
      <van-tab title="我的考试">
        <div>
          <br>
          <br>
          <van-row>
            <van-col span="24">   <h3>参与的考试次数：{{scoreList.length}}</h3></van-col>
          </van-row>
          <br>
          <br>
          <van-cell-group v-for="(e,indexe) in scoreList" :key="indexe">
            <van-cell title="试卷：" :value="e.cname" />
            <van-cell title="考试分数：" :value="e.myscorce" />
            <van-cell title="考试时间：" :value="e.createTime" />
            <br>
            <br>
            <br>
          </van-cell-group>


        </div>
       </van-tab>
    </van-tabs>


  </div>

</template>

<script>
  import mHeader from '../../components/commons/mHeader'
  var graceChecker = require("../../assets/js/commons/graceChecker");

  export default {
        name: "mPIM",
    components: {
      mHeader,
    },
    data() {
      return {
        active: 0,
        type: '',
        headline: '',
        contentList: [],
        catalogList: [],
        loginSuccessUser:{},
        scoreList:[],
      };
    }, mounted() {
      this.isLogin = graceChecker.isLogin();
      if (!this.isLogin) {
        window.location.href = '/mLogin'
      }
      if(this.isLogin){
        if(sessionStorage.getItem("www.simoniu.com")!=null){

          //JSON.parse
          //JSON.stringify   是jQuery的方法，在vue 默认是不能用。

          this.loginSuccessUser = JSON.parse( sessionStorage.getItem("www.simoniu.com"));
          // console.log(this.loginSuccessUser);

        }
        if(localStorage.getItem("www.simoniu.com")!=null){

          this.loginSuccessUser = JSON.parse( localStorage.getItem("www.simoniu.com"));


        }
        this.initCatalogList();
        this.queryscore(this.snmuber);


      }
    },
    methods: {

      //显示参加考试数据
      initCatalogList() {
        let url = this.websiteUrl + '/onlinetestdemo/catalog/'
        var that = this;
        this.$axios.get(url).then(function (res) {
          if (res.data.code == 200) {
            that.catalogList = res.data.data;
          } else {
            that.$message({
              message: res.data.msg,
              type: 'error'
            })
          }

        }).catch(function (error) {
          that.$message({
            message: '查询板块失败',
            type: 'error'
          })
        });
      },
      //显示参加考试数据
      getContext(id) {
        var that = this;
        this.$axios.get(this.websiteUrl + '/onlinetestdemo/content/', {       // 还可以直接把参数拼接在url后边
          params: {
            pid: id,
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.contentList = res.data.data;
          } else {
            that.$message({
              message: '页面内容错误',
              type: 'warning'
            });
          }

        }).catch(function (error) {
          console.log(error);
        });

      },
      //显示考试成绩
      queryscore(){
        var that=this;
        this.$axios.get(this.websiteUrl+'/onlinetestdemo/score/queryscore', {       // 还可以直接把参数拼接在url后边
          params: {
            school:that.loginSuccessUser.school,
            snumber:that.loginSuccessUser.snumber,
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.scoreList=res.data.data;
          } else {
            console.log(error);
          }
        }).catch(function (error) {
          console.log(error);
        });


      }


    },

  }
</script>

<style scoped>

</style>
