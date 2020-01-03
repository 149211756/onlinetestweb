<template>
  <div class="img1">
    <Header></Header>

    <main>

      <div class="counttime">
        距离自动交卷时间还有：<br/>{{minutes}} 分{{seconds}}秒

      </div>
      <div class="question_d">
        <div style="margin: 0 auto;width: 1220px;font-size:14px;line-height:30px;text-align:center;margin-bottom:10px">
          本栏目下题库来源于互联网，传奇考试承诺对于用户导入平台的题库是严格保密的，不会在此呈现！
          <br/>传奇考试给您提供更好的在线考试系统服务！
        </div>
        <div class="question_t" style="line-height:80px;text-align:center"><h1>{{headline}}</h1></div>
        <div class="question_q">
          <div style="border-bottom:1px #eeeeee dashed;margin-bottom:10px;padding-bottom:10px"
               v-for="(c,index) in questionsList" :key="index">
            <div>
              <span>{{index+1}}</span>、
              <span>{{c.title}}
<span class="pointLabel">[4分]</span></span>
            </div>
            <div>
              <div v-if="getcontent(c.contentA)">
                <span><label><input :name="getindex(index)" type="checkbox" value="A" v-model="answerList[index]"/>{{c.contentA}} </label></span>
              </div>
              <div v-if="getcontent(c.contentB)">
                <span><label><input :name="getindex(index)" type="checkbox" value="B" v-model="answerList[index]"/>{{c.contentB}}</label></span>
              </div>
              <div v-if="getcontent(c.contentC)">
                <span><label><input :name="getindex(index)" type="checkbox" value="C" v-model="answerList[index]"/>{{c.contentC}}</label></span>
              </div>
              <div v-if="getcontent(c.contentD)">
                <span><label><input :name="getindex(index)" type="checkbox" value="D" v-model="answerList[index]"/>{{c.contentD}}</label></span>
              </div>
              <div v-if="getcontent(c.contentE)">
                <span><label><input :name="getindex(index)" type="checkbox" value="E" v-model="answerList[index]"/>{{c.contentE}}</label></span>
              </div>
              <div v-if="getcontent(c.contentF)">
                <span><label><input :name="getindex(index)" type="checkbox" value="F" v-model="answerList[index]"/>{{c.contentF}}</label></span>
              </div>
            </div>

            <div style="height:20px;"></div>
          </div>
          <el-button type="text" @click="dosubmit">
            <el-button type="success">提交</el-button>
          </el-button>

        </div>
      </div>

    </main>
  </div>
</template>

