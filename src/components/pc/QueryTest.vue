<template>
  <div class="img1">
    <Header></Header>

    <main >

      <main >

        <div class="question_d">
          <div style="margin: 0 auto;width: 1220px;font-size:14px;line-height:30px;text-align:center;margin-bottom:10px">
            本栏目下题库来源于互联网，传奇考试承诺对于用户导入平台的题库是严格保密的，不会在此呈现！
            <br/>传奇考试给您提供更好的在线考试系统服务！
          </div>
          <div class="question_t" style="line-height:80px;text-align:center"><h1>{{headline}}</h1>
            <h1> 我的分数：{{scorces}}</h1>
          </div>
          <div class="question_q">
            <div style="border-bottom:1px #eeeeee dashed;margin-bottom:10px;padding-bottom:10px" v-for="(c,index) in questionsList" :key="index">
              <div>
                <span>{{index+1}}</span>、
                <span>{{c.title}}
<span class="pointLabel">[4分]</span></span>
              </div>
              <div>
                <div v-if="getcontent(c.contentA)">
                  <span>{{c.contentA}}</span>
                </div>
                <div v-if="getcontent(c.contentB)">
                  <span>{{c.contentB}}</span>
                </div>
                <div v-if="getcontent(c.contentC)">
                  <span>{{c.contentC}}</span>
                </div>
                <div v-if="getcontent(c.contentD)">
                  <span>{{c.contentD}}</span>
                </div>
                <div v-if="getcontent(c.contentE)">
                  <span>{{c.contentE}}</span>
                </div>
                <div v-if="getcontent(c.contentF)">
                  <span>{{c.contentF}}</span>
                </div>
              </div>

              <div style="height:20px;"></div>
              <div><strong>正确答案：</strong><span>{{c.answer}}</span></div>
              <div><strong>我的答案：</strong><span>{{answersList[index]}}</span></div>
            </div>
          </div>
        </div>

      </main>
    </main>
  </div>
</template>

<script>
  import Header from '../../components/commons/Header'

  export default {
    name: "QueryTest",
    components: {
      Header
    },
    data() {
      return {
        activeIndex2: '1',
        type:'',
        headline:'',//标题
        questionsList:[],
        answersList:[],//成绩数组
        scorces:'',//成绩




      };
    },
  mounted(){
    this.type=this.$route.query.type;
    if( this.type==null){
      that.$message({
        message: '页面跳转失败，请返回题库选择要考试的题库',
        type: 'warning'
      });
    }
    this.answersList=JSON.parse(localStorage.getItem("answerList"));
    this.scorces=JSON.parse(localStorage.getItem("scorces"));


    this.myContent(this.type);
  },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      myContent(type){

        var that=this;
        this.$axios.get(this.websiteUrl+'/onlinetestdemo/questions/', {       // 还可以直接把参数拼接在url后边
          params: {
            type:type,
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.questionsList = res.data.data;
             that.headline=that.questionsList[1].headline;//文章标题的名字
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

      myContent(type){
        var that=this;
        this.$axios.get(this.websiteUrl+'/onlinetestdemo/questions/', {       // 还可以直接把参数拼接在url后边
          params: {
            type:type,
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.questionsList = res.data.data;
            that.headline=that.questionsList[1].headline;//文章标题的名字
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
      getcontent(i){
        if (i==null){
          return false;
        } else {
          return true;
        }
      }
    }


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
  main{
    padding-top: 150px;
  }
</style>
