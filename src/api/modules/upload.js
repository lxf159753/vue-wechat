import axios from 'axios';
// 删除图片
let remove = (data) => axios.delete('/api/upload',{params:data})
// 上传轮播图
let slider = (data) => axios.post('/api/upload/slider',data)

export default{
	remove,
	slider,
}