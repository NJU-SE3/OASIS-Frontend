<template>
	<el-row class="header">
		<el-col :span="3">
			<span class="logo" @click="backToHome">OASIS</span>
		</el-col>
		<el-col :span="7" class="search">
			<i class="el-icon-search" @click="show = !show"></i>
			<transition name="slide-fade">
				<input class="input" type="text" v-if="show" v-model="keywords" v-on:keyup.enter="onSubmit"/>
			</transition>
		</el-col>
	</el-row>
</template>

<script>
  import bus from "../utils/bus"

export default {
	name: "my-header",

	data() {
		return {
			show: false,
			keywords: ""
		}
	},

  beforeDestroy() {
    var _this = this;
    bus.$emit("fuzzySearch", {
      type: "All",
      con: _this.keywords
    })
  },

	methods: {
		onSubmit() {
			console.log("submit");
      this.$router.push("result");
		},

		backToHome() {
			this.$router.push("mainpage");
		}
	}
}
</script>

<style scoped>
.header {
	/* width: 100%; */
	background: rgba(255, 255, 255, 0.2);
	height: 53px;
}

.header .logo {
	cursor: pointer;
}

.header > * {
	margin: 20px 0;
	color: #ffffff;
}

.header .input {
	background: rgba(0, 0, 0, 0);
	border-color: #ffffff;
  border-bottom: 1px solid #ffffff;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
	color: #ffffff;
	caret-color: #ffffff;
}

.header .input:focus {
	outline: none;
}

.header .search {
	display: flex;
	justify-content: flex-start;
}

.header .search .el-icon-search {
	margin-right: 8px;
	cursor: pointer;
}

.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
