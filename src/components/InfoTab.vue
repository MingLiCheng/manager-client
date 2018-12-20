<template>
  <section>
    <el-table :data="infoData" border style="width: 100%">
      <el-table-column prop="type" label="type"></el-table-column>
      <el-table-column prop="describe" label="describe"></el-table-column>
      <el-table-column prop="income" label="income"></el-table-column>
      <el-table-column prop="expend" label="expend"></el-table-column>
      <el-table-column prop="cash" label="cash"></el-table-column>
      <el-table-column prop="remark" label="remark"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" circle icon="el-icon-view"></el-button>
          <el-button type="primary" circle icon="el-icon-edit" @click="dialogFormVisible = true"></el-button>
          <el-button type="danger" circle icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
export default {
  name: 'infotab',
  data() {
    return {
      infoData: [],
      dialogFormVisible: false
    }
  },
  created() {
    this.$http.get('/api/profiles/').then(
      result => {
        console.log(result.data)

        this.infoData = result.data.result
      }
    )
  },
  methods: {
    test() {
      this.$messagebox('ceshi')
    }
  },
}
</script>

<style lang="scss">
.el-table td {
  padding: 5px 0px !important;
}
</style>
