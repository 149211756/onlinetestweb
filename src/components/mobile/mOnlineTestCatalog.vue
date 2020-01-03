<template>
  <div  style="padding-bottom: 30%;">
    <mHeader></mHeader>

    <main  style=" padding-top:0">
      <van-row type="flex" justify="end">
        <van-col  span="8"><van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="toQuestionBace">在线考试</van-button></van-col>
      </van-row>
      <van-row>
        <van-col span="6"><van-sidebar v-model="activeKey" >
          <van-sidebar-item :title="c.cname" v-for="(c,index) in catalogList" :key="index" @click="docontent(c.cname)" />
        </van-sidebar></van-col>


        <van-col offset="2" span="16">
          <div>
            <van-radio-group v-model="radio">
              <van-cell-group>
                <van-cell :title="p.cname" clickable @click="changeRadio(pindex)" v-for="(p,pindex) in contentList" :key="pindex">
                  <van-radio slot="right-icon" :name="pindex" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </van-col>
      </van-row>





    </main>

  </div>
</template>

<script>
  import mHeader from '../../components/commons/mHeader'

  export default {
    name: "mOnlineTestCatalog",
    components: {
      mHeader,
    },
    data() {
      return {
        pid:'',
        contentList:[],//内容
        catalogList:[],//目录
        activeKey: 0,//目录下标
        radio: '',
        mytype:''

      };
    },
    mounted(){
      this.initCatalogList();
      this.showCatalog();
    }
    ,
    methods: {
      //获取目录
      initCatalogList(){
        let url=this.websiteUrl+'/onlinetestdemo/catalog/'
        var that=this;
        this.$axios.get(url).then(function (res) {
          if (res.data.code == 200) {
            that.catalogList = res.data.data;
            // console.log(that.catalogList);
            that.docontent(that.catalogList[0].cname)
          } else {
            that.$message({
              message:res.data.msg,
              type:'error'
            })
          }

        }).catch(function (error) {
          that.$message({
            message:'查询板块失败',
            type:'error'
          })
        });
      },

      //获取内容
      docontent(id){

        var that=this;
        this.$axios.get(this.websiteUrl+'/onlinetestdemo/content/', {       // 还可以直接把参数拼接在url后边
          params: {
            pid:id,
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.contentList = res.data.data;
            // console.log(that.contentList)
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
      //跳转到对应题
      getHerf(val){

        return '/mQuestionsBace?type='+val
      },
      //页面上显示目录
      showCatalog(){


      },
      //修改radio值
      changeRadio(id){
        this.radio=id;
       this.mytype=this.contentList[this.radio].type;
      },
      //跳转到题库目录对应题的页面
      toQuestionBace(){
        this.$dialog.confirm({
          title: '即将参加考试，是否要进行考试',
        }).then(() => {
          window.location.href = '/mOnlineTest?type='+this.mytype;
        }).catch(() => {
          return
        });


      }


    }
  }
</script>

<style scoped>

</style>
