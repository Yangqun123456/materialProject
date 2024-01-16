<script setup>
import { materialGetAllInputSequence } from '@/api/material.js'
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
const materialInputSequence = ref([])
const usernameList = ref([])
const getAllInputSequence = async () => {
  const res = await materialGetAllInputSequence()
  materialInputSequence.value = res.data.data
}
const getMaterialUsernameList = async () => {
  const res = await usergetAllUserName()
  usernameList.value = res.data.data
}
const getData = () => {
  if (props.label === '输入序号') getAllInputSequence()
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
        v-for="item in props.label === '输入序号' ? materialInputSequence : usernameList"
        :key="props.label === '输入序号' ? item.input_sequence : item.username"
        :label="props.label === '输入序号' ? item.input_sequence : item.username"
        :value="props.label === '输入序号' ? item.input_sequence : item.username"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
