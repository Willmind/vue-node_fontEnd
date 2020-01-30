<template>
  <div class="form">
    <div v-if="loginData">
      <el-form :model="loginForm"  ref="loginForm" label-width="80px">
        <h2>系统登录</h2>
        <el-form-item label="用户名" prop="name">
          <el-input  placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码"  prop="password">
          <el-input show-password  placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" @click="refresh">重置</el-button>
          <el-button @click="login">登录</el-button>
          <el-button @click="goRegister">注册</el-button>
          <el-button @click="goUserList">列表信息</el-button>

        </el-form-item>




      </el-form>

    </div>

    <div v-if="registerData">
      <Register @goBack="back()"></Register>
    </div>

    <div v-if="userListData">
      <userList @goBack="back()"></userList>
    </div>

  </div>


</template>

<script>
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import Register from "./Register";
    import userList from "./userList";


    export default {
        name: "Login",
        components:{
            Register,
            userList
        },
        data(){
            return{
                loginData:false,
                registerData:false,
                userListData:true,
                loginForm:{
                    username:'admin',
                    password:'123456',
                },
            }
        },
        methods:{
            back(){
                this.loginData=true
                this.registerData=false
                this.userListData=false
            },
            goRegister(){
                this.loginData=false
                this.registerData=true
                this.userListData=false
            },
            goUserList(){
                this.loginData=false
                this.registerData=false
                this.userListData=true
            },
            refresh(){
                this.loginForm.username=''
                this.loginForm.password=''


            },
            login(){
                axios.post("/users/login",{
                    loginForm:this.loginForm
                }).then((response)=>{
                    if(response.status==200){
                        let res=response.data
                        console.log(response);
                        if(res.status == '0'){
                            this.$message.success('登录成功');
                        }else{
                            this.$message('密码错误');
                        }
                    }else{
                        this.$message.error('登录超时');
                    }

                })

            },

        },
        mounted() {

        }

    }
</script>

<style lang="scss" scoped>
  .form{
    display: flex;
    justify-content: center;
    .el-form{
      width: 520px;

    }
  }



</style>
