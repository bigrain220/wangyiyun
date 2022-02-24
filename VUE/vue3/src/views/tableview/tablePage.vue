<template>
  <div class="tablePage">
    <!-- searchForm -->
    <el-form :inline="true" ref="searchForm" :model="searchForm" class="search-form" label-width="60px" size="medium">
      <el-form-item>
        <el-input placeholder="请输入查找内容" v-model="searchForm.value" class="input-with-select" @keydown="search(true)" clearable>
           <template #prepend>
          <el-select v-model="searchForm.name">
            <el-option label="名称" value="name"></el-option>
            <el-option label="ID" value="id"></el-option>
          </el-select>
          </template>
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
  </div>
</template>

<script>
import { reactive, toRefs } from "vue"

export default {
  setup() {
    const state = reactive({
      searchForm: {
        name: "name",
        value: "",
        status: ""
      },
    })
    const search = () => {

    };
    const resetSearch = () => {

    }
    return {
      ...toRefs(state),
      search,
      resetSearch
    }
  }
}
</script>

<style>
</style>