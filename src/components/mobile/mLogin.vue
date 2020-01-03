<template>

  <div class="mybody">
    <div >    <mHeader></mHeader>
      <br/>
      <br/>

      <main style=" padding-top:0">
        <div v-if="! logorreg" >
          <van-row type="flex" justify="center">
            <van-col span="6"><h1>登录</h1></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="4"> <label for="myschool">学校:</label></van-col>
            <van-col span="12"><input type="text" name="myschool" id="myschool"  v-model="loginUser.school"></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="4"> <label for="IDcode">学号:</label></van-col>
            <van-col span="12"> <input type="text" name="IDcode" id="IDcode" v-model="loginUser.snmuber"></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="4"><label for="pass">密码:</label></van-col>
            <van-col span="12"><input type="password" name="pass" id="pass"  v-model="loginUser.password"></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="5"> <label for="code">验证码：</label></van-col>
            <van-col span="12"><input type="text" name="code" id="code" v-model="loginUser.randomCode"></van-col>
          </van-row>
          <br/>
          <van-row type="flex" justify="center">
            <van-col offset="6" span="12">
              <div class="s-canvas">
                <canvas id="s-canvas" style="cursor: pointer" title="看不清楚，换一张" :width="contentWidth"
                        :height="contentHeight"
                        @click="handleClick"></canvas>
              </div>
            </van-col>
          </van-row>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="6"><van-button plain type="primary" @click="doLogin">登录</van-button></van-col>
            <van-col offset="3" span="6"><van-button plain type="primary" @click="toLogorerg">注册</van-button></van-col>
          </van-row>
        </div>


        <div v-if="logorreg">
          <van-row type="flex" justify="center">
            <van-col span="6"><h1>注册</h1></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="5">  <label for="regname">用户名：</label></van-col>
            <van-col span="12"> <input type="text" name="regname" id="regname" v-model="registerUser.username"></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="4"> <label for="snumber">学号：</label></van-col>
            <van-col span="12"> <input type="text" name="snumber" id="snumber" v-model="registerUser.snumber"></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="4">  <label for="school">学校：</label></van-col>
            <van-col span="12"> <input type="text" name="school" id="school" v-model="registerUser.school"></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="4">  <label for="regpass">密码：</label></van-col>
            <van-col span="12">  <input type="password" name="regpass" id="regpass" v-model="registerUser.password"></van-col>
          </van-row>
          <br/>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="6">  <label for="reregpass">确认密码：</label></van-col>
            <van-col span="12"> <input type="password" name="reregpass" id="reregpass" v-model="ensurepassword"></van-col>
          </van-row>
          <br/>
          <van-row type="flex" justify="center">
            <van-col span="6"><van-button plain type="primary" @click="toLogorerg">登录</van-button></van-col>
            <van-col offset="3" span="6"><van-button plain type="primary" @click="doRegister">注册</van-button></van-col>
          </van-row>

        </div>

      </main>

    </div>




  </div>


</template>

