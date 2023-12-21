<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    :background="true"
    layout="jumper,total, sizes, prev, pager, next"
    :page-sizes="[8, 15, 20, 30]"
    :total="total"
    style="margin-top: 20px; justify-content: flex-end;"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 8
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.$emit('update:size', val)
      this.$emit('pagination-changed', this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('update:page', val)
      this.$emit('pagination-changed', val, this.pageSize)
    }
  }
}
</script>
