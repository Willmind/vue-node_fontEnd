<template>
  <div>

    <el-form  :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="80px" >
      <h2>用户注册</h2>

      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="registerForm.username" ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>



      <el-form-item>
        <el-button  @click="back()">返回</el-button>
        <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    import axios from 'axios'
    import Cookies from 'js-cookie'
    export default {
        name: "Register",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkPass !== '') {
                        this.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerData:false,
                registerForm: {
                    password: '',
                    checkPass: '',
                    username: ''
                },

                rules: {
                    password: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true,validator: validatePass2, trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            back(){
                this.$emit('goBack');
            },
            submitForm() {
                this.$refs['registerForm'].validate((valid) => {
                    if (valid) {
                        axios.post("/users/register",{
                            registerForm:this.registerForm

                        }).then(
                            (response)=>{
                                let res=response.data
                                console.log(res);
                                console.log(res);
                            }
                        )
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs['registerForm'].resetFields();
            }
        },
        mounted() {
            this.resetForm()
        }
    }
</script>
