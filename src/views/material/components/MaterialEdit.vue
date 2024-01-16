<script setup>
import { ref } from 'vue'
import { materialEditIdService } from '@/api/material'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  new_material_id: ''
})
const rules = {
  new_material_id: [
    { required: true, message: '请输入哑铃编号', trigger: 'blur' },
    { pattern: /^[^\s]{1,20}$/, message: '长度在 1 到 20 位非空字符', trigger: 'blur' }
  ]
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.material_id
  if (isEdit) {
    await materialEditIdService(formModel.value)
    ElMessage.success('编辑成功')
  }
  dialogVisible.value = false
  emit('success')
}
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
defineExpose({ open })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.material_id ? '编辑哑铃' : '添加哑铃'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="哑铃编号" prop="new_material_id">
        <el-input v-model="formModel.new_material_id" placeholder="请输入哑铃编号"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
