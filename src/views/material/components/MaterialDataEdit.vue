<script setup>
import { ref } from 'vue'
import { materialAddDataService, materialEditDataService } from '@/api/material'
import { useUserStore } from '@/stores'
const userStore = useUserStore() // 用于获取当前登录用户
const visibleDrawer = ref(false)
const defaultForm = ref({
  material_id: '',
  Q_number: '',
  wu_1: '',
  wu_2: '',
  shang_1: '',
  shang_2: '',
  xia_1: '',
  xia_2: '',
  material_date: '',
  username: userStore.user.username,
  height1: '',
  height2: '',
  height3: '',
  height4: '',
  height5: '',
  height6: '',
  height7: '',
  height8: '',
  small1: '',
  small2: '',
  small3: '',
  small4: '',
  big1: '',
  big2: '',
  big3: '',
  big4: '',
  input_date: '',
  input_name: userStore.user.username
})
const formModel = ref({ ...defaultForm.value })
const formRef = ref()
const rules = {
  material_id: [
    { required: true, message: '请输入杠铃编号', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,20}$/, message: '长度在 1 到 20 位字母或数字', trigger: 'blur' }
  ],
  Q_number: [
    { required: true, message: '请输入Q_number', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value <= 4500) {
          callback(new Error('Q_number必须大于4500'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  wu_1: [
    { required: true, message: '请输入无微扰频率 - fπ', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  wu_2: [
    { required: true, message: '请输入无微扰频率 - fπ/2', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  shang_1: [
    { required: true, message: '请输入上微扰频率 - fp,u,π', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  shang_2: [
    { required: true, message: '请输入上微扰频率 - fp,u,π/2', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  xia_1: [
    { required: true, message: '请输入下微扰频率 - fp,d,π', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  xia_2: [
    { required: true, message: '请输入下微扰频率 - fp,d,π/2', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  material_date: [{ required: true, message: '请选择日期时间', trigger: 'blur' }],
  username: [{ required: true, message: '请输入登记用户', trigger: 'blur' }],
  height1: [
    { required: true, message: '请输入高度1', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  height2: [
    { required: true, message: '请输入高度2', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  height3: [
    { required: true, message: '请输入高度3', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  height4: [
    { required: true, message: '请输入高度4', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  height5: [
    { required: true, message: '请输入高度5', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  height6: [
    { required: true, message: '请输入高度6', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  height7: [
    { required: true, message: '请输入高度7', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  height8: [
    { required: true, message: '请输入高度8', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  small1: [
    { required: true, message: '请输入赤道内径小编号1', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  small2: [
    { required: true, message: '请输入赤道内径小编号2', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  small3: [
    { required: true, message: '请输入赤道内径小编号3', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  small4: [
    { required: true, message: '请输入赤道内径小编号4', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  big1: [
    { required: true, message: '请输入赤道内径大编号1', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  big2: [
    { required: true, message: '请输入赤道内径大编号2', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  big3: [
    { required: true, message: '请输入赤道内径大编号3', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  big4: [
    { required: true, message: '请输入赤道内径大编号4', trigger: 'blur' },
    {
      pattern: /^\d{1,11}(\.\d{1,2})?$/,
      message: '请输入 1 到 11 位的有效数字，最多包含两位小数',
      trigger: 'blur'
    }
  ],
  input_date: [{ required: true, message: '请选择日期时间', trigger: 'blur' }],
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  if (formModel.value.id) {
    await materialEditDataService(formModel.value)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await materialAddDataService(formModel.value)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}
const open = (row) => {
  visibleDrawer.value = true
  if (row.id) {
    formModel.value = row
  } else {
    formModel.value = { ...defaultForm.value }
  }
}
defineExpose({ open })
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.material_id ? '编辑记录' : '添加记录'"
    size="50%"
  >
    <el-form :model="formModel" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="杠铃编号" prop="material_id">
        <el-input v-model="formModel.material_id" placeholder="请输杠铃编号"></el-input>
      </el-form-item>
      <el-form-item label="Q(>4500)" prop="Q_number">
        <el-input v-model="formModel.Q_number" placeholder="请输入Q值"></el-input>
      </el-form-item>
      <!-- 无微扰频率 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-form-item label="无微扰频率:"> </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="fπ" prop="wu_1">
            <el-input v-model="formModel.wu_1" placeholder="请输入无微扰频率 - fπ"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="fπ/2" prop="wu_2">
            <el-input v-model="formModel.wu_2" placeholder="请输入无微扰频率 - fπ/2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 上微扰频率 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-form-item label="上微扰频率:"> </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="fp,u,π" prop="shang_1">
            <el-input
              v-model="formModel.shang_1"
              placeholder="请输入上微扰频率 - fp,u,π"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="fp,u,π/2" prop="shang_2">
            <el-input
              v-model="formModel.shang_2"
              placeholder="请输入上微扰频率 - fp,u,π/2"
            ></el-input>
          </el-form-item> </el-col
      ></el-row>
      <!-- 下微扰频率 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-form-item label="下微扰频率:"> </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="fp,d,π" prop="xia_1">
            <el-input v-model="formModel.xia_1" placeholder="请输入下微扰频率 - fp,d,π"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="fp,d,π/2" prop="xia_2">
            <el-input
              v-model="formModel.xia_2"
              placeholder="请输入下微扰频率 - fp,d,π/2"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 日期和时间 -->
      <el-form-item label="日期时间:" required>
        <el-col :span="11">
          <el-form-item prop="material_date">
            <el-date-picker
              v-model="formModel.material_date"
              type="date"
              label="时间"
              placeholder="请选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" style="display: flex; justify-content: center; align-items: center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="material_date">
            <el-time-picker
              v-model="formModel.material_date"
              label="日期"
              placeholder="请选择时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 高度1~8 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-form-item label="高度:"></el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="高度1" prop="height1">
            <el-input v-model="formModel.height1" placeholder="请输入高度1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="高度2" prop="height2">
            <el-input v-model="formModel.height2" placeholder="请输入高度2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="高度3" prop="height3">
            <el-input v-model="formModel.height3" placeholder="请输入高度3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="高度4" prop="height4">
            <el-input v-model="formModel.height4" placeholder="请输入高度4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="高度5" prop="height5">
            <el-input v-model="formModel.height5" placeholder="请输入高度5"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="高度6" prop="height6">
            <el-input v-model="formModel.height6" placeholder="请输入高度6"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="高度7" prop="height7">
            <el-input v-model="formModel.height7" placeholder="请输入高度7"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="高度8" prop="height8">
            <el-input v-model="formModel.height8" placeholder="请输入高度8"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 赤道内径小编号1~4 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-form-item label="赤道内径小编号:"></el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号1" prop="small1">
            <el-input v-model="formModel.small1" placeholder="请输入编号1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号2" prop="small2">
            <el-input v-model="formModel.small2" placeholder="请输入编号2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="编号3" prop="small3">
            <el-input v-model="formModel.small3" placeholder="请输入编号3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号4" prop="small4">
            <el-input v-model="formModel.small4" placeholder="请输入编号4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 赤道内径大编号1~4 -->
      <el-row :gutter="20">
        <el-col :span="2">
          <el-form-item label="赤道内径大编号:"></el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号1" prop="big1">
            <el-input v-model="formModel.big1" placeholder="请输入编号1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号2" prop="big2">
            <el-input v-model="formModel.big2" placeholder="请输入编号2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="编号3" prop="big3">
            <el-input v-model="formModel.big3" placeholder="请输入编号3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="编号4" prop="big4">
            <el-input v-model="formModel.big4" placeholder="请输入编号4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 日期和时间 -->
      <el-form-item label="日期时间:" required>
        <el-col :span="11">
          <el-form-item prop="input_date">
            <el-date-picker
              v-model="formModel.input_date"
              type="date"
              label="时间"
              placeholder="请选择日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" style="display: flex; justify-content: center; align-items: center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="input_date">
            <el-time-picker
              v-model="formModel.input_date"
              label="日期"
              placeholder="请选择时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
