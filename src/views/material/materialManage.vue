<script setup>
import { ref } from 'vue'
import { materialgetAllNumberData, materialDeleteService } from '@/api/material'
import { Edit, Delete } from '@element-plus/icons-vue'
import MaterialEdit from './components/MaterialEdit.vue'
import { useUserStore } from '@/stores'
import { utils, writeFile } from 'xlsx'
const userStore = useUserStore()
const materialList = ref([])
const currentPage = ref(1)
const pageSize = ref(8)
const loading = ref(false)
const dialog = ref()
const getMaterialList = async () => {
  loading.value = true
  const res = await materialgetAllNumberData()
  materialList.value = res.data.data || []
  loading.value = false
}
getMaterialList()
const exportExecl = () => {
  const data = materialList.value.map((item) => ({
    杠铃编号: item.material_id,
    记录数量: item.count
  }))
  const ws = utils.json_to_sheet(data)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Sheet1')
  writeFile(wb, 'materialManage.xlsx')
}
const onEditMaterial = (row) => {
  if (userStore.user.identity === 'administrator') {
    dialog.value.open(row)
  } else {
    ElMessage.warning('您不是管理员，无法编辑杠铃')
  }
}
const onDeleteMaterial = async (row) => {
  if (userStore.user.identity === 'administrator') {
    await ElMessageBox.confirm('你确认要删除该杠铃么', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    await materialDeleteService(row.material_id)
    ElMessage.success('删除成功')
    getMaterialList()
  } else {
    ElMessage.warning('您不是管理员，无法删除杠铃')
  }
}
const onSuccess = () => {
  getMaterialList()
}
const handlePaginationChanged = (page, size) => {
  currentPage.value = page
  pageSize.value = size
}
</script>
<template>
  <page-container title="杠铃管理">
    <template #extra>
      <el-button type="primary" @click="exportExecl">导出表格</el-button>
    </template>
    <el-table
      :data="materialList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%; height: 100%"
      v-loading="loading"
    >
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column prop="material_id" label="杠铃编号"></el-table-column>
      <el-table-column prop="count" label="记录数量"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row, $index }">
          <el-button type="primary" :icon="Edit" @click="onEditMaterial(row, $index)" plain round
            >编辑</el-button
          >
          <el-button type="danger" :icon="Delete" @click="onDeleteMaterial(row, $index)" plain round
            >删除</el-button
          >
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <pagination-component
      :total="materialList.length"
      @pagination-changed="handlePaginationChanged"
    ></pagination-component>
    <material-edit ref="dialog" @success="onSuccess"></material-edit>
  </page-container>
</template>
