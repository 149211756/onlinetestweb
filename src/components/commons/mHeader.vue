<template>
  <div>
    <van-nav-bar
      title="川琦考试"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <Header>
      <van-tabbar v-model="active" >
        <van-tabbar-item name="mIndex" icon="home-o" @click="tomIndex">首页</van-tabbar-item>
        <van-tabbar-item name="mQuestionBank" icon="search" @click="toQuestionBank">题库</van-tabbar-item>
        <van-tabbar-item  name="mOnlineTest" icon="todo-list-o" @click="tomOnlineTestCatalog" >考试</van-tabbar-item>
        <van-tabbar-item name="mLogin" icon="friends-o" v-if="!isLogin" @click="tomLogin">未登录
        </van-tabbar-item>
        <van-tabbar-item name="mPIM" icon="friends-o" v-if="isLogin" @click="tomPIM">{{this.loginSuccessUser.username}}
        </van-tabbar-item>
      </van-tabbar>

    </Header>
  </div>
</template>

<script>
  var graceChecker = require("../../assets/js/commons/graceChecker");

  export default {
        name: "mHeader",
    data() {
      return {
        active: "mIndex",
        isLogin: false , //判断用户登录状态
        loginSuccessUser:{} //登录成功的用户对象。
      }
    },
    mounted(){
      this.isLogin = graceChecker.isLogin();
      if(this.isLogin){
        if(sessionStorage.getItem("www.simoniu.com")!=null){

          //JSON.parse
          //JSON.stringify   是jQuery的方法，在vue 默认是不能用。

          this.loginSuccessUser = JSON.parse( sessionStorage.getItem("www.simoniu.com"));
          // console.log(this.loginSuccessUser);

        }
        if(localStorage.getItem("www.simoniu.com")!=null){

          this.loginSuccessUser = JSON.parse( localStorage.getItem("www.simoniu.com"));
          // console.log(this.loginSuccessUser);

        }
      }
    },

    methods:{
      onClickLeft() {
        this.$router.go(-1);//返回上一层
      },

      goPIM(){
        this.isLogin = graceChecker.isLogin();
        if(this.isLogin){
          window.location.href = '/mPIM'
        }else {
          window.location.href = '/mLogin'
        }
      },
      //转到移动端登录页面
      tomLogin(){
        window.location.href = '/mLogin'
      },
      toQuestionBank(){
        window.location.href = '/mQuestionBank'
      },
      tomIndex(){
        window.location.href = '/mIndex'
      },
      tomOnlineTestCatalog(){
        if(this.isLogin){
          window.location.href = '/mOnlineTestCatalog'
          return
        }
        window.location.href = '/mLogin'

      },
      tomPIM(){
        window.location.href = '/mPIM'
      }
    }
    }
</script>

<style scoped>



</style>
