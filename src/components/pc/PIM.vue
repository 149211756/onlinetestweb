<template>

  <div>
    <Header></Header>

    <main style="padding-top: 70px; " class="img1">

      <el-row>
        <el-col :span="4">
          <el-menu
            style="height:1000px ;"
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="Transparent"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" @click="changeModule(0)">
              <i class="el-icon-location"></i>
              <span >我的资料</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changeModule(1)">
              <i class="el-icon-menu"></i>
              <span  >参加考试</span>
            </el-menu-item>
            <el-menu-item index="3"  @click="changeModule(2)">
              <i class="el-icon-document"></i>
              <span>我的成绩</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <!--参加考试模块-->
          <div v-if="moduleList[1]">
            <span v-for="(c,index) in catalogList" :key="index"><el-dropdown trigger="click">
           <span class="el-dropdown-link">
           <i class="el-icon-arrow-down el-icon--right" style="cursor: pointer"
              @click="getContext(c.id)">{{c.cname}}</i>
           </span>
         <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-circle-plus" v-for="(d,indexd) in contentList" :key="indexd">
            <el-button type="text" @click="open(d.type)">{{d.cname}}</el-button>
           </el-dropdown-item>
          </el-dropdown-menu>
           </el-dropdown>
            <el-divider></el-divider></span>

        </div>
          <!--我的信息模块-->
          <div v-if="moduleList[0]">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>个人信息</span>
              </div>
              <div  class="text item">
                我的学校：{{this.loginSuccessUser.school}}
              </div>
              <div  class="text item">
                我的姓名：{{this.loginSuccessUser.username}}
              </div>
              <div  class="text item">
                我的学号：{{this.loginSuccessUser.snumber}}
              </div>
            </el-card>
          </div>
          <!--我的成绩模块-->
          <div v-if="moduleList[2]">
            <el-row><el-divider></el-divider></el-row>
              <el-row v-for="(e,indexe) in scoreList" :key="indexe">

                <el-col :span="8">试卷：{{e.cname}}</el-col>
                <el-col :span="8">考试分数：{{e.myscorce}}分</el-col>
                <el-col :span="8">考试时间：{{e.createTime}} </el-col>

                <el-divider></el-divider>
              </el-row>

          </div>
        </el-col>
      </el-row>


    </main>
  </div>


</template>

<script>
  var graceChecker = require("../../assets/js/commons/graceChecker");
  import Header from '../../components/commons/Header'

  export default {
    name: "PIM",
    components: {
      Header
    },
    data() {
      return {
        activeIndex2: '1',
        type: '',
        headline: '',
        contentList: [],
        catalogList: [],
        loginSuccessUser:{},
        scoreList:[],
        moduleList:[true,false,false]
      };
    }, mounted() {
      this.isLogin = graceChecker.isLogin();
      if (!this.isLogin) {
        window.location.href = '/pLogin'
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
      //显示参加考试数据
      open(type) {
        this.$confirm('即将开始考试，是否确定？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href = '/pOnlineTest?type='+type;

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '请重新选择考试'
          });
        });
      },
      //根据左边选项变换右边的div
      changeModule(id){
        this.moduleList=[false,false,false]
        this.moduleList[id]=true;
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

  .img1 {
    background: url('http://q30s3k4i1.bkt.clouddn.com/index0.jpg') center center no-repeat;
    background-size: 100% 100%;
  }

  a {
    color: black;
    text-decoration: none;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    background-color: Transparent;
  }
</style>
