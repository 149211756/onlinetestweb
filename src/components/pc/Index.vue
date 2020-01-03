<template>
  <div class="img1">

<Header></Header>
    <main>
    <div >
        <el-row>
          <el-col :offset="3" :span="8">
            <img src="http://q30s3k4i1.bkt.clouddn.com/index1.jpg"/>
          </el-col>
          <el-col :span="12">
            <div style="margin-top: 50px">
              <el-row>
                <el-col :offset="6" :span="18">
                  <h1 style="color: #31b0d5">传奇考试，最好的在线考试系统</h1>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="8" :span="9">
                  <p style="color: grey">专注于提升培训考试管理水平</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="9" :span="9">
                  <p style="color: grey">节省培训考试成本</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="9" :span="9">
                  <p style="color: grey">优雅的组织每场考试</p>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 30px;margin-left: 200px ;width: 80%;">

        <el-row>
          <el-col :span="8"><h1 class="myh1">70,0000+</h1></el-col>
          <el-col :span="8"><h1 class="myh1">1800万+</h1></el-col>
          <el-col :span="8"><h1 class="myh1">500万+</h1></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><p class="psize">机构的共同选择</p></el-col>
          <el-col :span="8"><p class="psize">累计总考试人次</p></el-col>
          <el-col :span="8"><p class="psize">用户导入题目数量</p></el-col>
        </el-row>

      </div>
      <div style="text-align:center;width:100%;">
        <p style="color: #31b0d5;font-size: 40px">满足多种业务场景</p>
        <p style="color: grey;font-size: 20px">随时随地组织考试</p>
      </div>
      <div style="margin-top: 20px;margin-left: 200px ;width: 80%;">
        <el-row>
          <el-col :span="6"> <a href="#" title="考核考试"><i class="fa fa-5x fa-users"></i><span>考核考试</span></a></el-col>
          <el-col :span="6"> <a href="#" title="练习作业"><i class="fa fa-5x  fa-pencil-square-o"></i><span>练习作业</span></a></el-col>
          <el-col :span="6"> <a href="#" title="考试培训"><i class="fa fa-5x  fa-leanpub"></i><span>考试培训</span></a></el-col>
          <el-col :span="6"> <a href="#" title="题库系统"><i class="fa fa-5x fa-database"></i><span>题库系统</span></a></el-col>
        </el-row>
     <br/>
     <br/>
        <el-row>
          <el-col :span="6"> <a href="#" title="考生管理"><i class="fa fa-5x fa-mortar-board"></i><span>考生管理</span></a></el-col>
          <el-col :span="6"> <a href="#" title="招聘考试"><i class="fa fa-5x fa-handshake-o"></i><span>招聘考试</span></a></el-col>
          <el-col :span="6"> <a href="#" title="知识竞赛"><i class="fa fa-5x  fa-line-chart"></i><span>知识竞赛</span></a></el-col>
          <el-col :span="6"> <a href="#" title="局域网考试"><i class="fa fa-5x  fa-codepen"></i><span> 局域网考试</span></a></el-col>
        </el-row>



      </div>
      <div style="margin-top: 70px;text-align:center;width:100%;">
        <p style="color: #31b0d5;font-size: 40px">功能强大，容易操作</p>
        <p style="color: grey;font-size: 20px">提供多功能在线考试</p>
      </div>
    </main>



  </div>
</template>

<script>
  // import imgUrl from 'http://q30s3k4i1.bkt.clouddn.com/index0.jpg';

  import Header from '../../components/commons/Header'

  export default {
    name: "Index",
    components:{
      Header
    },
    data() {
      return {
        activeIndex2: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

  @import "../../assets/css/font-awesome.min.css";
  .img1 {
    background: url('http://q30s3k4i1.bkt.clouddn.com/index0.jpg') center center no-repeat;
    background-size: 100% 100%;

  }



  .psize{
    font-family: Arial;
    color: #5e5e5e;
    font-size: 20px;
  }
  .myh1{
    color: grey;
  }


  i{
    color: #357ebd;
  }
  a{
    color: black;
  }

</style>
