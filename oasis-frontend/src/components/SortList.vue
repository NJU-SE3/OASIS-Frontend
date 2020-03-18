<template>
	<div class="sort-list">
		<el-table :data="table_data" style="width: 100%;" :default-sort = "{prop: 'paper_count', order: 'descending'}">
			<el-table-column prop="Name" label="Name"></el-table-column>
			<el-table-column v-for="(item, index) in list_title" 
											 :key="index"
											 :prop="item"
											 :label="item"
											 sortable>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: "SortList",

	props: ["list_title", "table_data_prop"],

	data() {
		return {
			table_data: this.table_data_prop
		}
	},

	methods: {

	}
	
}
</script>

<style>
/* .table-content .content-title {
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}

.table-content .content-title .content-title-item {
  display: inline-block;
} */

.sort-list > .el-table {
	color: white;
}

.sort-list > .el-table, .el-table__expanded-cell {
	background: transparent;
}

.sort-list > .el-table th, .el-table tr {
	background: transparent;
}

.sort-list > .el-table tbody tr:hover>td {
	background: rgba(255, 255, 255, 0.3);
}
.sort-list > .el-table thead {
	color: #ffffff;
}
</style>