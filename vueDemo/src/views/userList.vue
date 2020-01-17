<template>
  <div>
    <el-form>
      <h2>列表信息</h2>
      <el-form-item>
        <el-table :data="tableData" border style="width: 300px">
          <el-table-column
            prop="name"
            label="用户名">
          </el-table-column>

          <el-table-column
            prop="password"
            label="密码">
          </el-table-column>


        </el-table>

      </el-form-item>

      <el-form-item>
        <el-button  @click="back()">返回</el-button>

      </el-form-item>
    </el-form>


  </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "userList",
        data() {
            return {
                tableData: [],
            }
        },
        methods:{
            getDataList(){
                axios.post("/users/userList").then((response)=>{
                    this.tableData=response.data.result
                    console.log(response.data.result);
                })
            },
            back(){
                this.$emit('goBack');
            },
        },
        mounted() {
            this.getDataList()
        }
    }
</script>

<style scoped>

</style>
