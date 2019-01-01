<template>
  <div class="fillcontain">
    <h1 style="padding: 10px 20px; color: #606266;">菜单列表</h1>
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="投标时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="onAddMoney()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        max-height="900"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="imgpath" label="缩略图" align="center" width="120">
          <template slot-scope="scope">
            <!-- <span style="color:#4db3ff">{{ scope.row.imgpath }}</span> -->
            <img class="food-img" :src="'http://localhost:5000'+scope.row.imgpath" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="c_date" label="创建时间" align="center" width="250" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.c_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="描述" align="center" width="180"></el-table-column>
        <el-table-column prop="name" label="名字" align="center" width="120">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center" width="120" sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.price }}</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
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
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "infotab",
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        name: "",
        price: "",
        imgpath: "",
        c_date: "",
        id: ""
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$http("/api/foods/").then(res => {
        // this.tableData = res.data;
        console.log(res.data);
        this.allTableData = res.data.result;
        this.filterTableData = res.data.result;
        // 设置分页数据
        this.setPaginations();
      });
    },
    onDeleteMoney(row, index) {
      // 删除
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
        this.dialog.show = false;
      });
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      console.log(this);
      console.log(this.paginations);
      console.log(this.allTableData);
      // 总页数
      this.paginations.total = this.allTableData.length;
      console.log(this.paginations.total);
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = Array.from(this.allTableData).filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    onScreeoutMoney() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPaginations();
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.food-img{
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
</style>
