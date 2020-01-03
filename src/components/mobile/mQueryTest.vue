<template>

  <div style="padding-bottom: 30%;">
    <mHeader></mHeader>

    <main  style=" padding-top:0">
      <br>
      <br>
      <van-row type="flex" justify="center">
        <van-col span="12"> <h3 style="text-align:center;">{{headline}}</h3></van-col>
      </van-row>
      <br>
      <br>
      <van-row type="flex" justify="center">
        <van-col span="12"> <h3 style="text-align:center;">我的分数：{{scorces}}分</h3></van-col>
      </van-row>
        <van-panel :title="index+1+'、'+c.title" v-for="(c,index) in questionsList" :key="index" >
          <div v-if="getcontent(c.contentA)"><van-cell :value="c.contentA" /></div>
          <div v-if="getcontent(c.contentB)"><van-cell :value="c.contentB" /></div>
          <div v-if="getcontent(c.contentC)"><van-cell :value="c.contentC" /></div>
          <div v-if="getcontent(c.contentD)"><van-cell :value="c.contentD" /></div>
          <div v-if="getcontent(c.contentE)"><van-cell :value="c.contentE" /></div>
          <div v-if="getcontent(c.contentF)"><van-cell :value="c.contentF" /></div>
          <div style="color: green">正确答案：{{c.answer}}</div>
          <div style="color: red">我的答案：{{answersList[index]}}</div>
          <br>
          <br>
        </van-panel>
        <br>
        <br>

    </main>

    </div>


</template>

<script>
  import mHeader from '../../components/commons/mHeader'
    export default {
        name: "mQueryTest",
      components: {
        mHeader,
      },
      data() {
        return {
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

</style>
