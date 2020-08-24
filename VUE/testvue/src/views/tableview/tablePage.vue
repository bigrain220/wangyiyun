<template>
  <div class="tablePage">
    <!-- searchForm -->
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form" label-width="60px" size="medium">
      <el-form-item>
        <el-input placeholder="请输入查找内容" v-model="searchForm.value" class="input-with-select" @keydown.enter.native="search(true)" clearable>
          <el-select v-model="searchForm.name" slot="prepend">
            <el-option label="名称" value="name"></el-option>
            <el-option label="ID" value="id"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择状态">
          <el-option label="正常" :value="'1'"></el-option>
          <el-option label="禁用" :value="'2'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search(true)">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- button -->
    <div class="outside-btn">
      <el-button type="primary" size="small" class="add-btn" icon="el-icon-plus" @click="addClick">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" stripe v-loading="loading.table">
      <el-table-column label="支付ID" prop="id" width="120" align="center"></el-table-column>
      <el-table-column width="100"></el-table-column>
      <el-table-column label="支付名称" prop="name" align="left"></el-table-column>
      <el-table-column label="支付时间" prop="paidtime" align="left"></el-table-column>
      <el-table-column label="状态" align="left">
        <template slot-scope="scope">
          <div v-text="((dialogConfig.data.find(x=>x.prop=='status')).options.find(y=>y.value==scope.row.status)).label"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editClick(scope.row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 10,20, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <!-- dialog -->
    <edit-add-dialog v-if="dialogVisible" :isShow.sync="dialogVisible" :data="dialogData" :config="dialogConfig" @formSubmit="formSubmit">
      <!-- slot为true时显示 最新版slot结构赋值写法-->
      <template #name="{row}">
        slot:<el-input v-model="row.name"></el-input>
      </template>
    </edit-add-dialog>
  </div>
</template>

<script>


export default {
  name: 'tablePage',
  components: {
    editAddDialog: () => import("@/components/editAddDialog")
  },
  data() {
    return {
      title: "支付方式",
      total: 10,
      size: 10,
      currentPage: 1,
      searchForm: {
        name: "name",
        value: "",
        status: ""
      },
      tableData: [],
      loading: {
        table: true
      },
      dialogVisible: false,
      dialogConfig: {
        title: { name: "", value: '' },
        className: "",
        data: [
          {
            label: "支付ID",
            prop: "id",
            placeholder: "请输入支付ID",
            type: "input",
            disabled: true,
          },
          {
            label: "支付名称",
            prop: "name",
            placeholder: "请输入名称",
            type: "input",
            disabled: false,
            rules: [{ required: true, message: "请输入支付名称", trigger: "blur" }],
            slot: false
          },
          {
            label: "支付时间",
            prop: "paidtime",
            placeholder: "请选择支付时间",
            type: "date"
          },
          {
            label: "状态",
            prop: "status",
            placeholder: "请选择状态",
            type: "select",
            disabled: false,
            options: [
              { value: '1', label: '正常' },
              { value: '2', label: '禁用' }
            ]
          }
        ]
      },
      dialogData: {},
      response: {
        total: 3,
        rows: [
          {
            id: 1,
            name: "微信",
            paidtime: "2020-06-01",
            status: '1'
          },
          {
            id: 2,
            name: "支付宝",
            paidtime: "2020-07-01",
            status: '1'
          },
          {
            id: 4,
            name: "测试1",
            paidtime: "2020-07-10",
            status: '2'
          }
        ]
      },
    };
  },
  methods: {
    search(isbtn) {
      if (isbtn === true) {
        this.currentPage = 1;
      }
      var params = {};
      this.searchForm.value
        ? (params[this.searchForm.name] = this.searchForm.value)
        : "";
      this.searchForm.status ? params.status = this.searchForm.status : "";
      params.page = this.currentPage;
      params.rows = this.size;
      console.log('search', params);
      // this.getMentList(params);
    },
    resetSearch() {
      //特殊处理
      this.searchForm = {
        name: "name"
      };
      //重置方法
      this.$refs.searchForm.resetFields();
      this.currentPage = 1;
      this.size = 10;
      this.search();
    },
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    editClick(row) {
      this.dialogData = { id: "", name: "", paidtime: "", status: "" }
      Object.keys(this.dialogData).forEach(key => {
        this.dialogData[key] = row[key];
      });
      this.dialogConfig.title = { name: "编辑", value: "edit" };
      this.dialogVisible = true;
    },
    deleteClick(id) {
      this.$confirm("删除后无法恢复, 是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(id);
        })
        .catch(() => { });
    },
    addClick() {
      this.dialogData = { name: "", paidtime: "", status: "" };
      this.dialogConfig.title = { name: "新增", value: "add" };
      this.dialogVisible = true;
    },
    formSubmit(params) {
      console.log('formSubmit', params)
      const formName = this.dialogConfig.title.value;
      if (formName === "edit") {
        // MentEdit(params).then(res => {
        //   this.dealResponse("edit", res);
        // });
      } else if (formName === "add") {
        // MentAdd(params).then(res => {
        //   this.dealResponse("add", res);
        // });
      }
    },
    dealResponse(type, res) {
      var params = {
        title: ""
      };
      type === "edit" ? params.title = '编辑' : type === "add" ? params.title = '添加' : "";
      if (res.code === 1) {
        this.$message.success(params.title + "成功！");
        this.dialogVisible = false;
        this.search();
      } else if (res.msg === "FAILURE") {
        this.$message.error(params.title + "失败！");
      } else {
        this.$message.error(params.title + "失败: " + res.msg);
      }
    },
  },
  mounted() {
    this.total = this.response.total;
    this.tableData = this.response.rows;
    var timer = setTimeout(() => {
      this.loading.table = false;
      clearTimeout(timer);
    }, 2000)
  },
  watch: {
    total() {
      if (this.total == (this.currentPage - 1) * this.size && this.total != 0) {
        this.currentPage -= 1;
        this.search();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tablePage {
  .outside-btn {
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
  }
  .input-with-select .el-input-group__prepend .el-select {
    width: 100px;
  }
}
</style>
