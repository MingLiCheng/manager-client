<template>
  <section>
    <el-form :inline="true" ref="search_data">
      <!-- <el-form-item label="投标时间筛选:">
        <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
      </el-form-item>
      <el-form-item class="btnRight">
        <el-button type="primary" size="small" icon="view" @click="onAddMoney()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-if="infoData.length > 0"
      :data="infoData"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="date" label="创建时间" align="center" width="250" sortable>
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
      <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
      <el-table-column prop="income" label="收入" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#00d053">+ {{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" label="支出" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#f56767">- {{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="warning" icon="edit" size="small" @click="onEditMoney(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            icon="delete"
            size="small"
            @click="onDeleteMoney(scope.row,scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-section :dialog="dialog" :form="form"></dialog-section>
  </section>
</template>
<script>
import DialogSection from './ProfilesInfo/DialogSection'
export default {
  name: 'infotab',
  components: { DialogSection },
  data() {
    return {
      infoData: [],
      dialog: {
        show: false,
        title: '添加'
      },
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
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
    },
    onScreeoutMoney() {

    },
    onAddMoney() {
      this.dialog.show = true
    }
  },
}
</script>

<style lang="scss">
.el-table td {
  padding: 5px 0px !important;
}
</style>
