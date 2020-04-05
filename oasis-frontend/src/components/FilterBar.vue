<template>
	<div class="filter-bar">
		<div class="filter-title" style="width: 100%;">Field</div>
		<div class="empty-tip" v-if="this.fields.length == 0">暂无数据</div>
		<div class="bar-content">
			<el-checkbox-group v-model="checked_items" class="checkbox-group" @change="filterField">
				<el-checkbox v-for="(item, index) in fields" 
										 :key="index" 
										 :label="item"
										 class="checkbox-item"
										 style="display: block;"></el-checkbox>
			</el-checkbox-group>
		</div>
	</div>
</template>

<script>
export default {
	name: "FilterBar",

	props: {
		author_fields: Array
	},

	data() {
		return {
			checked_items: [],
			fields: this.author_fields
		}
	},

	watch: {
		"author_fields": function(val) {
			this.fields = val;
		}
	},

	created() {
		console.log(this.fields.length);
	},

	methods: {
		filterField() {
			console.log(this.checked_items);
			this.$emit("filterField", { checked: this.checked_items });
		}
	}
}
</script>

<style>
.filter-bar .filter-title {
	font-size: 30px;
	margin: 100px 0 10px 0;
	text-align: start;
	/* background: blanchedalmond; */
}

.checkbox-group {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.checkbox-group > * {
	margin: 5px 0;
}

/* .checkbox-item {
	display: block;
} */

.filter-bar  .el-checkbox {
	color: #ffffff;
}

.filter-bar .el-checkbox__input.is-checked+.el-checkbox__label {
	color: inherit;
}
</style>