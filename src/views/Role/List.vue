<template>
	<div class="list">
		<div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>管理员角色</span>
					<el-button type="primary" icon="el-icon-circle-plus-outline" @click="add" style="float: right;">添加角色</el-button>
				</div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="id" label="#" width="105px">
					</el-table-column>
					<el-table-column label="分类" prop="name">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.name }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200px">
						<template slot-scope="scope">

							<el-button type="primary" @click='edit(scope.row.id,scope.row,scope.$index)' :disabled="scope.row.id===1" icon="el-icon-edit"
							 plain></el-button>
							<el-button type="danger" :disabled="scope.row.id===1" icon="el-icon-delete" @click='remove(scope.row.id,scope.$index)'></el-button>
							<el-button type="primary" icon="el-icon-s-tools" @click='openConfig(scope.row.id,)'></el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</div>
		<div class="auth" v-if="roleConfig">
			<el-card class="box-card" v-for="(item,index) in roleConfig" :key='item.id'>
				<div slot="header" class="clearfix">
					<div class="congfig"><i class="el-icon-collection-tag"></i>
						<span v-text="item.name"></span></div>
					<el-switch v-model="item.checked" @change="allChecked(item,index)" style="float: right;color: #409EFF;">
					</el-switch>
				</div>
				<div v-for="child in item.children" class="text item">
					{{child.name}}
					<el-switch v-model='child.checked' @change="checked(item,child)" style="float: right;">
					</el-switch>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	import { Role } from '@/api/index'
	export default {
		data() {
			return {
				tableData: [],
				role_id: '',
				roleConfig: '',

			}
		},
		created() {
			// 获取列表数据
			this.loadlist();
		},
		methods: {
			// 加载列表数据
			async loadlist() {
				let { status, data } = await Role.list({});
				if (status) {
					this.tableData = data;
				}
			},
			// 删除
			remove(id, i) {
				console.log(id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status, data } = await Role.remove({ id });
						if (status) {
							// 更新DOM
							this.tableData.splice(i, 1)
							this.$message.success('删除成功');
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					})
			},
			// 添加
			add() {
				this.$prompt("请输入添加的角色名称", "添加角色", {
						inputPattern: /\S/,
						inputErrorMessage: '角色名称格式不正确'
					})
					.then(async ({ value }) => {

						let { status, data } = await Role.add({ name: value });

						if (status) {
							// 更新DOM
							this.tableData.push({ name: value, ...data }) //三个点是解析data
							this.$message.success('添加成功');
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					})
			},
			// 编辑
			edit(id, data, i) {
				console.log(data)
				this.$prompt("请输入修改的角色名称", "修改角色", {
						inputValue: data.name,
						inputPattern: /\S/,
						inputErrorMessage: '角色名称格式不正确'
					})
					.then(async ({ value }) => {

						let { status, data } = await Role.edit({ id, name: value });

						if (status) {
							// 更新DOM
							this.tableData[i].name = value //三个点是解析data
							this.$message.success('修改成功');
						}
					})
					.catch(() => {
						this.$message.info('取消修改');
					})
			},
			// 菜单栏
			async openConfig(id) {
				this.role_id = id;
				//打开权限配置
				let { status, data, msg } = await Role.config({ id });
				if (status) {
					this.roleConfig = data;
				}
			},
			checked(item, child) {
				console.log(item);
				let status = false;
				item.children.forEach((item) => {
					if (item.checked) {
						status = true;
					}
				})
				item.checked = status;
				this.handleMenu(item);
				this.handleMenu(child);
			},
			allChecked(item, index) {
				var that = item;
				item.children.forEach((item, idx) => {
					item.checked = that.checked;
					this.$set(that.children, idx, item);
					this.handleMenu(item);
				})
				//判断是添加菜单还是删除菜单
				this.handleMenu(item);
			},
			async handleMenu(item) {
				if (item.checked) {
					//获取
					let data = { role_id: this.role_id, menu_id: item.id }
					console.log(data);
					let res = await Role.menuAdd(data);
					console.log(res);
				} else {
					let data = { role_id: this.role_id, menu_id: item.id }
					console.log(data);
					let res = await Role.menuDel(data);
					console.log(res);
				}
			}


		}

	}
</script>

<style scoped>
	.box-card {
		width: 600px;
	}
	list .el-table {
			box-sizing: border-box;
		}
	
		.list {
			display: flex;
			justify-content: space-between;
		}
	
		.congfig {
			color: #409EFF;
			display: flex;
			align-items: center;
			font-size: 18px;
		}
</style>