<script>
  import mHeader from '../../components/commons/mHeader'
    export default {
        name: "mLogin",
      components: {mHeader},
      props: {
        fontSizeMin: {
          type: Number,
          default: 32
        },
        fontSizeMax: {
          type: Number,
          default: 40
        },
        backgroundColorMin: {
          type: Number,
          default: 180
        },
        backgroundColorMax: {
          type: Number,
          default: 240
        },
        colorMin: {
          type: Number,
          default: 20
        },
        colorMax: {
          type: Number,
          default: 40
        },
        lineColorMin: {
          type: Number,
          default: 20
        },
        lineColorMax: {
          type: Number,
          default: 80
        },
        dotColorMin: {
          type: Number,
          default: 0
        },
        dotColorMax: {
          type: Number,
          default: 255
        },
        contentWidth: {
          type: Number,
          default: 136
        },
        contentHeight: {
          type: Number,
          default: 48
        }
      },
      data() {
        return {
          identifyCode: '',
          msg: '',
          validate: false,  //默认滑块验证没通过
          text: '拖动滑块完成拼图',
          username:'',
          password:'',
          logorreg:false,
          loginUser: {
            password: '',
            snumber: '',
            school:'',
            randomCode:''
          },

          registerUser: {
            username: '',
            password: '',
            validateCode:'',
            snmuber:'',
            school:'',

          },
          ensurepassword:''

        }
      },

      methods:{
        checkValidateCode: function () {
          if (this.randomCode == this.identifyCode) {
            this.$alert('验证通过', '提示信息', {
              confirmButtonText: '确定'

            });
          } else {
            this.$alert('验证码错误', '提示信息', {
              confirmButtonText: '确定'
            });
          }
        },

        //点击生成随机数 并传给调用它的组件（父组件用changeCode接收）
        handleClick() {
          let num = "";
          for (let i = 0; i < 4; i++) {
            num += Math.floor(Math.random() * 10)
          }
          this.identifyCode = num
          let newN = this.identifyCode
          this.$emit('changeCode', newN)
        },
        // 生成一个随机数
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min)
        },
        // 生成一个随机的颜色
        randomColor(min, max) {
          var r = this.randomNum(min, max)
          var g = this.randomNum(min, max)
          var b = this.randomNum(min, max)
          return 'rgb(' + r + ',' + g + ',' + b + ')'
        },
        drawPic() {
          var canvas = document.getElementById('s-canvas')
          var ctx = canvas.getContext('2d')
          ctx.textBaseline = 'bottom'
          // 绘制背景
          ctx.fillStyle = this.randomColor(
            this.backgroundColorMin,
            this.backgroundColorMax
          )
          ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
          // 绘制文字
          for (let i = 0; i < this.identifyCode.length; i++) {
            this.drawText(ctx, this.identifyCode[i], i)
          }
          this.drawLine(ctx)
          this.drawDot(ctx)
        },
        drawText(ctx, txt, i) {
          ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
          ctx.font =
            this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
          var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
          var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
          var deg = this.randomNum(-45, 45)
          // 修改坐标原点和旋转角度
          ctx.translate(x, y)
          ctx.rotate(deg * Math.PI / 180)
          ctx.fillText(txt, 0, 0)
          // 恢复坐标原点和旋转角度
          ctx.rotate(-deg * Math.PI / 180)
          ctx.translate(-x, -y)
        },
        drawLine(ctx) {
          // 绘制干扰线
          for (let i = 0; i < 8; i++) {
            ctx.strokeStyle = this.randomColor(
              this.lineColorMin,
              this.lineColorMax
            )
            ctx.beginPath()
            ctx.moveTo(
              this.randomNum(0, this.contentWidth),
              this.randomNum(0, this.contentHeight)
            )
            ctx.lineTo(
              this.randomNum(0, this.contentWidth),
              this.randomNum(0, this.contentHeight)
            )
            ctx.stroke()
          }
        },
        drawDot(ctx) {
          // 绘制干扰点
          for (let i = 0; i < 100; i++) {
            ctx.fillStyle = this.randomColor(0, 255)
            ctx.beginPath()
            ctx.arc(
              this.randomNum(0, this.contentWidth),
              this.randomNum(0, this.contentHeight),
              1,
              0,
              2 * Math.PI
            )
            ctx.fill()
          }
        },
        doLogin(){
          if (this.identifyCode != this.loginUser.randomCode) {
            this.$message({
              message: '验证码失败!',
              type: 'warning'
            });
            return;
          }
          var that=this;
          this.$axios.get(this.websiteUrl+'/onlinetestdemo/users/login', {       // 还可以直接把参数拼接在url后边
            params: {
              snmuber:that.loginUser.snmuber,
              password: that.loginUser.password,
              school:that.loginUser.school
            }
          }).then(function (res) {
            if (res.data.code == 200) {
              console.log(res.data.data);
              that.loginSuccessUser=res.data.data;
              // console.log(that.loginSuccessUser)

              //将服务器返回的对象存入session缓存
              localStorage.setItem("www.simoniu.com",JSON.stringify(that.loginSuccessUser));
              //跳转页面
              window.location.href = '/mIndex'
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
        doRegister(){
          if (this.registerUser.password=='' || this.registerUser.username=='' || this.registerUser.snumber==''|| this.registerUser.school=='' ) {
            this.$message({
              message: '填写的信息不能为空！',
              type: 'warning'
            });
            return;
          }
          if (this.registerUser.password !=this.ensurepassword) {
            this.$message({
              message: '用户密码与确认密码输入不一致!',
              type: 'warning'
            });
            return;
          }

          var that=this;
          this.$axios.post(this.websiteUrl+'/onlinetestdemo/users/register', this.registerUser).then(function (res) {
            if (res.data.code == 200) {
              that.registerUser = res.data.data;
              this. toLogorerg();
            } else {
              console.log(res.data.msg);
            }

          }).catch(function (error) {
            console.log(error);
          });
        },
        //跳转登录或注册
        toLogorerg(){
          if (this.logorreg){
            this.logorreg=false
          }else {
            this.logorreg=true
          }
        }
      },
      watch: {
        identifyCode() {
          this.drawPic()
        }
      },
      mounted() {

        this.drawPic()
        this.handleClick()
      }
    }
</script>

<style scoped>
  .mybody{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -9;
    background-image: url(http://q30s3k4i1.bkt.clouddn.com/5-13050G31S2%20%281%29.gif);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-bottom: 30%;
  }
</style>
