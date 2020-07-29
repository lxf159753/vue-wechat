import axios from 'axios';
// 管理员登录
let login = (data) => axios.post("/api/admin/login", data)
// 管理员注册
let register = (data) => axios.post("/api/admin/register", data)

// 获得所有子分类
let sub = (data) => axios.get("/api/category/sub", { params: data })
// 删除分类
let omit = (id) => axios.delete("/api/category", { params: id })
// 编辑分类put是post方法
let edit = (data) => axios.put("/api/category", data)
// 添加节点
let add = (data) => axios.post("/api/category", data)

export default {
	login,
	register,
	sub,
	omit,
	edit,
	add,
}
