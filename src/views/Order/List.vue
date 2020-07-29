<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>订单列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="40px">
			</el-table-column>
			<el-table-column width="600px">
				<template slot-scope="scope">
					<el-table :data="scope.row.goodsList">
						<el-table-column label="商品" width="400px">
							<template slot-scope="scope">
								<div class="xq">
									<el-image style="width: 100px;" :src="scope.row.img_md"></el-image>
									<div>
										<span>{{scope.row.name}}</span>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="单价" prop="goods_price">
						</el-table-column>
						<el-table-column label="数量" prop="goods_num">
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column label="付款总额" prop="payment">
			</el-table-column>
			<el-table-column label="下单时间" prop="create_time">
			</el-table-column>
			<el-table-column label="状态" prop="status">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" plain></el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Order } from '@/api/index'
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			// 获取列表数据
			this.loadlist();
		},
		methods: {
			// 加载列表数据
			async loadlist() {
				let { status, data } = await Order.list({});
				if (status) {
					this.tableData = data;
				};
			},

		}
	}
</script>

<style>
	.xq {
	display: flex;
		flex-direction: row;
	}
	
	.xq span {
		display: block;
		margin-left: 10px;
	}
</style>
