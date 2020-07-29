<template>
	<div class="navbar">
		<img src="../assets/img/logo.png" alt="">
		<div class="right">
			<el-dropdown>
				<span class="el-dropdown-link">
					<el-avatar class="photo" size="small" :src="ruleForm.avatar"></el-avatar>
					<span class="fullname">{{ruleForm.username}}</span>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>消息</el-dropdown-item>
					<el-dropdown-item><router-link to="/user/edit">设置</router-link></el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import { User } from '@/api/index';
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					fulename: '',
					sex: '',
					tel: '',
					role: '',
					avatar: ''

				}
			}
		},
		created() {
			this.loadList()
		},
		methods: {
			async loadList() {
				let id = sessionStorage.uid
				let { status, data } = await User.gain({ id })
				if (status) {
					this.ruleForm = data;
				}
			}
		}


	}
</script>

<style>
	.navbar {
		width: 100%;
		background-color: black;
		color: white;
		height: 55px;
		line-height: 55px;
	}

	.navbar img {
		height: 55px;
	}

	.right {
		float: right;
		height: 55px;
		margin-right: 50px;
	}

	.right span {
		display: inline-block;
		color: #FFFFFF;
		margin-bottom: -6px;
	}

	.right .photo {
		margin-right: 10px;
		margin-top: 15px;
	}
</style>
