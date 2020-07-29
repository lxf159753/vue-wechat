import axios from 'axios';
// 管理员信息
let list = (data) => axios.get('/api/admin/list', { params: data })
// 获取管理员个人
let gain = (data) => axios.get('/api/admin', { params: data })
// 更新管理员
let edit = (data) => axios.put('/api/admin', data)
// 删除管理员
let remove = (id) => axios.delete('/api/admin', { params: id })
export default {
	list,
	gain,
	edit,
	remove,
}
