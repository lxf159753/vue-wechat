<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="id" label="#" width="40">
				</el-table-column>
				<el-table-column prop="avatar" label="主图">
					<template slot-scope="scope">
						<el-image :src="scope.row.avatar"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="账号">
				</el-table-column>
				<el-table-column prop="fullname" label="姓名">
				</el-table-column>
				<el-table-column prop="sex" label="性别">
				</el-table-column>
				<el-table-column prop="tel" label="手机">
				</el-table-column>
				<el-table-column prop="role_name" label="角色">
				</el-table-column>
				<el-table-column prop="login_time" label="上次登录" width="150">
				</el-table-column>
				<el-table-column prop="login_count" label="登录次数">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click='edit(scope.$index)'></el-button>
						<el-button type="danger" icon="el-icon-delete" @click='handleRemove(scope.row.id,scope.row.$index)'></el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-dialog title="修改信息" :rules="rules" :visible.sync="editModalShow">
				<el-form :model="editForm">
					<el-form-item label="姓名" label-width="120px">
						<el-input v-model="editForm.fullname" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex" label-width="120px">
						<el-radio-group v-model="editForm.sex">
							<el-radio label="男">男</el-radio>
							<el-radio label="女">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="电话" label-width="120px">
						<el-input v-model="editForm.tel" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="权限" label-width="120px">
						<el-select v-model="editForm.role_name">
							<el-option v-for="item in Limitslist" :value="item.name"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="头像" label-width="120px">
						<Upload :url='editForm.avatar' @success="handleUploadSuccess($event)" @remove="editForm.avatar=''"></Upload>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="editModalShow = false">取 消</el-button>
					<el-button type="primary" @click='handleUpdateNode'>保 存</el-button>
				</div>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
	// 管理员的获取更新
	import { User } from '@/api/index'
	// 角色列表
	import { Role } from '@/api/index'
	// 图片组件
	import Upload from '@/components/Upload.vue'
	export default {
		components: {
			Upload
		},
		data() {
			return {
				tableData: [],
				editModalShow: false,
				Limitslist: [],
				editForm: {
					fullname: '',
					sex: '',
					tel: '',
					avatar: '',
					role_name: '',
					role: '',
					email: ''
				},
				i: 0,
				rules: {
					fullname: [{
						required: true,
						message: '请输入账户名称',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请输入账户名称',
						trigger: 'change'
					}],
					tel: [{
							type: 'string',
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^\d{13,}$/,
							message: '手机号长度长度至少13位数字',
							trigger: 'blur'
						}
					],
					role_name:[{
						required: true,
						message: '请输入账户名称',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			// 获取列表数据
			this.loadlist();
		},
		methods: {
			// 加载列表数据
			async loadlist() {
				let { status, data } = await User.list({});
				if (status) {
					this.tableData = data;
				}
			},
			// 获取指定的管理员
			async edit(i) {
				this.i = i
				this.editForm = this.tableData[i]
				let { status, data } = await Role.list()
				this.Limitslist = data
				this.editModalShow = true
			},

			// 保存
			async handleUpdateNode() {
				let { status } = await User.edit({ ...this.editForm })
				if (status) {
					this.$message.success('修改成功');
					this.Limitslist[this.i] = this.editForm
					this.editModalShow = false
				}
			},
			// 删除
			handleRemove(id, i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status, data } = await User.remove({ id });
						if (status) {
							this.tableData.splice(i, 1);
							this.$message.success("删除成功");
						}
					})
					.catch(() => {
						this.$message.info('取消删除');
					})
			},
			//头像上传成功 console.log(res)打印res,出来的是一个对象，对里面的属性进行解构
			handleUploadSuccess(res) {
				this.editForm.avatar = res.src;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

		}
	}
</script>

<style scoped="scoped">
	.el-image {
		width: 60px;
		height: 60px;
		border-radius: 30px 30px;
	}
</style>
