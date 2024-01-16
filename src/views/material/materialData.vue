<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import materialSelect from './components/MaterialSelect.vue'
import { utils, writeFile } from 'xlsx'
import { materialgetAllDataService, materialDeleteDataService } from '@/api/material'
import { useUserStore } from '@/stores'
import MaterialDataEdit from './components/MaterialDataEdit.vue'
const userStore = useUserStore()
const materialList = ref([])
const loading = ref(false)
const selectData = ref([])
const table = ref()
const isSelectAll = ref(false)
const params = ref({
  pagenum: 1,
  pagesize: 8,
  material_id: '',
  input_sequence: [],
  username: []
})
const materialEditRef = ref()

const onAddMaterial = () => {
  if (userStore.user.identity === 'administrator') {
    materialEditRef.value.open({})
  } else {
    ElMessage.warning('您不是管理员，无法添加哑铃')
  }
}
const onEditMaterialData = (row) => {
  if (userStore.user.identity === 'administrator') {
    materialEditRef.value.open(row)
  } else {
    ElMessage.warning('您不是管理员，无法编辑哑铃')
  }
}

const onDeleteMaterialData = (row) => {
  if (userStore.user.identity === 'administrator') {
    ElMessageBox.confirm('你确认要删除该条记录么?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const res = await materialDeleteDataService(row.id)
      if (res.data.status === 0) {
        ElMessage.success('删除成功')
        getMaterialList()
      } else {
        ElMessage.error('删除失败')
      }
    })
  } else {
    ElMessage.warning('您不是管理员，无法删除哑铃')
  }
}
const handleSelectionChange = (val) => {
  selectData.value = val
}
const exportExecl = () => {
  // 获取被选中的行
  if (selectData.value.length === 0) {
    ElMessage('未选中任意行')
  } else {
    const data = selectData.value.map((item) => ({
      哑铃编号: item.material_id,
      输入序号: item.input_sequence,
      'Q(>4500)': item.Q_number,
      '无微扰频率(MHz) - fπ': item.wu_1,
      '无微扰频率(MHz) - fπ/2': item.wu_2,
      '上微扰频率(MHz) - fp,u,π': item.shang_1,
      '上微扰频率(MHz) - fp,u,π/2': item.shang_2,
      '下微扰频率(MHz) - fp,d,π': item.xia_1,
      '下微扰频率(MHz) - fp,d,π/2': item.xia_2,
      '登记人 - 1': item.username,
      '日期 - 1': item.material_date,
      高度1: item.height1,
      高度2: item.height2,
      高度3: item.height3,
      高度4: item.height4,
      高度5: item.height5,
      高度6: item.height6,
      高度7: item.height7,
      高度8: item.height8,
      赤道内径小编号1: item.small1,
      赤道内径小编号2: item.small2,
      赤道内径小编号3: item.small3,
      赤道内径小编号4: item.small4,
      赤道内径大编号1: item.big1,
      赤道内径大编号2: item.big2,
      赤道内径大编号3: item.big3,
      赤道内径大编号4: item.big4,
      '登记人 - 2': item.input_name,
      '日期 - 2': item.input_date
    }))
    const ws = utils.json_to_sheet(data)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    // 获取当前日期
    const date = new Date()
    // 格式化日期
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    writeFile(wb, `哑铃数据${year}.${month}.${day}.xlsx`)
  }
}
const handlePaginationChanged = (page, size) => {
  params.value.pagenum = page
  params.value.pagesize = size
}
const getMaterialList = async () => {
  loading.value = true
  const res = await materialgetAllDataService(params.value)
  materialList.value = res.data.data
  loading.value = false
}
const onSearch = () => {
  params.value.pagenum = 1
  getMaterialList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.materialId = []
  params.value.username = []
  getMaterialList()
}
const handleSelectAll = () => {
  if (!isSelectAll.value) {
    // 如果用户点击了全选按钮，将所有行添加到选中的行中
    materialList.value.forEach((row) => {
      table.value.toggleRowSelection(row, true)
    })
    isSelectAll.value = true
  } else {
    materialList.value.forEach((row) => {
      table.value.toggleRowSelection(row, false)
    })
    isSelectAll.value = false
  }
}
const onSuccess = (type) => {
  getMaterialList()
  if (type === 'add') {
    // 跳转至最后一页
    params.value.pagenum = Math.ceil(materialList.value.length / params.value.pagesize)
  }
}
getMaterialList()
</script>
<template>
  <page-container title="哑铃数据">
    <template #extra>
      <el-button type="primary" @click="onAddMaterial">添加记录</el-button>
      <el-button type="success" @click="exportExecl">导出表格</el-button>
    </template>
    <el-form inline>
      <el-form-item label="哑铃编号">
        <el-input v-model="params.material_id" placeholder="请输入哑铃编号"></el-input>
      </el-form-item>
      <material-select v-model="params.input_sequence" label="输入序号"></material-select>
      <material-select v-model="params.username" label="登记用户"></material-select>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜素</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="table"
      @selection-change="handleSelectionChange"
      @select-all="handleSelectAll"
      :data="
        materialList.slice((params.pagenum - 1) * params.pagesize, params.pagenum * params.pagesize)
      "
      style="width: 100%; height: 100%"
      v-loading="loading"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column prop="material_id" label="哑铃编号" width="120" fixed sortable />
      <el-table-column prop="input_sequence" label="第几次输入" width="80" fixed sortable />
      <el-table-column prop="Q_number" label="Q(>4500)" width="120" sortable>
        <template v-slot="{ row }">
          {{ parseFloat(row.Q_number).toFixed(1) }}
        </template>
      </el-table-column>
      <el-table-column label="无微扰频率(MHz)" header-align="center">
        <el-table-column prop="wu_1" label="fπ" width="100" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.wu_1).toFixed(4) }}
          </template>
        </el-table-column>
        <el-table-column prop="wu_2" label="fπ/2" width="100" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.wu_2).toFixed(4) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="上微扰频率(MHz)" header-align="center">
        <el-table-column prop="shang_1" label="fp,u,π" width="100" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.shang_1).toFixed(4) }}
          </template>
        </el-table-column>
        <el-table-column prop="shang_2" label="fp,u,π/2" width="100" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.shang_2).toFixed(4) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="下微扰频率(MHz)" header-align="center">
        <el-table-column prop="xia_1" label="fp,d,π" width="100" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.xia_1).toFixed(4) }}
          </template>
        </el-table-column>
        <el-table-column prop="xia_2" label="fp,d,π/2" width="100" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.xia_2).toFixed(4) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="username" label="登记人" width="80"></el-table-column>
      <el-table-column prop="material_date" label="日期" width="180" sortable />
      <el-table-column label="高度" header-align="center">
        <el-table-column prop="height1" label="高度1" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height1).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="height2" label="高度2" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height2).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="height3" label="高度3" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height3).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="height4" label="高度4" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height4).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="height5" label="高度5" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height5).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="height6" label="高度6" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height6).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="height7" label="高度7" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height7).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="height8" label="高度8" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.height8).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="赤道内径小编号" header-align="center">
        <el-table-column prop="small1" label="编号1" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.small1).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="small2" label="编号2" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.small2).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="small3" label="编号3" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.small3).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="small4" label="编号4" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.small4).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="赤道内径大编号" header-align="center">
        <el-table-column prop="big1" label="编号1" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.big1).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="big2" label="编号2" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.big2).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="big3" label="编号3" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.big3).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="big4" label="编号4" width="80" sortable>
          <template v-slot="{ row }">
            {{ parseFloat(row.big4).toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="input_name" label="登记人" width="80"></el-table-column>
      <el-table-column prop="input_date" label="日期" width="180" sortable />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            @click="onEditMaterialData(row)"
            plain
            round
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            @click="onDeleteMaterialData(row)"
            plain
            round
          ></el-button>
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
    <material-data-edit ref="materialEditRef" @success="onSuccess"></material-data-edit>
  </page-container>
</template>
