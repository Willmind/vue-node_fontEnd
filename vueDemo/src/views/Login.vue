<template>
  <div class="form">

    <el-form :model="loginForm" :rules="rules"  ref="loginForm" label-width="80px">
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
      </el-form-item>




    </el-form>
  </div>

</template>

<script>
    import axios from 'axios'
    import Cookies from 'js-cookie'


    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:'admin',
                    password:'123456',
                },
                rules:{
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]

                }
            }
        },
        methods:{
            refresh(){
                this.loginForm.username=''
                this.loginForm.password=''


            },
            login(){
                axios.post("/users/login",{
                    loginForm:this.loginForm
                }).then((response)=>{
                    let res=response.data
                    console.log(res);
                    if(res.status == '0'){
                        alert('登录成功'+res.result.name)
                    }else{
                        alert('登录失败')
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
