<template>
  <header>
    <div>

      <el-row :gutter="24">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-col :span="6">
            <el-menu-item index="1"><a href="/pIndex">考试首页</a></el-menu-item>
          </el-col>
          <el-col :span="6">
            <el-menu-item index="1"><a href="/pQuestionBank">考试题库</a></el-menu-item>
          </el-col>
          <el-col :span="6">
            <el-menu-item index="3" ><a @click="goPIM">个人中心</a></el-menu-item>
          </el-col>
          <el-col :span="6">
            <el-menu-item index="4">
              <div style="height: 100%;width: 100%" v-if="!isLogin">
                <el-button type="info"><a href="/pLogin" target="_blank" class="mya">登录</a></el-button>
              </div>
              <div  style="height: 100%;width: 100%"  v-if="isLogin">
                欢迎您：{{this.loginSuccessUser.username}}
                <el-button type="info" @click="doLogout">注销</el-button>

              </div>
            </el-menu-item>
          </el-col>
        </el-menu>
      </el-row>
    </div>
  </header>
</template>

<script>
  var graceChecker = require("../../assets/js/commons/graceChecker");

  export default {
        name: "mHeader",

      data(){
        return{
          activeIndex2: '1',
          isLogin: false , //判断用户登录状态
          loginSuccessUser:{} //登录成功的用户对象。

        }

      },

      created(){


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
        doLogout:function () {
          if(this.isLogin){
            if(sessionStorage.getItem("www.simoniu.com")!=null){
              sessionStorage.removeItem("www.simoniu.com");
            }
            if(localStorage.getItem("www.simoniu.com")!=null){
              localStorage.removeItem("www.simoniu.com");
            }
          }

          window.location.href = '/pLogin'
        },
        goPIM(){
          this.isLogin = graceChecker.isLogin();
          if(this.isLogin){
            window.location.href = '/pPIM'
          }else {
            window.location.href = '/pLogin'
          }
        },

      },


    }
</script>

<style scoped>

</style>
