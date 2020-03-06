<template>
    <div class="admin-main">
        <el-button round class="empty" @click="clear">Clear</el-button>
        <el-button round class="restore" @click="restore">Restore</el-button>
    </div>
</template>

<script>
export default {
    name: "admin",

    methods: {
        clear() {
            alert("clear");
        },

        restore() {
            alert("restore");
        }
    }
}
</script>

<style>
.clear, .restore {
    margin-top: 20%;
}

/* .clear {
    margin-right: 100px;
} */

/* .restore {
    margin-left: 100px;
} */

.admin-main .el-button+.el-button {
    margin-left: 100px;
}

.admin-main .el-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-block-color: white;
}

.admin-main .el-button:hover{
    background: rgba(255, 255, 255, 0.5);
  }

</style>