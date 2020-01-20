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

          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>


        </el-table>

      </el-form-item>

      <el-form-item>
        <el-button @click="back()">返回</el-button>

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
        methods: {
            getDataList() {
                axios.post("/users/userList").then((response) => {
                    this.tableData = response.data.result
                })
            },
            back() {
                this.$emit('goBack');
            },
            handleDelete(index, row) {
                console.log(row);
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(row)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            del(row){
                console.log(row.name);
                axios.post("/users/deleteUser",{
                    name:row.name
                }).then((response)=>{
                    console.log(response);
                    this.getDataList()
                })

            }

        },
        mounted() {
            this.getDataList()
        }
    }
</script>

<style scoped>

</style>