<script>
  import Header from '../../components/commons/Header'

  var graceChecker = require("../../assets/js/commons/graceChecker");

  export default {
    name: "OnlineTest",
    components: {
      Header
    },
    data() {
      return {
        activeIndex2: '1',
        type: '',
        headline: '',
        questionsList: [],
        answerList: [],
        answers: '',
        minutes: 29, //分
        seconds: 59, //秒
        scorces: '',
        loginSuccessUser: {},
        score: {
          school: '',
          snumber: '',
          cname: '',//科目
          myscorce: ''//分数

        }


      };
    },
    mounted() {
      this.type = this.$route.query.type;
      //获取登录用户信息
      this.isLogin = graceChecker.isLogin();
      if (!this.isLogin) {
        window.location.href = '/pLogin'
      }
      if (this.isLogin) {
        if (sessionStorage.getItem("www.simoniu.com") != null) {

          //JSON.parse
          //JSON.stringify   是jQuery的方法，在vue 默认是不能用。

          this.loginSuccessUser = JSON.parse(sessionStorage.getItem("www.simoniu.com"));
          // console.log(this.loginSuccessUser);

        }
        if (localStorage.getItem("www.simoniu.com") != null) {

          this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));
          // console.log(this.loginSuccessUser);

        }
        if (this.type == null) {
          that.$message({
            message: '页面跳转失败，请返回题库选择要考试的题库',
            type: 'warning'
          });
        }
      }
      for (let i = 0; i < 25; i++) {
        this.answerList[i] = new Array();
      }
      this.timer();
      this.myContent(this.type);
    },
    watch: {
      // 倒计时
      second: {
        handler(newVal) {
          this.num(newVal);
        },
      },
      // 倒计时
      minute: {
        handler(newVal) {
          this.num(newVal);
        },
      },
    },
    computed: {
      // 倒计时
      second: function () {
        return this.num(this.seconds);
      },
      minute: function () {
        return this.num(this.minutes);
      },
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      myContent(type) {

        var that = this;
        this.$axios.get(this.websiteUrl + '/onlinetestdemo/questions/', {       // 还可以直接把参数拼接在url后边
          params: {
            type: type,
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.questionsList = res.data.data;
            that.headline = that.questionsList[1].headline;//文章标题的名字
            // console.log( that.questionsList );
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
      getcontent(i) {
        if (i == null) {
          return false;
        } else {
          return true;
        }
      },
      //提交
      dosubmit() {
        this.$confirm('交卷后将不能更改，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.getscorces();

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '提交已取消'
          });
        });
      },
      //获取问题下标
      getindex(index) {
        return index;
      },
      //获取分数

      getscorces() {
        for (let i = 0; i < 25; i++) {
          if (this.answerList[i] == '') {
            this.answerList[i] = "null";
          } else {
            this.answerList[i].sort();
            this.answerList[i] = this.answerList[i].toString().split(',');
            this.answerList[i] = this.answerList[i].join('')
            // console.log( this.answerList[i])
          }
        }
        localStorage.setItem("answerList", JSON.stringify(this.answerList));
        this.answers = this.answerList.toString();
        var that = this;
        this.$axios.get(this.websiteUrl + '/onlinetestdemo/questions/answers', {       // 还可以直接把参数拼接在url后边
          params: {
            answers: that.answers,
            type: that.type,
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.scorces = res.data.data;
            localStorage.setItem("scorces", JSON.stringify(res.data.data));
            that.toQueryTest();
          } else {
            that.$message({
              message: '用户名或密码错误!',
              type: 'warning'
            });
          }

        }).catch(function (error) {
          console.log(error);
        });

      },
      //倒计时页面数字显示
      num(n) {
        // 倒计时结束重新刷新页面
        if (this.minutes === 1 && this.seconds === 59) {
          this.$message.warning('试卷将在一分钟后自动提交!');
        }
        if (this.minutes === 0 && this.seconds === 0) {
          this.getscorces();
        }
        return n < 10 ? '0' + n : '' + n;
      },
      //倒计时时间
      timer() {
        var _this = this;
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            window.clearInterval(time);
          } else {
            _this.seconds -= 1;
          }
        }, 1000);
      },
      //跳转到答题后的页面
      toQueryTest() {

        //保存该次考试记录和成绩到数据库
        this.score.school = this.loginSuccessUser.school;
        this.score.snumber = this.loginSuccessUser.snumber;
        this.score.cname = this.headline;
        this.score.myscorce=JSON.parse(localStorage.getItem("scorces"));
        // console.log( this.score);
        // console.log(this.scorces);
        // console.log(this.score.myscorce);


        var that = this;
        this.$axios.post(this.websiteUrl + '/onlinetestdemo/score/save', this.score).then(function (res) {
          if (res.data.code == 200) {
            window.location.href = '/pQueryTest?type=' + that.type;
          } else {
            console.log(res.data.msg);
          }

        }).catch(function (error) {
          console.log(error);
        });

      },
      isLogin: function () {
        if (sessionStorage.getItem("www.simoniu.com") != null || localStorage.getItem("www.simoniu.com") != null) {
          return true;
        }
        return false;
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

  main {
    padding-top: 150px;
  }

  .counttime {
    position: fixed;
    width: 100px;
    height: 100px;
    right: 20px;
    top: 100px;

  }
</style>
