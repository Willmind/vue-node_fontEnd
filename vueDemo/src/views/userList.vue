<template>
  <div>
    <el-form>
      <h2>列表信息</h2>
      <el-form-item>
        <el-table :data="tableData" border style="width: 500px">
          <el-table-column
            prop="id"
            label="id">
          </el-table-column>
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
        <el-button @click="refresh()" :loading="loading">{{ loading ? '刷新中 ...' : '刷 新' }}</el-button>


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
                loading:false,
                tableData: [],
            }
        },
        methods: {
            refresh(){
                this.loading = true;
                this.getDataList()
                setTimeout(() => {
                    this.loading = false;
                }, 200);
                console.log(1);

            },
            getDataList() {
                axios.post("/users/userList").then((response) => {
                    this.tableData = response.data.result
                    console.log(this.tableData);
                })
            },
            back() {
                this.$emit('goBack');
            },
            handleDelete(index, row) {
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
                console.log(row.id);
                axios.post("/users/deleteUser",{
                    id:row.id
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
