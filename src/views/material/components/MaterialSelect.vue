<script setup>
import { materialgetAllNumberData } from '@/api/material.js'
import { usergetAllUserName } from '@/api/user.js'
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, String, Array]
  },
  label: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const materialIdList = ref([])
const usernameList = ref([])
const getMaterialIdList = async () => {
  const res = await materialgetAllNumberData()
  materialIdList.value = res.data.data
}
const getMaterialUsernameList = async () => {
  const res = await usergetAllUserName()
  usernameList.value = res.data.data
}
const getData = () => {
  if (props.label === '杠铃编号') getMaterialIdList()
  else getMaterialUsernameList()
}
getData()
</script>
<template>
  <el-form-item :label="label">
    <el-select
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      clearable
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="2"
    >
      <el-option
        v-for="item in props.label === '杠铃编号' ? materialIdList : usernameList"
        :key="props.label === '杠铃编号' ? item.material_id : item.username"
        :label="props.label === '杠铃编号' ? item.material_id : item.username"
        :value="props.label === '杠铃编号' ? item.material_id : item.username"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
