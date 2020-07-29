<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span style="font-size: 15px;font-weight: bold;">发布商品</span>
		</div>
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-form-item label="商品分类" style="width: 550px;">
				<el-col :span="6">
					<el-select v-model="form.cate_1st" placeholder="一级分类">
						<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="form.cate_2nd" placeholder="二级分类">
						<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="form.cate_3rd" placeholder="三级分类">
						<el-option v-for="option in options_3rd" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="form.name" style="width: 400px;"></el-input>
				<span>商品标题名称长度至少3个字符，最长200个汉字</span>
			</el-form-item>
			<el-form-item label="商品卖点" prop="hotPoint">
				<el-input type="textarea" v-model="form.hotPoint" style="width: 400px;"></el-input>
				<span>商品卖点不能超过140个汉字</span>
			</el-form-item>
			<el-form-item label="商品价格" prop="price">
				<el-input placeholder="请输入内容" v-model.number="form.price" style="width: 300px;">
					<template slot="append">元</template>
				</el-input>
				<span>价格必须是0-999999之间的数字，且不能高于市场价</span>
				<span>此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</span>
			</el-form-item>
			<el-form-item label="市场价" prop="marketPrice">
				<el-input placeholder="请输入内容" v-model.number="form.marketPrice" style="width: 300px;">
					<template slot="append">元</template>
				</el-input>
				<span>价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</span>
			</el-form-item>
			<el-form-item label="成本价" prop="cost">
				<el-input placeholder="请输入内容" v-model.number="form.cost" style="width: 300px;">
					<template slot="append">元</template>
				</el-input>
				<span>价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</span>
			</el-form-item>
			<el-form-item label="折扣">
				<el-input placeholder="请输入内容" v-model.number="form.discount" style="width: 300px;">
					<template slot="append">折</template>
				</el-input>
				<span>根据销售价与市场价比例自动生成不需要编辑</span>
			</el-form-item>
			<el-form-item label="商品库存">
				<el-input placeholder="请输入内容" v-model.number="form.inventory" style="width: 300px;">
					<template slot="append">件</template>
				</el-input>
				<span>价格必须是0-999999之间的整数</span>
				<span>若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</span>
			</el-form-item>
			<el-form-item label="商品货号">
				<el-input v-model.number="form.articleNo"></el-input>
				<span>商品货号是商家管理商品的编号，买家不可见</span>
				<span>最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</span>
			</el-form-item>
			<el-form-item label="商品主图" prop="img_lg">
				<el-upload class="avatar-uploader" :headers="headers" action="/api/upload/goods" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="form.img_lg" :src="form.img_lg" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
					800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</span>
			</el-form-item>
			<el-form-item label="商品轮播图" prop="slider">
				<el-upload action="/api/upload/slider" :headers="headers" list-type="picture-card" :on-preview="handlePictureCardPreview"
				 :on-success="sliderSuccess" :on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="form.slider" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label-width="0px">
				<el-row>
					<el-col :span="24">
						<div class="grid-content bg-purple-dark">商品详情描述</div>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="商品品牌" prop="brand">
				<el-input v-model="form.brand" style="width: 500px;"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<div ref="editor"></div>
			</el-form-item>
			<el-form-item label-width="0px">
				<el-row>
					<el-col :span="24">
						<div class="grid-content bg-purple-dark">商品物流信息</div>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="运费" prop="freight">
				<el-input placeholder="请输入内容" v-model="form.freight" style="width: 200px;">
					<template slot="append">元</template>
				</el-input>
				<span>运费设为0，前台商品将显示免运费</span>
			</el-form-item>

			<el-form-item>
				<el-button type="success" @click='edit("form")'>提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Goods } from '@/api/index';
	import { Admin } from '@/api/index';
	// 富文本框
	import E from 'wangeditor';
	export default {
		props: ['id'],
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				form: {
					cate_1st: '',
					cate_2nd: "",
					cate_3rd: '',
					name: '',
					hotPoint: '',
					inventory: '',
					marketPrice: '',
					discount: '',
					cost: '',
					articleNo: '',
					price: '',
					img_lg: '',
					img_md: '',
					slider: '',
					detail: '',
					brand: '',
					freight: '',


				},
				options_1st: [],
				options_2nd: [],
				options_3rd: [],
				// 用来存轮播图
				photo: [],
				dialogImageUrl: '',
				dialogVisible: false,
				rules: {
					cate_1st: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
					name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
					hotPoint: [{ required: true, message: '请输入商品卖点', trigger: 'blur' }],
					price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
					marketPrice: [{ required: true, message: '请输入商品市场价', trigger: 'blur' }],
					cost: [{ required: true, message: '请输入商品成本价', trigger: 'blur' }],
					discount: [{ required: true, message: '请输入商品折扣', trigger: 'blur' }],
					inventory: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
					articleNo: [{ required: true, message: '请输入商品货号', trigger: 'blur' }],
					img_lg: [{ required: true, message: '请选择商品主图', trigger: 'blur' }],
					slider: [{ required: true, message: '请选择商品轮播图', trigger: 'blur' }],
					brand: [{ required: true, message: '请选择商品品牌', trigger: 'blur' }],
					detail: [{ required: true, message: '请选择商品详情', trigger: 'blur' }],
					freight: [{ required: true, message: '请输入商品邮费', trigger: 'blur' }],
				},
			};

		},
		// 富文本框
		async mounted() {

			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.detail = html
			}
			editor.create()
			editor.txt.html(this.form.detail)

			// 轮播
			this.form.slider = this.form.slider.split(',');
			this.form.slider.forEach((item, idx) => {
				if (item !== "") {
					this.photo[idx] = {
						url: item
					}
					this.$set(this.photo, idx, this.photo[idx]);
				}
			})

		},
		async created() {
			let { data, msg, status } = await Admin.sub({ pId: 1 });
			this.options_1st = data;
			this.form.cate_1st = data[0].id;
		},
		watch: {
			'form.cate_1st': async function(val) {
				let res = await this.loadSubcate(val);
				this.options_2nd = res;
				this.form.cate_2nd = res[0].id;
			},
			'form.cate_2nd': async function(val) {
				let res = await this.loadSubcate(val);
				this.options_3rd = res;
				this.form.cate_3rd = res[0].id;
			}
		},

		methods: {
			// 获取一级分类
			async loadSubcate(pId) {
				let { status, data } = await Admin.sub({ pId });
				if (status) {
					return data;
				} //return出来得是promise对象
			},
			// 图片上传
			handleAvatarSuccess(res, file) {
				this.form.img_lg = URL.createObjectURL(file.raw);
				this.form.img_lg = res.lgImg
				this.form.img_md = res.mdImg

			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//商品轮播图
			handleRemove(file, fileList) {
				let src = '';
				fileList.forEach((item) => {
					src += (item.url + ',');
				})
				this.form.slider = src;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//轮播图上传
			sliderSuccess(res, file) {
				console.log("gg")
				let { status, src, msg } = res;
				this.form.slider += (src + ',');
				console.log(this.form.slider);
			},

			// 发布
			async edit() {
				let { status, data } = await Goods.goods({ ...this.form })
				if (status) {
					if (status) {
						this.$router.back()
						this.$router.push({ path: '/admin/list' })
						this.$message.success('发布成功');
					}
				} else {
					this.$message.info('发布失败');
				}

			}
		}
	}
</script>

<style scoped="scoped">
	span {
		display: block;
		color: #8C939D;
		font-size: 10px;
	}

	.el-row {
		width: 100%;
		margin-bottom: 10px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #E6E6E6;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon,
	.avatar-uploader-remove {
		border: 1px dashed #d9d9d9;
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar-uploader {
		height: 178px;
		width: 178px;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.avatar-uploader:hover .avatar-uploader-remove {
		display: block;
	}

	.avatar-uploader-remove {
		position: absolute;
		left: 0;
		top: 0;
		color: white;
		background-color: rgba(0, 0, 0, 0.7);
		display: none;
		z-index: 10;
	}
</style>
