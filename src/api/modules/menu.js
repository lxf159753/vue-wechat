import axios from 'axios';
// 获取子级菜单
let list = (data) => axios.get('/api/menu/sub',{params:data})
// 删除子菜单
let remove = (id) => axios.delete('/api/menu',{params:id})
// 编辑子菜单
let edit = (data) => axios.put('/api/menu',data)
// 添加
let add = (data) => axios.post('/api/menu',data)
//获取图标
let iconList = (data) => axios.get('/api/admin/icon/list', { params: data });
//编辑图标
let editIcon = (data) => axios.put('/api/menu/icon', data);
export default{
	list,
	remove,
	edit,
	add,
	iconList,
	editIcon
}
