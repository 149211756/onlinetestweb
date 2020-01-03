<template>
  <div class="img1">
    <Header></Header>

    <main>

      <div class="library_f">
        <div style="margin: 0 auto;width: 1220px;font-size:14px;line-height:30px;text-align:center;margin-bottom:10px">
          本栏目下题库来源于互联网，传奇考试承诺对于用户导入平台的题库是严格保密的，不会在此呈现！
          <br/>传奇考试给您提供更好的在线考试系统服务！
        </div>
        <div class="tree_list">
          <div style="padding:15px;">


            <div>
              <div style="font-size:16px;font-weight:600;line-height:40px;border-bottom:1px solid #eeeeee">传奇考试题库</div>
              <div style="clear:both"></div>
              <div style="line-height:26px;padding-top:5px;font-size:14px;">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane v-for="(c,index) in catalogList" :key="index" :label="c.id" :name="c.name"  >
                    <div class="library">
                      <div class="library_items">
                        <div class="library_item" v-for="(p,pindex) in contentList" :key="pindex" >
                          <div     style="line-height:150%;padding:8px;height: 120px;vertical-align: middle;display: table-cell;text-align: center;width: 290px;">
                            <a :href="getHerf(p.type)">{{p.cname}}</a>
                          </div>
                        </div>
                        <div style="clear:both"></div>
                      </div>
                      <div class="library_page">


                        <a class="page_true" href="#">&lt;&lt;</a>
                        <a class="page_true" href="#">&lt;</a>

                        <span>
				<a href="#" class="page_cur">1</a>
			</span>


                        <a class="page_true" href="#">&gt;</a>
                        <a class="page_true" href="#">&gt;&gt;</a>
                        <div style="float:left;line-height:46px;">共<span>1</span>页</div>
                        <div style="clear:both"></div>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>

            </div>


          </div>
        </div>
      </div>


    </main>


  </div>
</template>

<script>
  import Header from '../../components/commons/Header'

  export default {
    name: "QuestionBank",
    components: {
      Header,
    },
    data() {
      return {
        activeIndex2: '1',
        activeName:'',
        pid:'',
        contentList:[],
        catalogList:[]


      };
    },
    mounted(){
      this.initCatalogList();
      this.docontent("法律基础知识试题");
    }
    ,
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClick(tab, event) {
        this.docontent(tab.label)
      },
      initCatalogList(){
        let url=this.websiteUrl+'/onlinetestdemo/catalog/'
        var that=this;
        this.$axios.get(url).then(function (res) {
          if (res.data.code == 200) {
            that.catalogList = res.data.data;
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

      docontent(id){

        var that=this;
        this.$axios.get(this.websiteUrl+'/onlinetestdemo/content/', {       // 还可以直接把参数拼接在url后边
          params: {
            pid:id,
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
      getHerf(val){

        return '/pQuestionsBace?type='+val
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

  .lispan{
cursor: pointer;
  }
</style>
