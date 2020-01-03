<template>
  <div>
  <Header></Header>
    <main>
  <div class="divmain">
    <div class="materialContainer">
      <div class="box">
        <div class="title">登录</div>
        <div class="input">
        <label for="myschool">学校</label>
        <input type="text" name="myschool" id="myschool"  v-model="loginUser.school">
        <span class="spin"></span>
      </div>
        <div class="input">
          <label for="IDcode">学号</label>
          <input type="text" name="IDcode" id="IDcode" v-model="loginUser.snmuber">
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="pass">密码</label>
          <input type="password" name="pass" id="pass"  v-model="loginUser.password">
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="code">验证码</label>
          <input type="text" name="code" id="code" v-model="loginUser.randomCode">
          <span class="spin"></span>
        </div>
        <div class="s-canvas">
          <canvas id="s-canvas" style="cursor: pointer" title="看不清楚，换一张" :width="contentWidth"
                  :height="contentHeight"
                  @click="handleClick"></canvas>
        </div>
        <div class="button login">
          <button @click="doLogin" >
            <span>登录</span>
            <i class="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        </div>
        <a href="javascript:" class="pass-forgot">忘记密码？</a>
      </div>

      <div class="overbox">
        <div class="material-button alt-2">
          <span class="shape"></span>
        </div>
        <div class="title">注册</div>
        <div class="input">
          <label for="regname">用户名</label>
          <input type="text" name="regname" id="regname" v-model="registerUser.username">
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="snumber">学号</label>
          <input type="text" name="snumber" id="snumber" v-model="registerUser.snumber">
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="school">学校</label>
          <input type="text" name="school" id="school" v-model="registerUser.school">
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="regpass">密码</label>
          <input type="password" name="regpass" id="regpass" v-model="registerUser.password">
          <span class="spin"></span>
        </div>
        <div class="input">
          <label for="reregpass">确认密码</label>
          <input type="password" name="reregpass" id="reregpass" v-model="ensurepassword">
          <span class="spin"></span>
        </div>
        <div class="button myreg">
          <button @click="doregister">
            <span>注册</span>
          </button>
        </div>
      </div>
    </div>
  </div>
    </main>
  </div>
</template>

<script>

  import login from '../../assets/js/login';
  import Header from '../../components/commons/Header'
  export default {
    name: "Login",
    components:{
      Header
    },
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
      };
    },
    methods: {

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

      //登录事件
      doLogin: function () {
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
            window.location.href = '/pIndex'
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
      //注册事件
      doregister: function () {
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
            console.log( that.registerUser);
          } else {
            console.log(res.data.msg);
          }

        }).catch(function (error) {
          console.log(error);
        });

      },
      sendRegCode(){

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
  @import "../../assets/css/style.css";
  @import "../../assets/css/font-awesome.min.css";


  #slider {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  .myreg{
    width: 40%;
    margin-left: 110px;
  }
</style>
