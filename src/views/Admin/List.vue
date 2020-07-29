<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>商品列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column label="商品名称" width="400px">
				<template slot-scope="scope">
					<div class="xq">
						<el-image style="width: 100px;" :src="scope.row.img_md"></el-image>
						<div><span>{{scope.row.name}}</span>
							<span>商品货号:{{scope.row.articleNo}}</span></div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="价格">
			</el-table-column>
			<el-table-column prop="inventory" label="库存">
			</el-table-column>
			<el-table-column prop="create_time" label="发布时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-link :href="`#/admin/edit/${scope.row.id}`">
						<el-button type="primary" icon="el-icon-edit" ></el-button>
					</el-link>
					
					<el-button type="danger" style="margin-left: 15px;" icon="el-icon-delete" @click='remove(scope.row.id,scope.$index)'></el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" :current-page="currentPage4" background :page-sizes="[4, 8, 16, 32]"
			 :page-size="4"  @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="11">
			</el-pagination>
		</div>
	</el-card>

</template>

<script>
	import { Goods } from '@/api/index'
	export default {
		data() {
			return {
				tableData: [],
				currentPage4: 1,
				pageSize:4,
				pageIndex:1
			}
		},
		created() {
			this.loadlist()
		},
		methods: {
			// 加载列表数据
			async loadlist() {
				let { status,total, goods } = await Goods.list({pageSize:this.pageSize,pageIndex:this.pageIndex});
				if (status) {
					this.tableData = goods;
					
				}
			},
			 handleSizeChange(val) {
				this.pageSize = val;
				this.loadlist()
			},
			 handleCurrentChange(val) {
				this.pageIndex = val;
				this.loadlist()
				
			},
			// 删除
			remove(id,i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status,data } = await Goods.remove({id});
						if (status) {
							// 更新DOM
							this.tableData.splice(i, 1) 
							this.$message.success('删除成功');
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					})
			}


		}

	}
</script>

<style>
	.block {
		float: right;
		margin-top: 10px;
	}

	.xq {
		display: flex;
		flex-direction: row;
	}

	.xq span {
		display: block;
		margin-left: 10px;
	}
</style>
