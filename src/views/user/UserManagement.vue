<script setup>
import { ref } from 'vue'
import { usergetAllUserName, userUpdateStatus } from '@/api/user'
const usernameList = ref([])
const currentPage = ref(1)
const pageSize = ref(8)
const loading = ref(false)
const getUserList = async () => {
  loading.value = true
  const res = await usergetAllUserName()
  usernameList.value = res.data.data || []
  usernameList.value = usernameList.value.filter((item) => item.identity !== 'administrator')
  usernameList.value.forEach((item) => {
    if (item.status === 1) {
      item.status = true
    } else {
      item.status = false
    }
  })
  loading.value = false
}
const handleStatusChange = async (row) => {
  await userUpdateStatus(row.id, row.status)
  ElMessage.success('修改用户状态成功')
  getUserList()
}
getUserList()
const handlePaginationChanged = (page, size) => {
  currentPage.value = page
  pageSize.value = size
}
const onSuccess = () => {
  getUserList()
}
</script>
<template>
  <page-container title="用户管理">
    <el-table
      :data="usernameList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%; height: 100%"
      v-loading="loading"
    >
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <el-switch v-model="row.status" @change="handleStatusChange(row)"></el-switch>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <pagination-component
      :total="usernameList.length"
      @pagination-changed="handlePaginationChanged"
    ></pagination-component>
    <material-edit ref="dialog" @success="onSuccess"></material-edit>
  </page-container>
</template>
